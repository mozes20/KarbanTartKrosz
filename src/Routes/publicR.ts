import { JobController } from './../DataBase/Job.controller';
import { CategoryDbController } from './../DataBase/Category.controller';
import { UserDbController } from './../DataBase/User.controller';
import { DeviceDbController } from './../DataBase/Device.controller';
import { SkillDbController } from './../DataBase/Skills.controller';
import { Router } from "express";
import Auth from '../Auth/Auth';

const router = Router();
const userController = new UserDbController();
const DeviceController = new DeviceDbController();
const CategoryController = new CategoryDbController();
const SkillController = new SkillDbController();
const jobController = new JobController();
const auth = new Auth();

//Publikus útvonalak
router.post("/login", userController.login);
router.post("/register", [], userController.registration);
router.post("/device", [auth.verifyToken], DeviceController.addDevice);
router.get("/device", [auth.verifyToken], DeviceController.getDeviceById);
router.get("/devices", [auth.verifyToken], CategoryController.getAllDeviceFromUnderCategory);
router.get("/maincategory", [auth.verifyToken], CategoryController.getMainCategorys);
router.post("/maincategory", [auth.verifyToken], CategoryController.addNewMainCategory);
router.post("/category", [auth.verifyToken], CategoryController.addUnderCategory);
router.get("/category", [auth.verifyToken], CategoryController.getUndercategory);
router.post("/skill", [auth.verifyToken], SkillController.addSkill);
router.get("/skill", [auth.verifyToken], SkillController.getSkillById);
router.get("/skills", [auth.verifyToken], SkillController.getAllSkill);
router.get("/skillname", [auth.verifyToken], SkillController.getSkillByName);
router.put("/skill", [auth.verifyToken], CategoryController.putSkillsInToCategory);
router.get("/job", [auth.verifyToken,auth.checkRole([1,2])], jobController.getAllJobs);

export default router;