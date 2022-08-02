import jwt from "jsonwebtoken";
import { tokenVerificationErrors } from "../utils/tokenManager.js";

export const requireRefreshToken = (req, res, next) =>{
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if (!refreshTokenCookie)
            throw new Error("No existe token")

            const payload = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
            req.iud = payload.uid;
            next()
    } catch (error) {
        console.log(error)
        res.status(401).jason({ error:tokenVerificationErrors[error.message] });
    }
}