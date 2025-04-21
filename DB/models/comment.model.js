import mongoose from 'mongoose';
const {Schema,model} =mongoose

const commentSchema = new Schema({
    content:String,
    rate:{
        type:Number,
        enum:["0","1","2","3","4","5"],
        default:"0",
        min:1,
        max:5,
        required:true
    },
    createdBy:{
      type:  Schema.Types.ObjectId,
      ref:"User"
    },
    productId:{
        type:  Schema.Types.ObjectId,
        ref:"Product"
    }
},{timestamps:true})


export default mongoose.model.Comment||model("Comment",commentSchema)