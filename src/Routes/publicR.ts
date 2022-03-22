import { UserDbController } from './../DataBase/User.controller';
import { DeviceDbController } from './../DataBase/Device.controller';
import { Router } from "express";
import Auth from '../Auth/Auth';

const router = Router();
const userController = new UserDbController();
const DeviceController = new DeviceDbController();
const auth = new Auth();
//Publikus útvonalak
router.post("/login", userController.login);
router.post("/register", userController.registration);
router.post("/device",[auth.verifyToken], DeviceController.addDevice);
router.get("/device", DeviceController.getDeviceById);
router.get("/devices", DeviceController.getDevices);
export default router;