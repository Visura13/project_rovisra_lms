require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const multer = require('multer');
const PORT = process.env.PORT || 3500;
const bodyParser = require('body-parser');
//var fs = require('fs');


//app.set("view engine", "ejs");

// Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement


// Cross Origin Resource Sharing
app.use(cors());

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// built-in middleware to handle urlencoded form data
//app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

app.post('/upload-image', async (req, res) => {
    const body = req.body;
    try{
        const newImage = await Image.create(body)
        newImage.save();
        res.status(201).json({ msg : "New image uploaded...!"})
    }catch(error){
        res.status(409).json({ message : error.message })
    }
})

app.get('/get-image', async (req, res) => {
    try {
        await Image.find({}).then(data => {
            res.json(data)
        })
    } catch (error) {
        console.log(error)
    }
})


// routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use('/courses', require('./routes/api/courses'));


app.use(verifyJWT);
app.use('/editors', require('./routes/api/editors'));

app.post("/uploadImage", (req, res) => {
    uploadImage(req.body.image)
      .then((url) => res.send(url))
      .catch((err) => res.status(500).send(err));
  });
  
  app.post("/uploadMultipleImages", (req, res) => {
    uploadImage
      .uploadMultipleImages(req.body.images)
      .then((urls) => res.send(urls))
      .catch((err) => res.status(500).send(err));
  });

/*
app.post('/upload-image', async (req, res) => {
    const {base64} = req.body

    try {
        Image.create({image: base64})
        res.send({status: 'ok'})
    } catch (error) {
        res.send({status: 'error', data: error})
    }
})
*/


app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});