const {body} = require('express-validator')
const {isLength} = require("validator");

const userCreateValidation = () => {
    return [
        body("name")
            .isString()
            .withMessage("o nome e obrigatorio")
            .isLength({min: 3})
            .withMessage("o nome precisa ter pelo menos 3 caracteres"),
        body("email")
            .isString()
            .withMessage("O email é obrigatorio.")
            .isEmail()
            .withMessage("Insira um email valido."),
        body("password")
            .isString()
            .withMessage("Senha obrigatoria.")
            .isLength({min: 5})
            .withMessage("A senha precisa ter pelo menos 5 caracteres"),
        body("confirmPassword")
            .isString()
            .withMessage("confirme sua senha.")
            .custom((value, {req}) => {
                if (value != req.body.password) {
                    throw new Error("As senhas nao sao iguais.")
                }
                return true;
            })
            .withMessage("As senhas devem ser iguais")

    ]
}
const loginValidation = () => {
    return [
        body("email")
            .isString()
            .withMessage("O email é obrigatorio")
            .isEmail()
            .withMessage("Insira um email valido"),
        body("password")
            .isString()
            .withMessage("Senha obrigatoria")

    ]
}
        const userUpdateValidation = () => {
    return [
        body("name")
            .optional()
            .isLength({min:3})
            .withMessage("o nome precisa ter pelo menos 3 carateres"),
        body("password")
            .optional()
            .isLength({min:5})
            .withMessage("a senha precisa ter pelo menos 5 caracteres")
    ]
        }
module.exports = {
    userCreateValidation,
    loginValidation,
    userUpdateValidation
}