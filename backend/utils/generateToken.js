import jwt from 'jsonwebtoken'


const generateToken = (res, userId) => {
    const token = jwt.sign(
        { userId },             // Value to be hashed
        process.env.JWT_SECRET, // Secret to be used
        // Options
        {  
            // expiresIn: '1d'
            expiresIn: '3h'
        }
    )

    res.cookie(
        'jwt', // Cookie name
        token, // Value to be loaded
        // Options
        {
            httpOnly: true, // Only by the web server
            secure: process.env.NODE_ENV === 'production', // *** for HTTPS ***
            sameSite: 'strict', // Mitigate the risk of CSRF attacks
            maxAge: 3 * 60 * 60 * 1000,// Set expiry time in milliseconds: 3 hours
            // expires: new Date(Date.now() + 3 * 60 * 60 * 1000), // Set expiry date in GMT: 3 hours
        }
    )
}


export default generateToken