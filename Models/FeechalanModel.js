import mongoose from 'mongoose';

const FeeChalanSchema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true
    },
    isPaid:{
        type: Boolean,
        required: true,
        default: false
    },
    pathToFile:{
        type: String,
        required: true
    }
});

const FeedChalan = mongoose.model('Feedback', FeeChalanSchema);
export default FeedChalan;