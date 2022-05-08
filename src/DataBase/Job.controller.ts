import { CategoryDbController } from './Category.controller';
import { DeviceDbController } from './../DataBase/Device.controller';
import { IJob, Job } from './../DataModells/Job.modell';
import { Schema, model } from 'mongoose';
import * as cron from 'node-cron'
import mongoose from 'mongoose';

const _schema = new Schema<IJob>({

    CategoryId: { type: Schema.Types.ObjectId, ref: "Category" },
    DeviceId: { type: Schema.Types.ObjectId, ref: "Device" },
    UserId: { type: Schema.Types.ObjectId, ref: "User" },
    ErrorDate: { type: Date },
    Status: { type: Number },
    Priority: { type: Number },
    ErrorDescription: { type: String },
    JobName: { type: String }

})

const _Job = model<IJob>('Job', _schema);

export class JobController {

    addNewJob(req: any, res: any, next: any) {
        let NewJob = new _Job();
        NewJob.CategoryId = req.body.CategoryId;
        NewJob.Status = 0;
        NewJob.Priority = req.body.Priority;
        NewJob.ErrorDescription = req.body.ErrorDescription;
        NewJob.JobName = req.body.JobName;
        NewJob.save().then(() => {
            return res.status(201).send({ message: "Create completed" })
        }).catch(err => {
            console.log(err)
            return res.status(400).send({ message: "Create failed" })
        });
    }

    addNewJobAutotmatic(jobObject: Job) {
        let NewJob = new _Job();
        NewJob.CategoryId = jobObject.CategoryId;
        NewJob.Status = 0;
        NewJob.Priority = jobObject.Priority;
        NewJob.ErrorDescription = jobObject.ErrorDescription;
        NewJob.JobName = jobObject.JobName;
        NewJob.save().then(() => {
            return 200
        }).catch(err => {
            console.log(err)
            return 400
        });
    }

    addNewJobToDevice(req: any, res: any, next: any) {
        let NewJob = new _Job();
        NewJob.DeviceId = req.body.deviceid;
        NewJob.ErrorDate = new Date();
        NewJob.Status = 0;
        NewJob.Priority = req.body.Priority;
        NewJob.ErrorDescription = req.body.ErrorDescription;
        NewJob.JobName = req.body.JobName;
        NewJob.save().then(() => {
            return res.status(201).send({ message: "Create completed" })
        }).catch(err => {
            console.log(err)
            return res.status(400).send({ message: "Create failed" })
        });
    }

    chekAllElements() {
        _Job.find().populate({ path: 'CategoryId' }).then(data => {
            if (data === null) {
                return 400
            } else {
                data.map(element => {
                    console.log(element)

                })
            }
        }).catch(e => { return 400 })
    }

    checkDate() {
        //    :,)
    }


    getAllJobsDevice(req: any, res: any, next: any) {
        let id = req.query.id;
        _Job.find().populate({ path: 'DeviceId', populate: { path: 'Category' } }).then(Jobs => {
            if (Jobs === null) {
                return res.status(400).send({ message: "No Job Was Not Found" });
            } else {
                return res.status(200).json(Jobs);
            }
        })
    }
    getAllJobsCat(req: any, res: any, next: any) {
        let id = req.query.id;
        _Job.find().populate({ path: 'CategoryId' }).then(Jobs => {
            if (Jobs === null) {
                return res.status(400).send({ message: "No Job Was Not Found" });
            } else {
                return res.status(200).json(Jobs);
            }
        })
    }

    //státusz rendszer csak növeltetjük és hogyha elutasítva akkor -1=elutasítva 0= pending 1= elfogadva 2=Megkezdve 3= Kész
    async setStatus(req: any, res: any, next: any) {
        _Job.findOne({ _id: req.body.jobId }).then(job => {
            if (job === null) {
                return res.status(400).send({ message: "Job Was Not Found" });
            }
            if (!job.Status) {
                job.Status = 0
            }
            if (job.Status + 1 <= 4) {
                _Job.findOneAndUpdate({ _id: req.body.jobId }, { Status: job.Status + 1 },
                    { safe: true, upsert: true, new: true }).then(data => {

                    })
            }
            return res.status(200).send({ message: "Job Was edited" });
        })
    }

    async cancelJob(req: any, res: any, next: any) {
        _Job.findOne({ _id: req.body.jobId }).then(job => {
            if (job === null) {
                return res.status(400).send({ message: "Job Was Not Found" });
            }
            _Job.findOneAndUpdate({ _id: req.body.jobId }, { Status: -1 }, { safe: true, upsert: true, new: true }).then(data => {

            })
            return res.status(200).send({ message: "Job Was cancled" });
        })
    }

    async addUserToJob(req: any, res: any, next: any) {
        _Job.findOneAndUpdate({ "_id": req.body.jobId }, { "UserId": req.user.user_id },
            { safe: true, upsert: true, new: true }).then(data => {
                return res.status(201).send({ message: "Create completed" })
            }).catch(e => {
                return res.status(400).send({ message: "Create failed" })
            });

    }

    async getJobsToUserCat(req: any, res: any, next: any) {
        _Job.find({ UserId: req.user.user_id }).populate({ path: 'CategoryId' }).then(job => {
            if (job === null) {
                return res.status(400).send({ message: "There is no job" });
            }
            return res.status(200).json(job);
        })
    }
    async getJobsToUserDevice(req: any, res: any, next: any) {
        _Job.find({ UserId: req.user.user_id }).populate({ path: 'DeviceId', populate: { path: 'Category' } }).then(job => {
            if (job === null) {
                return res.status(400).send({ message: "There is no job" });
            }
            return res.status(200).json(job);
        })
    }






}