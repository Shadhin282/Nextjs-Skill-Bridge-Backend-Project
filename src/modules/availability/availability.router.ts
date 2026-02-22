import express from 'express'
import { auth } from "../../middleware/auth";
import { UserRole } from "../../../prisma/generated/prisma/enums";
import { availabilityController } from './availability.controller';


const router = express.Router();

router.get('/',auth(UserRole.TUTOR),availabilityController.getAvailability)
router.post('/',auth(UserRole.TUTOR),availabilityController.postAvailability)
router.put('/',auth(UserRole.TUTOR), availabilityController.putAvailability)

export const availabilityRoute = router;