import express from "express"
import { createCategory, deleteCategory, getCategories, getCategoryByName, updateCategory } from "../controllers/categoryController.js";

const categoryRouter =express.Router()

categoryRouter.get("/:name", getCategoryByName)
categoryRouter.get("/", getCategories)
categoryRouter.post("/",createCategory)
categoryRouter.put("/:name", updateCategory)
categoryRouter.delete("/:name",deleteCategory)




export default categoryRouter;

