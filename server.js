const mongoose = require('mongoose');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(require("./routes"));

//setup mongoose 

mongoose.connect(process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/Social-Network-API', {
    useNewURLParser: true,
    useUnifiedTopology: true
});

mongoose.set("debug", true);

app.listen(PORT, () =>
    console.log(`connected at http://localhost:${PORT}`)
);