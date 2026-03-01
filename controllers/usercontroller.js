import User from '../models/user.js';

export function createUser(req, res) {
    const user= new User({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
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
