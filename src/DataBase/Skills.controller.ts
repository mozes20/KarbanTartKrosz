import { CategoryDbController } from './Category.controller';
import {ISkills} from './../DataModells/Skills.models';
import { Schema, model } from 'mongoose';
var jwt = require('jsonwebtoken');

const _schema = new Schema<ISkills>({

    Name: { type: String, required: true },
    Description: { type: String, required: true },
    Level: { type: Number, required: true }

})

const _Skills = model<ISkills>('Skills', _schema);
const CategoryController: CategoryDbController = new CategoryDbController();
export class SkillDbController {
    addSkill(req: any, res: any, next: any) {
        let newSkill = new _Skills();
        newSkill.Name = req.body.name;
        newSkill.Description = req.body.description;
        newSkill.Level = req.body.level;

        newSkill.save().then(Skill => {
            return res.status(201).send({ message: "Create completed" });
         }).catch(err => {
                console.log(err)
                return res.status(400).send({ message: "Create failed" });
         })
            
        

        //Mózes izéje, black magic ?????
       /* newSkill.save().then(Skill => {
            CategoryController.putDeviceInToUnderCategory(Skill._id, req.body.category)
            return res.status(201).send({ message: "Create completed" })
        }).catch(err => {
            console.log(err)
            return res.status(400).send({ message: "Create failed" })
        });
        */
    }

    getSkillById(req: any, res: any, next: any) {
        let id = req.query.id;
        _Skills.findById(id).then(Skill => {
            if (Skill === null) {
                return res.status(400).send({ message: "Skill Was Not Found" });
            } else {
                return res.status(200).json(Skill);
            }
        })
    }

    getSkillByName(req: any, res: any, next: any){
        let name = req.query.name;
        _Skills.findOne(name).then(Skill =>{
            if (Skill === null) {
                return res.status(400).send({ message: "Skill Was Not Found" });
            } else {
                return res.status(200).json(Skill);
            } 
        })
    }


}