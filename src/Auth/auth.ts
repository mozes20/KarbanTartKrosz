import { Console } from 'console';
import { UserDbController } from './../DataBase/User.controller';

var jwt = require('jsonwebtoken');

export default class Auth {


  verifyToken(req: any, res: any, next: any): any {
    const token =
      req.body.token || req.query.token || req.headers["x-access-token"];
    if (!token) {
      return res.status(403).send("A token is required for authentication");
    }
    try {
      const decoded = jwt.verify(token, "anyad");
      req.user = decoded;

    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
    return next();
  }
 checkRole = (permissions: Array<number>) => {
  return async  (req: any, res: any, next: any) => {
    const userController = new UserDbController();
    let permission = userController.getUserRole(req.user.user_id).then((permission:any)=>{
      if (permissions.indexOf(permission) > -1) next();
      else res.status(401).send();
    })
    console.log("+++++++++++++++++"+permission);

    //todo megcsinálni
  }
 }

}