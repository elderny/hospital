module.exports =
  process.env.NODE_ENV == "development"
    ? process.env.DEV_REACT
    : process.env.PROD_REACT;
