import { Schema, Document } from 'mongoose';

export interface ICategoryData extends Document {
    Name:string;
    Parent: string;
}