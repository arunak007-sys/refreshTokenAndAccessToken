import bcryptjs from 'bcryptjs'
import User from '../schema/userSchema.js'
import { loginBodyValidation, signUpBodyValidation } from '../utils/validationSchema.js'
import generateTokens from '../utils/generateTokens.js'

const signUp = async (req, res) => {
    try {
        const { error } = signUpBodyValidation(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        const user = await User.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(req.body.password, salt)

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save()
        res.status(201).json({ message: "User created successfully" })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

const login = async (req, res) => {
    try {
        const { error } = loginBodyValidation(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }
        const user = await User.findOne({ username: req.body.username })

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        const validPassword = await bcryptjs.compare(req.body.password, user.password)

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid email or password" })
        }

        //  GNERATE TOKENS
        const { accessToken, refreshToken } = await generateTokens(user)

        res.status(200).json({
            accessToken,
            refreshToken,
            message: "user login success"
        })

    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}


export default { signUp, login }