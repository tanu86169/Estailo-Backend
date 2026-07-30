const multer = require('multer')

const storage =multer.diskStorage({})
const upload = multer({
    storage
})


module.exports = upload


// const multer = require('multer')

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/')
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname)
//   }
// })

// module.exports = multer({ storage })