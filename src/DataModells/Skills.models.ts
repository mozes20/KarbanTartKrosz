import { Document } from 'mongoose';
export interface ISkills extends Document {

    Name: string;
    Description: string;
    Level: number;

}