function isGuest(){
    return (req, res, next) => {
        if (!req.user) {
            next();
        } else {
            res.redirect('/');
        }
    }
}

function isUser() {
    return (req, res, next) => {
        if (req.user) {
            next();
        } else {
            res.redirect('/auth/login');
        }
    }
}

function isOwner() {
    return (req, res, next) => {
        
        if (req.user && req.course &&(req.user._id==req.course.ownerId)) {
            next();
        } else {
            res.redirect('/');
        }
    }
}

module.exports={
    isGuest,
    isUser,
    isOwner
}