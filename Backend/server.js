import app from "./app.js";
import { dbconnection } from "./config/dbconnection.js";

const port = process.env.PORT || 3000;

dbconnection();

app.listen(port, async() =>{
    console.log(`Your Server is running on http://localhost:${port}`);
})