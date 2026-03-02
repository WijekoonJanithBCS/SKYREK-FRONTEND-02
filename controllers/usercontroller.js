import User from '../models/user.js';
import bcrypt from 'bcrypt';

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
            res.status(201).json({
                message: 'User created successfully',
            });
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error creating user',
            });
        });
}

export function loginuser(req, res) {
    User.findOne({ email: req.body.email })
        .then((user)=>{
            if(user==null){
                res.status(404).json({
                    message: 'User with given email not found',
                });
            }
            else{
                const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);
                if(isPasswordValid){
                    res.status(200).json({
                        message: 'Login successful',
                    });
                }
                else{
                    res.status(401).json({
                        message: 'Invalid password',
                    });
                }
            }
        })
}
