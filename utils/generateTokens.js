import jwt from 'jsonwebtoken';
import UserToken from '../schema/userToken.js';

const generateTokens = async (user, res) => {
    try {
        const payload = { _id: user._id };

        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
            expiresIn: '20s'
        });

        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
            expiresIn: '30d'
        });

        res.cookie("accessToken", accessToken, {
            maxAge: 20 * 1000, 
            httpOnly: true,
            secure: true,
        });

        const userTokens = await UserToken.findOne({ userId: user._id });

        if (userTokens) {
            await UserToken.deleteOne({ userId: user._id });
        }

        await new UserToken({ userId: user._id, token: refreshToken }).save();

        return Promise.resolve({ accessToken, refreshToken });
    } catch (error) {
        console.log(error.message);
        return Promise.reject(error);
    }
};

export default generateTokens;
