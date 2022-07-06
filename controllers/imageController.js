const asyncHandler = require("express-async-handler")
const path = require("path")
const fs = require("fs")
const uploadsPath = path.join(__dirname, "../uploads")
const userPlaceholderPath = path.join(__dirname, '../uploads/user-img-placeholder.png')

const uploadImage = asyncHandler(async (req, res) => {
  const file = req.files.image
  const filename = req.body.filename
  const ext = file.name.split('.')[1]
  console.log(file)
  file.mv(`${uploadsPath}/${filename}.${ext}`, (err) => {
    if (err) console.log(err)
  })
})

const getImage = asyncHandler(async (req, res) => {
  // Reading uploads folder for each file inside. I put split in comparison to match on filename regardless of extension.
  // Because extension may vary (jpg, jpeg, png, bmp.)
  let file 

  fs.promises.readdir(uploadsPath).then((files) => {
    files.forEach((item) => {
      if (req.params.id === item.split(".")[0])
        file = (`${uploadsPath}/${item}`)
    })
    return file
  }).then(data => {
    if (data)
    res.sendFile(data)
    else 
    res.sendFile(userPlaceholderPath)
  })
})
module.exports = { uploadImage, getImage }
