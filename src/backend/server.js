const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = express.Router();
const PORT = 4000;

let Parts = require('./part.model');

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mvparts', {useNewUrlParser: true});
const connection = mongoose.connection;

//Remove for Production
connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
})

routes.route('/').get(function(req, res) {
    Parts.find(function(err, parts) {
        if (err) {
            console.log(err);
        } else {
            res.json(parts);
        }
    });
});

routes.route('/add').post(function(req, res) {
    let part = new Parts(req.body);

    console.log(part.files);
});

// routes.route('/add').post(upload.single('imageData'), function(req, res) {
//     let part = new Parts(req.body);
//     part.save()
//         .then(part => {
//             res.status(200).json({'mvparts': 'mvparts added successfully'});
//         })
//         .catch(err => {
//             res.status(400).send('adding new mvparts (parts) failed');
//         });

//     const image = new Image({
//         imageName: req.body.imageName,
//         imageData: req.file.path
//     })

//     image.save().then((res) => {
//         res.status(200).json({
//             success: true,
//             document: res
//         });
//     }).catch(err => {
//         res.status(400).send('adding new mvparts (image) failed');
//     })
// });

app.use('/mvparts', routes)

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});