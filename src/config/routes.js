const homeController=require('../contollers/homeController');
const authController=require('../contollers/authController');
const courseController=require('../contollers/courseController');



const routesConfig=(app)=>{
    app.use('/',homeController);
    app.use('/auth',authController);
    app.use('/courses',courseController);
    app.all('*',(req,res)=>res.render('404',{title:'Not Found'}));
}
module.exports=routesConfig;