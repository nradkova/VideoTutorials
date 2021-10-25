const router = require('express').Router();

const preloadOne = require('../middlewares/preload');
const { editUser } = require('../services/userService');
const formatErrorMsg = require('../util/formatErrorMsg');
const { isUser, isOwner } = require('../middlewares/guard');
const { courseValidation } = require('../middlewares/validation');
const { createOne, delOne, editOne, enrollCourse } = require('../services/courseService');

// router.get('/', async (req, res) => {
//     try {
//         const trips = await getAll();
//         res.render('trips/shared-trips', { title: 'Shared Trips', trips })
//     } catch (error) {
//         res.redirect('404');
//     }
// });

router.get('/create', isUser(), (req, res) => {
    try {
        res.render('courses/create', { title: 'Create' })
    } catch (error) {
        res.redirect('404');
    }
});

router.post('/create', isUser(), courseValidation(), async (req, res) => {
    let course = {};
    try {
        if (req.courseErrors) {
            throw req.courseErrors;
        }
        const {title,description,imageUrl,isPublic } = req.body;
        course = {
            title,
            description,
            imageUrl,
            isPublic,
            owner: req.user._id
        }
        const created = await createOne(course);
        // await editUser(req.user._id, created._id);
        res.redirect('/');
    } catch (error) {
        if (error.name == 'inputError' || error.name == 'ValidationError') {
            errors = formatErrorMsg(error);
            res.render('courses/create', { title: 'Create', errors, course: req.body });
        } else {
            res.redirect('/404')
        }
    }
});

router.get('/:id/details', preloadOne(), async (req, res) => {
    try {
        const course=req.course;
        const ctx = {
            title: 'Details',
            course
        }
        
        if (course.ownerId == req.user?._id) {
            course.owner = true;
        }
        if(req.user && !course.owner && !course.enrolled.some(x=>x==req.user._id)){
            course.canEnroll=true;
        }
        if(course.enrolled.some(x=>x==req.user?._id)){
            course.hasEnrolled=true;
        }
        res.render('courses/details', { title: 'Details', course });

    } catch (error) {
        res.redirect('/404')
    }
});

router.get('/:id/edit', preloadOne(), isOwner(), async (req, res) => {
    try {
        const course = req.course;
        const ctx = {
            title: 'Edit',
            course
        }
        res.render('courses/edit', ctx);

    } catch (error) {
        res.redirect('/404')
    }
});

router.post('/:id/edit', preloadOne(), isOwner(), courseValidation(), async (req, res) => {
    let course = {};
    try {
        if (req.courseErrors) {
            throw req.courseErrors;
        }
        const {title,description,imageUrl,isPublic } = req.body;
        course = {
            title,
            description,
            imageUrl,
            isPublic,
            owner: req.user._id
        }
        await editOne(req.params.id, course);
        res.redirect(`/courses/${req.params.id}/details`);
    } catch (error) {
        if (error.name == 'inputError' || error.name == 'ValidationError') {
            errors = formatErrorMsg(error);
            res.render('courses/edit', { title: 'Edit', errors, course: req.body });
        } else {
            res.redirect('/404')
        }
    }
});

router.get('/:id/delete', preloadOne(), isOwner(), async (req, res) => {
    try {
        await delOne(req.params.id);
        res.redirect('/');

    } catch (error) {
        res.redirect('/404')
    }
});


router.get('/:id/enroll', isUser(), async (req, res) => {
    try {
        await enrollCourse(req.params.id, req.user._id);
        res.redirect(`/courses/${req.params.id}/details`);
    } catch (error) {
        res.redirect('/404')
    }
});


module.exports = router;