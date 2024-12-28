const express=require('express');
const app=express();
const PORT=8001;
const urlRoute=require('./routes/url');
const connectDb=require('./connection');
const cors=require('cors')

app.use(express.json());

app.use(cors());
app.use('/url',urlRoute);
connectDb('mongodb://localhost:27017/urlshortner');

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});