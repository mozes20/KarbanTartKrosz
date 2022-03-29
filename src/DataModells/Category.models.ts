import { Schema, Document } from 'mongoose';
export interface ICategory extends Document {
    Name: string;
    interval?: number;
    devices: [{ type: Schema.Types.ObjectId, ref: "Device" }]
}