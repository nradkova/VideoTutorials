const { getOneById } = require("../services/courseService")


function preloadOne(){
    return async (req,res,next)=>{
        try {
            const course=await getOneById(req.params.id);
            if(course){
                req.course=course;
            }
        } catch (error) {
            console.error('Database error:' + error.message);
        }
        next();
    }
}

module.exports=preloadOne;