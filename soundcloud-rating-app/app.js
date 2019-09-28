const express = require('express')
const session = require('express-session')
const app = express()
const routes = require('./routes')
const port = process.env.PORT || 8000;

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))



// app.use(Login)

app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extends: true
}))
app.use(express.static('public'))

app.use('/', routes)
app.listen(port, () => {
    console.log(`listen to port ${port}`)
})