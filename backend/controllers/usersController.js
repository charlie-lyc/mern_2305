/**
 * Replace 'try catch' statement in 'async await' syntax 
 */
import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'

import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


/**
 * @desc   Register new user and generate token and set cookie of response 
 * @method POST
 * @route  /api/users/
 * @access public
 */
const registerUser = asyncHandler(async (req, res) => {
    /**
     * First controller
     */
    // res.status(200).json({ message: 'Register User' })

    /**
     * Test error handler
     */
    // res.status(401)
    // throw new Error('Something went wrong')

    /**
     * Validate request data
     */
    // console.log(req.body)
    const { name, email, password } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('Provide name, email, and password.')
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
        res.status(400)
        throw new Error('User with this email already exists.')
    }

    /**
     * Register new user
     */
    const newUser = await User.create({ name, email, password })
    if (!newUser) {
        res.status(500)
        throw new Error('Failed in user registration.')
    }

    /**
     * Generate token and set cookie of response
     */
    generateToken(res, newUser._id)

    res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
    })
    
})


/**
 * @desc   Authenticate user and generate token and set cookie of response 
 * @method POST
 * @route  /api/users/auth
 * @access public
 */
const authUser = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Authenticate User' })

    /**
     * Validate request data
     */
    const { email, password } = req.body
    if (!email || !password) {
        res.status(400)
        throw new Error('Provide email and password.')
    }

    /**
     * Authenticate user
     */
    const foundUser = await User.findOne({ email })
    if (!foundUser) {
        res.status(400)
        throw new Error('Invalid email.')
    }
    const isMatch = await foundUser.matchPassword(password)
    if (!isMatch) {
        res.status(400)
        throw new Error('Invalid password.')
    }

    /**
     * Generate token and set cookie of response
     */
    generateToken(res, foundUser._id)

    res.status(200).json({
        _id: foundUser._id,
        name: foundUser.name,
        email: foundUser.email,
    })
})


/**
 * @desc   Logout user with destroying cookie
 * @method POST
 * @route  /api/users/logout
 * @access private
 */
const logoutUser = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Logout User' })

    /**
     * Destroy cookie
     */
    res.cookie(
        'jwt', 
        '', 
        { 
            httpOnly: true,
            maxAge: 0,
            // expires: new Date(0),
        }
    )

    req.user = null
    res.status(200).json({ message: 'User logged out.' })
})


/**
 * @desc   Get user profile
 * @method GET
 * @route  /api/users/profile
 * @access private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'User Profile' })

    // console.log(req.user)
    res.status(200).json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    })
})


/**
 * @desc   Update user profile
 * @method PUT
 * @route  /api/users/profile
 * @access private
 */
const updateUserProfile = asyncHandler(async (req, res) => {
    // res.status(200).json({ message: 'Updated User Profile' })

    // console.log(req.body)
    // console.log(req.user)
    const { name, email, password } = req.body
    const user = await User.findById(req.user._id)

    /**
     * Update user name
     */
    // if (name) {
    //     user.name = name
    // }
    //////////////////////////////
    user.name = name || user.name

    /**
     * Update user email
     */
    if (email) {
        /* Validate entered email */
        const emailInUse = await User.findOne({ email })
        if (emailInUse) {
            res.status(400)
            throw new Error('Email is already in use.')
        }
        user.email = email
    }

    /**
     * Update user password
     */
    if (password) {
        user.password = password
    }
    const updatedUser = await user.save()

    res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
    })
})


export { 
    authUser, 
    registerUser, 
    logoutUser, 
    getUserProfile, 
    updateUserProfile 
}