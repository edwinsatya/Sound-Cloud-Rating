const router = require('express').Router()
const UserController = require('../controllers/userController')
const SongController = require('../controllers/songController')

const Login = (req, res, next)=>{
    if(req.session.user) next()
    else res.redirect('/?err='+ 'please login first')
}

// const
// router.get('/', (req, res) => {
//     res.render('home')
// })

// --------------- USER -----------------
router.get('/signUp', (req, res) => {
    res.render('signUpForm')
})
router.post('/signUp', UserController.register)


router.get('/', (req, res) => {
    res.render('signInForm')
})
router.post('/', UserController.login)

router.get('/logout', UserController.logout)


router.get('/main', SongController.library)
// router.get('/main/:songId', SongController.getRating)
// router.get('/main/give-rating/:songId/:value', Login, UserController.addRating)
// router.post('/main/give-rating/:songId/:value', UserController.addRating)
// router.post('/library/:usrId/give-rating/:songId/value', UserController.addRating)
router.post('/main/give-rating/:songId', Login, UserController.addRating)
// var ratingInput = $(".rating-input")

// ratingInput.on('change', function (e) {
//     var url = "/main/give-rating/" + ratingInput.data("id") + "/" + e.target.value;
//     // console.log(url)
//     window.location.replace(url)
// })




module.exports = router