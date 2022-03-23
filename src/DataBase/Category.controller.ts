import { ICategoryData} from './../DataModells/Category.model';
import { Schema, model} from 'mongoose';
var jwt = require('jsonwebtoken');

const _schema = new Schema<ICategoryData>({

    Name: { type: String, required: true },
    Parent: { type: String, required: true }

})
const _Category = model<ICategoryData>('Category', _schema);

export class CategoryDbController{
    
    addCategory(req: any, res: any, next: any){
        let newCategory = new _Category();
        newCategory.Name=req.body.name;
        newCategory.Parent=req.body.parent;
        newCategory.save().then(Category => {
            return res.status(201).send({ message: "Create completed" })
        }).catch(err => {
            console.log(err)
            return res.status(400).send({ message: "Create failed" })
        });
    }
}