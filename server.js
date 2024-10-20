import app from "./app.js";
import database from "./config/database.js";
import dotenv from 'dotenv'

dotenv.config({path:"./config/config.env"})
database();
const PORT=process.env.PORT||8000

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})