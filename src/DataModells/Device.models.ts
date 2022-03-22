import { Schema, Document } from 'mongoose';
export interface IDeviceData extends Document {
    Name:string;
    Location: string;
    Category?: Schema.Types.ObjectId;
}