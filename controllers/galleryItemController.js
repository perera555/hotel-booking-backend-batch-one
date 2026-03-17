import GalleryItem from "../models/galleryItem.js"

export function createGalleryItems(req, res) {
    //cant create users to addimages//
    const user = req.user
    if (user == null) {
        res.status(403).json({
            message: "please login to create to gallery item"
        })
        return;

    }
    if (user.type != "admin") {
        res.status(403).json({
            message: "You Dont have permission to create a gallery Item"
        })
        return
    }

    const galleryItem = req.body

    const newGallerItems = new GalleryItem(galleryItem)

    newGallerItems.save().then(
        () => {
            res.json({
                message: "Gallery Items Created Successfully"
            })
        }
    ).catch(
        () => {
            res.status(500).json({
                message: "Gallery Item Create failed"
            })
        }
    )

}

export function getGalleryItems(req, res) {

    GalleryItem.find().then(
        (list) => {
            res.json({
                list: list
            })

        }
    ).catch(
        () => {
            res.json({
                message: "gallary item find failed"
            })

        }
    )

}