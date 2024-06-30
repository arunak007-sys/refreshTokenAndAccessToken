import jwt from 'jsonwebtoken'
import UserToken from '../schema/userToken.js'

const verifyRefreshToken = (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY

    return new Promise((resolve, reject) => {
        UserToken.findOne({ token:refreshToken }, (err, doc) => {
            if (!doc) {
                return reject({ err, message: "Invalid refresh token" })
            }

            jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if (err) {
                    return reject({ err, message: "Invalid refresh token" })
                }

                resolve({ tokenDetails, message: "Valid refresh token" })
            })
        })
    })
}

export default verifyRefreshToken
