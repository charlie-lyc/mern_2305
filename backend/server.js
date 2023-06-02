/**
 * Set environmental variables
 */
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
const app = express()

import cookieParser from 'cookie-parser'
import path from 'path'

///////////////////////////////////////////////////////////////////////////
/**
 * Connect database
 */
import connectDB from './configs/db.js'
connectDB()

// const port = 3001
const port = process.env.PORT || 3001

/* Parse data in request */
app.use(express.json()) // JSON
app.use(express.urlencoded({ extended: true })) // x-www-form-urlencoded

/* Parse cookie in request */
app.use(cookieParser())

///////////////////////////////////////////////////////////////////////////
/**
 * Root route
 */
if (process.env.NODE_ENV === 'development') {
    app.get('/', (req, res) => {
        res.send('Server is ready!')
    })
}

/* Use router middleware */
import usersRouter from './routers/usersRouter.js'
app.use('/api/users', usersRouter)

/**
 * Serve frontend
 */
if (process.env.NODE_ENV === 'production') {
    const __dirname = path.resolve()
    app.use(express.static(path.join(__dirname, '/frontend/dist')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

///////////////////////////////////////////////////////////////////////////
/**
 * Use errorhandler middleware
 */
import { notFound, errorHandler } from './middlewares/errorMiddleware.js'
app.use(notFound)
app.use(errorHandler)

app.listen(port, () => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`Server started on port ${port}`)
    }
})

