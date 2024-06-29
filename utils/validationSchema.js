import joi from 'joi'
import joiComplexity from 'joi-password-complexity'

const signUpBodyValidation = (body) => {
    const schema = joi.object({
        username:joi.string().required(),
        email:joi.string().email().required(),
        password:joiComplexity().required(),
    })
    return schema.validate(body)
}

const loginBodyValidation = (body) => {
    const schema = joi.object({
        username:joi.string().required(),
        password:joi.required(),
    })
    return schema.validate(body)
}


export {signUpBodyValidation,loginBodyValidation}