const router = require('express').Router();

const formatErrorMsg = require('../util/formatErrorMsg');
const {getUserCourses } = require('../services/userService');
const { isGuest, isUser } = require('../middlewares/guard');
const { userValidation } = require('../middlewares/validation');

router.get('/login', isGuest(), (req, res) => {
    res.render('auth/login', { title: 'Login'})
});

router.post('/login', isGuest(),userValidation(), async (req, res) => {
    try {
        if (req.userErrors) {
            throw req.userErrors;
        }
        const { username, password } = req.body;
        await req.auth.login(username, password);
        res.redirect('/');
    } catch (error) {
        const errors = formatErrorMsg(error);
        res.render('auth/login', { title: 'Register', errors, user: req.body });
    }
});

router.get('/register', isGuest(), (req, res) => {
    res.render('auth/register', { title: 'Register' });
});

router.post('/register', userValidation(), async (req, res) => {
    try {
        if (req.userErrors) {
            throw req.userErrors;
        }
        const { username, password, repass} = req.body;
        await req.auth.register(username, password);
        res.redirect('/');

    } catch (error) {
        const errors = formatErrorMsg(error);
        res.render('auth/register', { title: 'Register', errors, user: req.body});
    }
});

router.get('/logout',isUser(), (req, res) => {
    req.auth.logout(); 
    res.redirect('/');
});

router.get('/user',isUser(), async (req, res) => {
    const user=await getUserCourses(req.user._id);
    user.coursesList=user.courses.map(x=>x.title).join(', ');
    res.render('auth/profile', { title: 'Profile',user});
});

module.exports = router;