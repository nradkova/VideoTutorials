const { getAll } = require('../services/courseService');

const router = require('express').Router();

router.get('/', async (req, res) => {
    try {

        const courses= await getAll();
        const ctx = {
            title: 'Home page',
            courses
        }
        
        res.render('home/home', ctx)
    } catch (error) {
       res.redirect('/404');
    }
});

// router.get('/offers', async (req, res) => {
//     try {
//         const ctx = {
//             title: 'Offers'
//         }
//         const all = await getAllHousings();

//         if (all.length > 0) {
//             ctx.housings = all;
//         }
//         res.render('home/offers', ctx)
//     } catch (error) {
//         res.redirect('/404');
//     }
// });

// router.get('/search', async (req, res) => {
//     try {
//         res.render('home/search', { title: 'Search'})
//     } catch (error) {
//         res.redirect('/404');
//     }
// });

// router.post('/search', async (req, res) => {
//     try {
//         const housings = await getAllHousingsOfType(req.body.search.toLowerCase());
//         res.render('home/search', {title: 'Search',housings})
//     } catch (error) {
//         res.redirect('/404');
//     }
// });


module.exports = router;