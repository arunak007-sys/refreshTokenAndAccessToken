import jwt from 'jsonwebtoken';
import UserToken from '../schema/userToken.js';

const verifyRefreshToken = async (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise(async (resolve, reject) => {
        try {
            const doc = await UserToken.findOne({ token: refreshToken });

            if (!doc) {
                return reject({ message: "Invalid refresh token" });
            }

            jwt.verify(refreshToken, privateKey, (err, tokenDetails) => {
                if (err) {
                    return reject({ message: "Invalid refresh token" });
                }

                resolve({ tokenDetails, message: "Valid refresh token" });
            });
        } catch (err) {
            reject({ message: "Internal server error" });
        }
    });
};

export default verifyRefreshToken;
