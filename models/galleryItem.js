import mongoose from "mongoose";


const galleryItemsSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },


})

const GalleryItem = mongoose.model("GalleryItems", galleryItemsSchema)
export default GalleryItem;