import { Schema, Document } from 'mongoose';
export interface IUserData {

    Username: string;
    Hash: string;
    Salt: string;
    Permission: number;
    Skills?: Array<Schema.Types.ObjectId>;

}

export interface IUserDocument extends IUserData, Document {
    validPassword: (password: string) => boolean;
    setPassword: (password: string) => void;
}