import mongoose from "mongoose";

<<<<<<< HEAD
const PostSchema = new mongoose.Schema(
    {
        College:String,
        UserId:String,
        UserName:String,
        An: Boolean,
        Re: Boolean,
        Desc:String,
        Course:String,
        Img:String,
    }
);
=======
const PostSchema = new mongoose.Schema({
    College: String,
    UserId: String,
    UserName: String,
    An: Boolean,
    Re: Boolean,
    Desc: String,
    Course: String,
    Img: String
});
>>>>>>> cefa0d140bc8ac733bb507e9789890be255b9ec0

const PostModel = mongoose.model('PostModel', PostSchema);

export default PostModel;
