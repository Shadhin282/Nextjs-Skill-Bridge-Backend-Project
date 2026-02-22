import express from "express";
import { categoriesController } from "./categories.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";


const router = express.Router();

router.get('/',categoriesController.getCategory)
router.post('/',categoriesController.postCategory)
router.delete('/:id',auth(UserRole.ADMIN), categoriesController.deleteCategory)



export const  categoriesRoute = router;