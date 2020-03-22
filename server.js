if (process.env.NODE !== 'production') {
    require('dotenv').config()
}
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes/index');

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layouts');
app.use(expressLayouts);
app.use(express.static('public'));

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose
    .connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Conexao a base de dados efetuada com sucesso');
    })
    .catch(err => {
        console.log('Houve um erro ao efectuar a conexao ' + err);
    });

app.get('/', indexRouter);

app.listen(process.env.PORT || 3000);