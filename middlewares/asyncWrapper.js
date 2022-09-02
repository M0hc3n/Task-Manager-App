const asyncWrapper = (func) => {
    return async (req, res , next) => {
        try {
            await func(req, res, next)
        } catch (error) {
            next(error)
// normally if we did not set a custom error handler, this call of next(error) 
// will trigger the express native error handler , however by setting our own
// handler , the call of next(error) will automatically call the customErrorHandler 
        }
    }
}

module.exports = asyncWrapper