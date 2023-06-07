import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import path from 'path';

import router from './Routes/TeacherRoutes.js';

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

const port = process.env.PORT || 3001;

mongoose
.connect(process.env.connectionURL)
.then(() => console.log("Mongodb connected to - successfully ♡"))
.catch((err) => {
    console.log(err);
})

app.use('/teacher', router);

app.use((req, res, next) => {
    console.log(`${req.method}, in ${req.url} - ${new Date().toISOString()}`);
    next();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
