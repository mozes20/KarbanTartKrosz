import { Job } from './../DataModells/Job.modell';
import { ICategory } from './../DataModells/Category.models';
import { IMainCat } from './../DataModells/MainCategory.models';
import { IDeviceData } from '../DataModells/Device.models';
import { Schema, model } from 'mongoose';
var jwt = require('jsonwebtoken');

const _Mschema = new Schema<IMainCat>({

    Name: { type: String, required: true },
    interval: { type: Number },
    categorys: [{ type: Schema.Types.ObjectId, ref: "Category" }]
})

const _schema = new Schema<ICategory>({

    Name: { type: String, required: true },
    interval: { type: Number },
    lastService: { type: Date },
    normatime: { type: Number },
    description: { type: String },
    devices: [{ type: Schema.Types.ObjectId, ref: "Device" }],
    skills: [{ type: Schema.Types.ObjectId, ref: "Skills" }]
})
const _Maincategory = model<IMainCat>('MainCategory', _Mschema);
const _Category = model<ICategory>('Category', _schema);

export class CategoryDbController {

    async addNewMainCategory(req: any, res: any, next: any) {
        let newMainCategory = new _Maincategory();
        newMainCategory.Name = req.body.name;
        newMainCategory.interval = req.body.interval;

        newMainCategory.save().then(() => {
            return res.status(201).send({ message: "Create completed" })
        }).catch(err => {
            console.log(err)
            return res.status(400).send({ message: "Create failed" })
        });
    }

    async getMainCategorys(req: any, res: any, next: any) {
        _Maincategory.find().then((MainCategorys) => {
            if (MainCategorys === null) {
                return res.status(400).send({ message: "Category not found" })
            } else {
                return res.status(200).json(MainCategorys);
            }
        })
    }

    async addUnderCategory(req: any, res: any, next: any) {
        let newCategory = new _Category();
        newCategory.Name = req.body.name;
        newCategory.interval = req.body.interval;
        newCategory.save();

        _Maincategory.findOneAndUpdate({ "_id": req.body.maincategory }, { $push: { "categorys": newCategory._id } },
            { safe: true, upsert: true, new: true }).then(data => {
                return res.status(201).send({ message: "Create completed" })
            }).catch(e => {
                return res.status(400).send({ message: "Create failed" })
            });
    }

    async getUndercategory(req: any, res: any, next: any) {
        _Maincategory.find({ _id: req.query.maincategory }).populate({ path: 'categorys' }).then(data => {
            if (data === null) {
                return res.status(400).send({ message: "Category not found" })
            } else {
                return res.status(200).json(data);
            }
        }).catch(e => { return res.status(400).send({ message: "unexpeted error" }) })
    }

    async getAllDeviceFromUnderCategory(req: any, res: any, next: any) {
        _Category.find({ _id: req.query.category }).populate({ path: 'devices' }).then(data => {
            if (data === null) {
                return res.status(400).send({ message: "Devices not found" })
            } else {
                return res.status(200).json(data);
            }
        }).catch(e => { return res.status(400).send({ message: "unexpeted error" }) })
    }

    async putDeviceInToUnderCategory(DeviceId: any, categoryId: any) {
        _Category.findOneAndUpdate({ "_id": categoryId }, { $push: { "devices": DeviceId } },
            { safe: true, upsert: true, new: true }).then(data => {
                return 201
            }).catch(e => {
                return 400
            });
    }

    async putSkillsInToCategory(req: any, res: any, next: any) {
        _Category.findOneAndUpdate({ "_id": req.body.category }, { $push: { "skills": req.body.skillid } },
            { safe: true, upsert: true, new: true }).then(data => {
                return res.status(201).send({ message: "Create completed" })
            }).catch(e => {
                return res.status(400).send({ message: "Create failed" })
            });
    }

    chekAllElements(): Job[] {
        let jobArray: Job[] = []
        _Category.find().then(data => {
            if (data === null) {
                return []
            } else {

                for (let element of data) {
                    let dateLas = element.lastService
                    var Difference_In_Time = new Date().getTime() - dateLas.getTime();
                    // To calculate the no. of days between two dates
                    var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
                    console.log(Difference_In_Days)
                    if (Difference_In_Days >= element?.interval) {
                        //console.log(element)
                        let newJob: Job = { CategoryId: element.id };
                        jobArray.push(newJob)

                    }
                }

            }
        }).catch(e => { return [] })
        console.log(jobArray)
        return jobArray;
    }
}