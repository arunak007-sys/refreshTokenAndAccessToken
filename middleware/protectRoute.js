import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    const token = req.cookies.accessToken || req.headers.authorization
    if(!token) {
        return res.status(401).json({ message: "Access denied. No token provided" })
    }

    try{
        const tokenDetails = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY)

        req.user = tokenDetails
        next()
    }
    catch(err) {
        return res.status(400).json({ message: "Access Denied : Invalid token" })
    }
}
export default auth