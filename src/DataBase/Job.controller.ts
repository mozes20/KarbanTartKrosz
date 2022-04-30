import { CategoryDbController } from './Category.controller';
import { IJob, Job } from './../DataModells/Job.modell';
import { Schema, model } from 'mongoose';
import * as cron from 'node-cron'
import mongoose from 'mongoose';

const _schema = new Schema<IJob>({

    CategoryId: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
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
        NewJob.Status = jobObject.Status;
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


    getAllJobs(req: any, res: any, next: any){
        let id = req.query.id;
        _Job.find().then(Jobs => {
            if (Jobs === null) {
                return res.status(400).send({ message: "No Job Was Not Found" });
            } else {
                return res.status(200).json(Jobs);
            }
        })
    }




}