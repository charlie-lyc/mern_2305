/**
 * Dealing with no request routes
 * @example 
 *      POST /api/users/validation 
 */
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)
}

/**
 * Handling when throw error on backend
 * @example
 *      POST /api/users/auth
 *      ...
 *      res.status(401)
 *      throw new Error('Something went worng')
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode
    let errorMessage = err.message

    /**
     * Handling Mongoose's specific error
     */
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404
        errorMessage = 'Resource not found'
    }

    res.status(statusCode).json({
        message: errorMessage,
        stack: process.env.NODE_ENV === 'development' ? err.stack : null
    })
}

export { notFound, errorHandler }