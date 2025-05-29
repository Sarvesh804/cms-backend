import express from "express";
import db from "./config/db";
import articleRoute from "./routes/article.route";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

db.one('SELECT NOW()')
    .then((result)=>{
        console.log("Database connection successful:", result.now);
    })
    .catch((error)=>{
        console.error("Database connection failed:", error);
        process.exit(1);
    })

app.get('/health',(req,res)=> {
    res.status(200).json({status: "OK"});
})

app.use('/api',articleRoute);

app.listen(PORT,()=>{
    console.log(`Server is runnig on port ${PORT}`);
    console.clear();
})
