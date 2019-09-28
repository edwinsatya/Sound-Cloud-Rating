const User = require('../models').User
const Song = require('../models').Song
const Rating = require('../models').Rating
const hashPassword = require('../helpers/hashPassword')
 
class UserController {

    static register(req, res) {
        let obj = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        }
        //console.log(obj)
        User.create({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                email: req.body.email
            })
            .then(user => {
                res.redirect('/')
            })
            .catch(err => res.send(err))
    }



    static login(req, res) {
        User.findOne({
                where: {
                    username: req.body.username
                }
            })
            .then(userFound => {
                let passHash = hashPassword(req.body.password, userFound.salt)
                if (userFound.password === passHash) {
                    req.session.user = {
                        id : userFound.id,
                        name : userFound.name
                    }
                    res.redirect(`/main`) //---session
                }
            })
            .catch(err => res.send(err))
    }

    // router.get('/logout',(req,res)=>{
    //     req.session.destroy(()=>{res.redirect('/')})
    // })

    static logout(req,res){
        req.session.destroy(()=>{
            res.redirect('/main')
        })
    }

    static giveRating(req, res) {
        res.render('main', {})
    }

    static addRating(req, res) {
        console.log(req.body.rating, 'asasfasfas');
        Rating.create({
                UserId: req.session.user.id,
                SongId: req.params.songId,
                rating: req.body.rating // 0-25-50-75-100
            })
            .then(createdRating => {
                res.redirect(`/main`)
            })
            .catch(err => res.send(err))
    }


}
module.exports = UserController