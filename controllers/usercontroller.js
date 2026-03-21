import User from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export function createUser(req, res) {

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user= new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hashedPassword,
    });

    user.save()
        .then(result => {
            return res.status(201).json({
                message: 'User created successfully',
            });
        })
        .catch(err => {
            return res.status(500).json({
                message: 'Error creating user',
            });
        });
}

export function loginuser(req, res) {
    User.findOne({ email: req.body.email })
        .then((user)=>{
            if(user==null){
                return res.status(404).json({
                    message: 'User with given email not found',
                });
            }
            else{
                const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
                if(isPasswordValid){

                    const token = jwt.sign({
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        image: user.image,
                        isEmailVerified: user.isEmailVerified
                        
                    } , process.env.JWT_SECRET )
                           
                    //console.log(token);

                    return res.status(200).json({
                        message: 'Login successful',
                        token: token,
                        role: user.role
                    });
                }
                else{
                    return res.status(401).json({
                        message: 'Invalid password',
                    });
                }
            }
        })
}

export function isAdmin(req){
    if(req.user == null){
        return false;
    }
    if(req.user.role != "admin"){
        return false;
    }
    return true;
}
