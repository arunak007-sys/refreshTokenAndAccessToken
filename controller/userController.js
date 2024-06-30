
const getUser  = async (req, res) => {
    try {
        res.status(200).json({message:"user Aunthenticated"})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: error.message })
    }
}

export default { getUser }