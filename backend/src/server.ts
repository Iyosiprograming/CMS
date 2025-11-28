import express from 'express';
import { connectDB } from './config/dbConfig'
import Employe from './routers/userRouter'
import Owner from "./routers/ownerRouter"
const app = express();
app.use(express.json());
app.use('/api/employee', Employe)
app.use('/api/owner', Owner)
const PORT = process.env.PORT || 3000;

const startServer = async () => {
    try {
        await connectDB()
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error)
    }
}

startServer()