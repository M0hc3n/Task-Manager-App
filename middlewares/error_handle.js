const customAPIErrorHandler = require('../errors/error')


const customErrorHandler = (err, req, res, next) =>{
    if (err instanceof customAPIErrorHandler){
        return res.status(err.status).json(err.message)
    }
    return res.status(500).json("Uknown error had occured, please verify you are setting the data correctly, or try later ...")
}

module.exports = customErrorHandler