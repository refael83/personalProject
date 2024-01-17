import Jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const verifyToken =  (token: string | null) => {
    const secretKey = process.env.JWT_SECRET_KEY ;
    const user = Jwt.verify(token,secretKey)
    return user
}