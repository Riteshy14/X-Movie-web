import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const Userauth = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: "NO token"
        });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodejwt = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decodejwt.id };
        next();
    }
    catch (error) {
        res.status(401).json({
            message: "not authorized",
            error: error instanceof Error ? error.message : "unknow error"
        });
    }
};
export { Userauth };
