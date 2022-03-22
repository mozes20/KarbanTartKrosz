import { UserDbController } from './../DataBase/User.controller';
import { Router } from "express";

const router = Router();
const userController = new UserDbController();
//Publikus útvonalak
router.post("/login", userController.login);
router.post("/register", userController.registration);


export default router;