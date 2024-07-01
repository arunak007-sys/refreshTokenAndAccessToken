import jwt from "jsonwebtoken"
import { refreshTokenValidation } from "../utils/validationSchema.js"
import verifyRefreshToken from "../utils/verifyRefreshTokens.js"
import UserToken from "../schema/userToken.js"

const refreshToken = async (req, res) => {
    const { error } = refreshTokenValidation(req.body)

    if (error) {
        console.log('Validation Error:', error.details[0].message);
        return res.status(400).json({ message: error.details[0].message })
    }

    verifyRefreshToken(req.body.refreshToken)
        .then(({ tokenDetails }) => {
            console.log('Token details:', tokenDetails);
            const payload = { _id: tokenDetails._id }
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
                expiresIn: '20s'
            })

            res.cookie("accessToken", token),{
                maxAge: 2 * 1000,
                httpOnly: true,
                secure: true,
            }  

            console.log('Generated Token:', token);
            res.status(200).json({ accessToken: token, message: "Access token created successfully" })
        })
        .catch((err) => {
            console.log('Error verifying refresh token:', err);
            res.status(400).json(err)
        })
}


const deleteRefreshToken = async (req, res) => {
    try {
        const { error } = refreshTokenValidation(req.body)
        if (error) {
            return res.status(400).json({ message: error.details[0].message })
        }

        const userToken = await UserToken.findOne({ token: req.body.refreshToken })

        if (!userToken) {
            return res.status(200).json({ message: "Logout successfully" })
        }

        // Additional code to delete the token can be added here if needed
        await UserToken.deleteOne({ _id: userToken._id });

        res.status(200).json({ message: "Refresh token deleted successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal server error' })
    }
}

export default { refreshToken, deleteRefreshToken }
