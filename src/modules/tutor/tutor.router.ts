import express from "express";
import { tutorController } from "./tutor.controller";
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";

const router = express.Router();

router.get('/',tutorController.getTutor)
router.get('/:id', tutorController.getTutorById)
router.get('/details/:id', tutorController.getTutorDetailsById)

router.post('/profile',auth(UserRole.TUTOR), tutorController.postTutor)
router.put('/profile',auth(UserRole.TUTOR), tutorController.putTutorProfile)




export const tutorRoute = router;