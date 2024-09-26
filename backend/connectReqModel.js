import mongoose from "mongoose";

const registerSchema = new mongoose.Schema({
    
        post_id: String,
        PosterEmail: String,
        PosterName:String,
        RequesterEmail: String,
        RequesterName: String,
        Status: Boolean
      
});

const ConReqModel = mongoose.model('ConReqModel', registerSchema);

export default ConReqModel;
