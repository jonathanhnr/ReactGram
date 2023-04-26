const mongoose = require("mongoose")
const {Schema} = mongoose

const photoSchema = new Schema({
    image: String,
    title: String,
    likes: [{
        type: Schema.ObjectId,
        ref: "User"
    }],
    comments: Array, userId: {
        type: Schema.ObjectId,
        ref: "User"
    },
    userName: String,
}, {
    timestamps: true,
})
const Photo = mongoose.model("Photo", photoSchema)
module.exports = Photo;