import { IUserData, IUserDocument } from './../DataModells/User.model';
import { Schema, model, Document } from 'mongoose';
import * as crypto from 'crypto'
var jwt = require('jsonwebtoken');

const _schema = new Schema<IUserDocument>({

    Username: { type: String, required: true },
    Hash: { type: String },
    Salt: { type: String },
    Permission: { type: Number, required: true },
    Skills: [{ type: Schema.Types.ObjectId, ref: "Skills" }]

})

_schema.methods.setPassword = function (password: string) {
    let salt = crypto.randomBytes(16).toString('hex');
    this.Salt = salt;
    //console.log(salt)
    this.Hash = crypto.pbkdf2Sync(password, this.Salt,
        1000, 64, `sha512`).toString(`hex`);
}

_schema.methods.validPassword = function (password: string): boolean {
    const Hash = crypto.pbkdf2Sync(password,
        this.Salt, 1000, 64, `sha512`).toString(`hex`);
    return this.Hash === Hash;
}

const _User = model<IUserDocument>('User', _schema)

export class UserDbController {

    login(req: any, res: any, next: any) {
        let { username, password } = req.body;
        _User.findOne({ Username: username }).then(user => {
            if (user === null) {
                return res.status(400).send({ message: "User Not Found" })
            } else {
                if (user.validPassword(password)) {
                    const token = jwt.sign(
                        { user_id: user._id, user_name: user.Username },
                        "anyad",
                        {
                            expiresIn: "2h",
                        }
                    );
                    //console.log(token)
                    return res.status(201).json({
                        message: "User Logged In",
                        token: token
                    })
                }
            }
        }).catch(err => {
            console.log(err);
            return res.status(201).send({ message: "Wrond Data" })
        })

    }

    registration(req: any, res: any, next: any) {

        let newUser = new _User();
        newUser.Username = req.body?.username;
        newUser.Permission = req.body?.permission;
        newUser.setPassword(req.body?.password);
        newUser.save().then(User => {
            return res.status(201).send({ message: "Create completed" })
        }).catch(err => {
            console.log(err)
            return res.status(400).send({ message: "Create failed" })
        })

    }





}