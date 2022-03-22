import { IDeviceData} from './../DataModells/Device.models';
import { Schema, model} from 'mongoose';
var jwt = require('jsonwebtoken');

const _schema = new Schema<IDeviceData>({

    Name: { type: String, required: true },
    Location: { type: String, required: true },
    Category: { type: Schema.Types.ObjectId}

})

const _Device = model<IDeviceData>('Device', _schema);

export class DeviceDbController{
    addDevice(req: any, res: any, next: any){
        let newDevice = new _Device();
        newDevice.Name=req.body.name;
        newDevice.Location=req.body.location;
        newDevice.Category=req.body.id;

        newDevice.save().then(Device => {
            return res.status(201).send({ message: "Create completed" })
        }).catch(err => {
            console.log(err)
            return res.status(400).send({ message: "Create failed" })
        });

    }
    
    getDeviceById(req: any, res: any, next: any){
        let id = req.body.id;
        _Device.findById(id).then(Device => {
            if (Device === null) {
                return res.status(400).send({ message: "Device Was Not Found" })
            } else {
                return res.status(200).json(Device);
            }
        })
    }
    getDevices(req: any, res: any, next: any){
        _Device.find().then(Device => {
            if (Device === null) {
                return res.status(400).send({ message: "Device Was Not Found" })
            } else {
                return res.status(200).json(Device);
            }
        })
    }
    
}