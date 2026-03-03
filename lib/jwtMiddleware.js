import jwt from 'jsonwebtoken';

export default function authorizeUser(req, res, next)  {
    const header= req.headers['authorization'];
    if(header != null){
        const token = header.replace("Bearer ", "");
        

        jwt.verify(token, "i-computers-54!", (err, decoded)=>{
           if(decoded==null){
            return res.status(401).json({
                message: "Unauthorized, invalid token"
            });
           }
           else{
            req.user= decoded;
             next();
            }
        });
    }
    
   

    
    
}