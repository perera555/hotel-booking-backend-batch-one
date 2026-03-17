 import express from 'express'
import { createGalleryItems, getGalleryItems } from '../controllers/galleryItemController.js'
 const galleritemsRouter = express.Router()

 galleritemsRouter.post("/",createGalleryItems)
 galleritemsRouter.get("/",getGalleryItems)

 export default galleritemsRouter;