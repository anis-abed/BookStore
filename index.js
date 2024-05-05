const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const apiRoutes = require('./routes/api');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/miniprojet2',{
     useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/', apiRoutes);
app.use(express.static(path.join(__dirname,'public')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
