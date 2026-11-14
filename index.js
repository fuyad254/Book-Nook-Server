import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config'

const app = express();

const PORT= 5000





const client = new MongoClient(`${process.env.MONGODB_URI}`);

export async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("You successfully connected to MongoDB!");
    return client;
  } catch (err) {
    console.dir(err);
  }
}

const mongoClient= await connectToMongoDB()

const db = mongoClient.db("bookNook")
const BookCollection= db.collection("book")

app.get("/books", (req,res)=>{
    res.send("hi this is go")
})

app.listen(PORT ,()=>{
    console.log(`server is running on ${PORT}`);
})