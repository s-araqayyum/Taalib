import Teacher from "../../Models/TeacherModel.js";
import jwt from 'jsonwebtoken'

export const login = (req,res, next) => {
    let {employeeId, password} = req.body;
    console.log('req.body from node.js login:', req.body);

    Teacher.findOne({employeeId:employeeId}).then(foundUser => {
        if(!foundUser){
            res.status(404).send({"Message":"Teacher not found ✖"})
        }
        else{
            if(password == foundUser.password){
                let token = jwt.sign({
                    id:foundUser.employeeId
                }, process.env.SECRET_KEY, {
                    expiresIn:'24h'
                })
                console.log("teacher found")
                res.status(200).send({ "token": token });
            }
            else{
                res.status(401).send({"Message":"Invalid Password"})
            }
        }
    }).catch(err=>{
        res.status(400).send({err:err})
    })
}

export const DecodeUser = (req, res, next) => {
    try {
      const fromHeader = req.header('Authorization');
  
      if (!fromHeader) {
        return res.status(403).json({ message: 'Authorization header not provided' });
      }
  
      const token = fromHeader.split(' ')[1];
      console.log('token:', token);
  
      if (!token) {
        return res.status(403).json({ message: 'Token not provided' });
      }
  
      jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (!err) {
          req.decoded = decoded;
          next();
        } else {
          res.status(403).json({ message: 'You are not authorized' });
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };