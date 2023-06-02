import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'

import User from '../models/userModel.js'


const protect = asyncHandler(async (req, res, next) => {
    // console.log(req.cookies)
    const token = req.cookies.jwt
    if (!token) {
        res.status(401)
        throw new Error('No token, not authorized.')
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET)
    const foundUser = await User.findById(decoded.userId).select('-password')
    if (!foundUser) {
        res.status(401)
        throw new Error('Invalid token, not authorized.')
    }
    req.user = foundUser
    next()
})


export default protect


