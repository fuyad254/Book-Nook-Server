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

// A user can borrow the same book only once.
try {
  await borrowsCollection.createIndex(
    { userEmail: 1, bookId: 1 },
    { unique: true }
  )
  console.log("Unique borrow index is ready.")
} catch (err) {
  console.dir(err)
}



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

// http://localhost:5000/my-books/email
app.get("/my-books/:email", async(req,res)=>{
  const {email}= req.params
  const result= await bookCollection.find({email: email}).toArray()
  res.send(result)
})



// http://localhost:5000/borrows/email
app.get("/borrows/:email", async(req,res)=>{
  const {email}= req.params
  const result = await borrowsCollection.find({userEmail: email}).toArray()
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


app.patch("/my-books/:id", async(req,res)=>{
    const {id}= req.params
    const EditData= req.body
    const result= await bookCollection.updateOne({_id: new ObjectId(id)}, {$set:EditData})
    res.json(result)
  })

app.delete("/my-borrow/:id", async(req,res)=>{
  const {id}= req.params
  const result= await borrowsCollection.deleteOne({_id: new ObjectId(id)})
  res.send({messege: "delete sucseccful"})
})


app.delete("/my-books/:id", async(req,res)=>{
  const {id}= req.params
  const result= await bookCollection.deleteOne({_id: new ObjectId(id)})
  res.send({messege: "delete sucseccful"})
})





// http://localhost:5000/my-borrow
app.post("/my-borrow", async(req,res)=>{
  const data= req.body ?? {}
  const { bookId, userEmail } = data

  if (!bookId || !userEmail) {
    return res.status(400).send({ message: "bookId and userEmail are required." })
  }

  try {
    const existing = await borrowsCollection.findOne({ bookId, userEmail })

    if (existing) {
      return res.status(409).send({ message: "You have already borrowed this book." })
    }

    const result= await borrowsCollection.insertOne(data)

    res.status(201).send({ insertedId: result.insertedId })
  } catch (err) {
    // Duplicate key from the unique index (two requests at the same time).
    if (err?.code === 11000) {
      return res.status(409).send({ message: "You have already borrowed this book." })
    }

    console.dir(err)
    res.status(500).send({ message: "Could not borrow this book. Please try again." })
  }
})

app.listen(PORT ,()=>{
    console.log(`server is running on ${PORT}`);
})