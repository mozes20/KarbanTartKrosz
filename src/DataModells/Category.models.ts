import { Schema, Document } from 'mongoose';
export interface ICategory extends Document {
    Name: string;
    interval: number;
    lastService: Date;
    normatime?: number;
    description?: string;
    isJob?: Boolean;
    devices: [{ type: Schema.Types.ObjectId, ref: "Device" }];
    skills: [{ type: Schema.Types.ObjectId, ref: "Skills" }];
}