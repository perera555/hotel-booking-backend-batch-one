 import express from 'express'
import { createGalleryItems, getGalleryItems } from '../controllers/galleryItemController.js'
 const galleryitemsRouter = express.Router()

 galleryitemsRouter.post("/",createGalleryItems)
 galleryitemsRouter.get("/",getGalleryItems)

export default galleryitemsRouter;