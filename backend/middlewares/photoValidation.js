const {body} = require('express-validator')

const photoInsertValidation = () => {
    return [
        body("title")
            .not()
            .equals("undefined")
            .withMessage("o titulo e obrigatorio")
            .isString()
            .withMessage("o titulo e obrigatorio")
            .isLength({min:3})
            .withMessage("o titulo precisa ter no minimo 3 carascteres"),
        body("image").custom((value, {req}) =>{
            if(!req.file){
                throw new Error("A imagem e obrigatoria")
            }
            return true;
        })

    ]
}
const photoUpdateValidation = () => {
    return[
        body("title")
            .optional()
            .isString()
            .withMessage("o titulo e obrigatorio")
            .isLength({min:3})
            .withMessage("o titulo precisa ter no minimo 3 carascteres"),
    ]
}

const commentValidation = () => {
    return[
        body("comment")
            .isString()
            .withMessage("o comentario e obrigatorio")
    ]
}

module.exports = {
    photoInsertValidation,
    photoUpdateValidation,
    commentValidation
}