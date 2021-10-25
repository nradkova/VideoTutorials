const {Schema,model}=require('mongoose');

const schema=new Schema({
    username:{
        type:String,
        required:true
    },
    // email:{
    //     type:String,
    //     required:true
    // },
    hashedPassword:{
        type:String,
        required:true
    },
    // gender:{
    //     type:String,
    //     enum:['female','male'],
    //     required:true
    // },
    courses:[{
        type:Schema.Types.ObjectId,
        ref:'Course',
        default:[]
    }]
})

module.exports=model('User',schema);