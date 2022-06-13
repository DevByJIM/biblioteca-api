import jwt from "jsonwebtoken";

export const generateToken = (uid) => {
    const expiresIn = 1500 * 60;

    const token = jwt.sign({ uid }, process.env.JWT_SECRET, {
        expiresIn,
    });

    return { token, expiresIn };
};

export const generateRefreshToken = (uid, res) => {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
        expiresIn: "30d",
    });

    // 30 días
    const expires = new Date(Date.now() + 30 * 60 * 60 * 1000);

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires,
        secure: !(process.env.MODO === "developer"),
    });
};

export const tokenVerificationErrors = {
    "invalid signature" : 'La firma del JWT no es válida',
    "jwt malformed": 'Formato del JWT no válido',
    "jwt expired" : 'El JWT ha expirado',
    "invalid token" : 'El token no es válido',
    "No Bearer" : 'Utiliza el formato Bearer',
}
