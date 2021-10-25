const {Schema,model}=require('mongoose');

const schema=new Schema({
    title:{
        type:String,
        required:true
    },
    description :{
        type:String,
        required:true
    },
    imageUrl :{
        type:String,
        required:true
    },
    isPublic :{
        type:Boolean,
        default:false
    },
    owner :{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    enrolled :[{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:[]
    }]
},{timestamps:true});

module.exports=model('Course',schema);