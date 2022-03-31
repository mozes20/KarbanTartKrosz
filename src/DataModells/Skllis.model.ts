import { Document } from 'mongoose';
export interface ISkills extends Document {

    name: string;
    description: string;
    level: number;

}