import express from 'express';
import DataBase from './DataBase/database';
import allroutes from './Routes'
import Auth from './Auth/Auth';
var jwt = require('jsonwebtoken');




const app = express();
express.Router()
app.use(express.json());
const port = 5000;

let data: DataBase = new DataBase();
let auth: Auth = new Auth();

/*
const token = jwt.sign(
  { user_id: "Mozes", email: "Proba" },
  "anyad",
  {
    expiresIn: "2h",
  }
);
console.log(token)*/
app.use(allroutes)
/*
app.post('/login', [auth.verifyToken], (req: any, res: any) => {
  res.send(req.body)
});
*/


app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});