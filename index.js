const express = require('express')
const multer = require('multer');
const path = require('path')
const uploadFolder = "./uploads";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadFolder)
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname)
        const fileName = file.originalname.replace(fileExt,"").toLocaleLowerCase().split(" ").join("-") + "-" + Date.now()
        cb(null,fileName + fileExt)
    }
})

const upload = multer({
    storage:storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (req, file, cb) => {
        if(file.mimetype === "image/jpg" || file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
            cb(null, true)
        }
        else{
            cb(new Error ('there is some problem to upload your file extension, only jpg,jpeg, png allowed'))
        }
    }

});
const app = express();

app.post('/', upload.single("avatar" ) , (req, res) => {
    res.send('Hello world')
})

// default error handler 
app.use((error,req, res, next) => {
    if(error){
        res.status(500).send(error.message)
    }else{
        res.send("success")
    }
}) 

app.listen(5000, () => {
    console.log("app is runnig on port 5000");
})