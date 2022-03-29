import { CategoryDbController } from './../DataBase/Category.controller';
import { UserDbController } from './../DataBase/User.controller';
import { DeviceDbController } from './../DataBase/Device.controller';
import { Router } from "express";
import Auth from '../Auth/Auth';

const router = Router();
const userController = new UserDbController();
const DeviceController = new DeviceDbController();
const CategoryController = new CategoryDbController();
const auth = new Auth();
//Publikus útvonalak
router.post("/login", userController.login);
router.post("/register", userController.registration);
router.post("/device", [auth.verifyToken], DeviceController.addDevice);
router.get("/device", [auth.verifyToken], DeviceController.getDeviceById);
router.get("/devices", [auth.verifyToken], CategoryController.getAllDeviceFromUnderCategory);
router.get("/maincategory", [auth.verifyToken], CategoryController.getMainCategorys);
router.post("/maincategory", [auth.verifyToken], CategoryController.addNewMainCategory);
router.post("/category", [auth.verifyToken], CategoryController.addUnderCategory);
router.get("/category", [auth.verifyToken], CategoryController.getUndercategory);
export default router;