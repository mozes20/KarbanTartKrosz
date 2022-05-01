import { Schema, Document } from 'mongoose';


export interface IJob extends Document {
    CategoryId: { type: Schema.Types.ObjectId };
    DeviceId?: { type: Schema.Types.ObjectId };
    Status: number;
    Priority?: number;
    ErrorDescription?: String;
    JobName?: String;
}

export interface Job {
    CategoryId: { type: Schema.Types.ObjectId };
    DeviceId?: { type: Schema.Types.ObjectId };
    Status: number;
    Priority?: number;
    ErrorDescription?: String;
    JobName?: String;
}