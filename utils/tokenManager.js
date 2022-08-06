import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
    const expiresIn = 15 * 60;

    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });

    return { token, expiresIn };
};

export const generateRefreshToken = (uid, res) => {
    const expiresIn = 60 * 60 * 24 * 30;
    try {

        const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
            expiresIn,
        });

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: true,
            expires: new Date(Date.now() + expiresIn * 1000),
            sameSite: "none",
        });

    } catch (error) {
        console.log(error)
    }

};

export const tokenVerificationErrors = {
    "invalid signature": 'La firma del JWT no es válida',
    "jwt malformed": 'Formato del JWT no válido',
    "jwt expired": 'El JWT ha expirado',
    "invalid token": 'El token no es válido',
    "No Bearer": 'Utiliza el formato Bearer',
}
