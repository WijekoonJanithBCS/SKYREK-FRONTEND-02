import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config()

export default function authorizeUser(req, res, next) {
    const header = req.headers['authorization'];
    if (header != null) {
        const token = header.replace("Bearer ", "");

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err == null) {
                return res.status(401).json({
                    message: "Unauthorized, invalid token"
                });
            }
            else {
                req.user = decoded;
                next();
            }
        });
    }
    next();
    // token ekek nathi kenek awoth methanin next wenne nah block wenwa ekai prashne thibbe
}