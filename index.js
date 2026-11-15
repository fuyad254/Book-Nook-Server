import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config'
import cors from "cors"

const app = express();


const PORT= 5000
// http://localhost:5000/

app.use(cors())
app.use(express.json())



const client = new MongoClient(process.env.MONGODB_URI);

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
const bookCollection= db.collection("book")
const borrowsCollection= db.collection("borrow")



// http://localhost:5000/books
app.get("/books", async(req,res)=>{
    const result= await bookCollection.find().toArray()
    res.send(result)
})



// http://localhost:5000/book/id
app.get("/book/:id", async(req,res)=>{
    const {id}= req.params
    const result= await bookCollection.findOne({_id: new ObjectId(id)})
    res.send(result)
})


// app.get("/my-book", async(req,res)=>{
//   const result= await bookCollection.find()
// })


// http://localhost:5000/add-book
app.post('/add-book' , async(req, res) => {
    const data =req.body
    const result = await bookCollection.insertOne(data)
    res.send({messege: "data come okey"})
})

// http://localhost:5000/my-borrow
app.post("/my-borrow", async(req,res)=>{
  const data= req.body
  const result= await borrowsCollection.insertOne(data)
})

app.listen(PORT ,()=>{
    console.log(`server is running on ${PORT}`);
})