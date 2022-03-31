import { Schema, Document } from 'mongoose';
export interface IMainCat extends Document {
    Name: string;
    interval?: number;
    categorys: [{ type: Schema.Types.ObjectId, ref: "Category" }]
}