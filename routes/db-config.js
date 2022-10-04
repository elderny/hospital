module.exports =
    process.env.NODE_ENV !== 'production' ?
        process.env.MONGO_DEV : process.env.MONGO_PROD