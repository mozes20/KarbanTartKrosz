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
const CategoryController: CategoryDbController = CategoryDbController.getInstance();
const SkillController = new SkillDbController();
const jobController = new JobController();
const auth = new Auth();

//Publikus útvonalak
router.post("/login", userController.login);
router.post("/register", [], userController.registration);
router.post("/device", [auth.verifyToken], DeviceController.addDevice);
router.get("/device", [auth.verifyToken], DeviceController.getDeviceById);
router.get("/devices", [auth.verifyToken], CategoryController.getAllDeviceFromUnderCategory);
router.get("/alldevic", [auth.verifyToken], DeviceController.getDevices);
router.get("/maincategory", [auth.verifyToken], CategoryController.getMainCategorys);
router.post("/maincategory", [auth.verifyToken], CategoryController.addNewMainCategory);
router.post("/category", [auth.verifyToken], CategoryController.addUnderCategory);
router.get("/category", [auth.verifyToken], CategoryController.getUndercategory);
router.get("/categories", [auth.verifyToken], CategoryController.getAllCategory);
router.post("/skill", [], SkillController.addSkill);
router.get("/skill", [auth.verifyToken], SkillController.getSkillById);
router.get("/skills", [auth.verifyToken], SkillController.getAllSkill);
router.get("/skillname", [auth.verifyToken], SkillController.getSkillByName);
router.put("/skillcategory", [], CategoryController.putSkillsInToCategory);
router.put("/skilluser", [], userController.putSkillsInToUser);
router.put("/updatecategory", [], CategoryController.updateNormAndInterval);
router.put("/usertojob", [auth.verifyToken], jobController.addUserToJob);
router.get("/jobDev", [auth.verifyToken, auth.checkRole([1, 2])], jobController.getAllJobsDevice);
router.get("/jobCat", [auth.verifyToken, auth.checkRole([1, 2])], jobController.getAllJobsCat);
router.get("/jobsDevice", [auth.verifyToken, auth.checkRole([1, 2])], jobController.getJobsToUserDevice);
router.get("/jobsCat", [auth.verifyToken, auth.checkRole([1, 2])], jobController.getJobsToUserCat);
router.put("/status", [auth.verifyToken, auth.checkRole([1, 2])], jobController.setStatus);
router.post("/status", [auth.verifyToken, auth.checkRole([1, 2])], jobController.cancelJob);
router.post("/emergencyjob", [auth.verifyToken], jobController.addNewJobToDevice);

export default router;