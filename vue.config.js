// module.exports = {
//     publicPath: ‘<my-first-project>’
//     } 

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/proj-name/'
        : '/'
}
