import axios from "axios";
import { validationResult, body, header, cookie, param } from "express-validator";

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next()
}

export const bodyRegisterValidator = [
    body("email", "Formato de email no correcto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password", "Mínimo 6 caracteres").trim().isLength({ min: 6 }),
    body("password", "Formato de password incorrecto").custom(
        (value, { req }) => {
            if (value !== req.body.repassword)
                throw new Error("Contraseñas no coincidentes");
            return value;
        }
    ),
    validationResultExpress
]

export const bodyLoginValidator =
    [
        body("email", "Formato de emial no correcto")
            .trim()
            .isEmail()
            .normalizeEmail(),
        body("password", "Mínimo 6 caracteres").trim().isLength({ min: 6 }),
        validationResultExpress
    ]

export const tokenHeaderValidator = [
    header("authorization", "No existe el token")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const tokenCookieValidator = [
    cookie("refreshToken", "No existe refresh Token")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];

export const bodyLinkValidator = [
    body("longLink", "Formato link incorrecto")
        .trim()
        .custom(async (value) => {
            try {
                if (!value.startsWith("http")) {
                    value = "https://" + value;
                }
                await axios.get(value);
                return value;
            } catch (error) {
                throw new Error("Link 404 not found");
            }
        }),
    validationResultExpress,
];

export const paramsLinkValidator = [
    param("id", "Formato id incorrecto")
        .trim()
        .notEmpty()
        .escape(),
    validationResultExpress,
];
