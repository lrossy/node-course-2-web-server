const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = (process.env.PORT)? process.env.PORT: 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use( (req, res, next) => {

    var now = new Date().toString();

    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('cant log')
        }
    });
    next();
});

// app.use( (req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance'
//     });
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (word) => {
    return word.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: "Welcome!"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        welcomeMessage: "Welcome!"
    });
});
app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
        welcomeMessage: "projects blah"
    });
});
app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Cannot handle request'
    })
});
app.listen( port, () => {
    console.log(`server is up on port ${port}`)
});