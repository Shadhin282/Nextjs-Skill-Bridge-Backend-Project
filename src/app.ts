import express from "express"
import cors from 'cors'
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import { tutorRoute } from "./modules/tutor/tutor.router";
import { bookingRoute } from "./modules/booking/booking.router";
import { reviewsRoute } from "./modules/review/review.router";
import { categoriesRoute } from "./modules/categories/categories.router";
import { userRoute } from "./modules/admin/admin.router";
import { notFound } from "./middleware/notFound";
import { availabilityRoute } from "./modules/availability/availability.router";



const app = express();

app.use(express.json())
app.use(cors({
    origin : ["http://localhost:3000","https://skillbridge-project.netlify.app"],
    credentials: true
}))

// Auth route 
app.all('/api/auth/*splat', toNodeHandler(auth));


app.use('/api/tutors',tutorRoute)

app.use('/api/tutor', tutorRoute)

app.use('/api/availability',availabilityRoute)

app.use('/api/bookings',bookingRoute)

app.use('/api/reviews',reviewsRoute)

app.use('/api/categories', categoriesRoute)

app.use('/api/admin',userRoute)

app.get("/", (req, res) => {
    
    res.send("Hello, Skill Bridge World!");
});

app.use(notFound);


export default app;