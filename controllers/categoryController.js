import Category from "../models/category.js"
import { isAdminValid } from "./userControllers.js"

export function createCategory(req, res) {
    if (req.user == null) {
        res.status(404).json({
            message: "Unauthorized"
        })
        return
    }
    if (req.user.type != "admin") {
        res.status(403).json({
            message: "Forbidden"
        })
        return
    }
    const newCategory = new Category(req.body)
    newCategory.save().then(
        (result) => {

            res.json({
                message: "Category Created Successfully",
                result: result
            })

        }).catch(
            (err) => {
                res.json({
                    message: "Category Created Failed"
                })

            })

}
export function deleteCategory(req, res) {
    if (req.user == null) {
        res.status(401).json({
            message: "Unauthorized"
        })
        return
    }
    if (req.user.type != "admin") {
        res.status(403).json({
            message: "Forbidden"
        })
        return

    }

    const name = req.params.name

    Category.findOneAndDelete({ name: name }).then(
        (result) => {
            if (result == null) {
                res.json({
                    message: "Category Not Found"
                })
            } else {
                (err) => {
                    res.json({
                        message: "Category Delete Successfully",
                        error: err
                    })

                }


            }



        }
    )
    res.json({
        message: "Delete Successfully"
    })
}
export function getCategories(req, res) {

    Category.find().then(
        (result) => {
            res.json({
                message: "Categories fetched successfully",
                data: result
            })
        }
    ).catch(
        (err) => {
            res.status(500).json({
                message: "Failed to fetch categories",
                error: err.message
            })
        }
    )
}
export function updateCategory(req, res) {

    if (!isAdminValid) {
        res.status(403).json({
            message: "Unauthorized"
        })

    }

    const name = req.params.name

    Category.findOneAndUpdate(
        { name: name },
        req.body,
        { new: true }
    ).then(
        (result) => {
            if (result == null) {
                res.status(404).json({
                    message: "Category Not Found"
                })
            } else {
                res.json({
                    message: "Category Updated Successfully",
                    data: result
                })
            }
        }
    ).catch(
        (err) => {
            res.status(500).json({
                message: "Update Failed",
                error: err.message
            })
        }
    )
}
export function getCategoryByName(req, res) {

    const name = req.params.name

    Category.findOne({ name: name }).then(
        (result) => {
            if (result == null) {
                res.status(404).json({
                    message: "Category Not Found"
                })
            } else {
                res.json({
                    data: result
                })
            }
        }
    ).catch(
        (err) => {
            res.status(500).json({
                message: "Error fetching category",
                error: err.message
            })
        }
    )
}

