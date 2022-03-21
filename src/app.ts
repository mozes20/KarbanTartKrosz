import express from 'express';
import DataBase from './DataBase/database';
import Auth from './Auth/auth';
var jwt = require('jsonwebtoken');
const app = express();
express.Router()
app.use(express.json());
const port = 5000;

let data: DataBase = new DataBase();
let auth: Auth = new Auth();


const token = jwt.sign(
  { user_id: "Mozes", email: "Proba" },
  "anyad",
  {
    expiresIn: "2h",
  }
);
console.log(token)
///console.log(data.createNewAdministrator({username:"mozes",password:"asd",permission:1}))

app.get('/', (req, res) => {
  //let probaAdatok: UserType = { username: "Proba", password: "Proba", permission: 1 }
  /* data.tryGetLoginData("Mozes","Proba").then(d => {
       res.json(d)
   }).catch( e => {
       throw e
   })*/
});



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});