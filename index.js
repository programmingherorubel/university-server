const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const ObjectId = require('mongodb').ObjectId
const cors = require('cors')
const dotenv = require('dotenv')
const app = express()
const port = process.env.PORT || 5000

dotenv.config()
app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.i8wrn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

    async function run (){
        try{
            await client.connect();
            const database = client.db("university");
            const sliderCollection = database.collection("slider");
            const courseCollection = database.collection("course");
            const enentsCollection = database.collection("enent");
            const blogCollection = database.collection("blog");
            const messageCollection = database.collection("message");
            const techerCollection = database.collection("techer");
            const userCollection = database.collection("websiteUser");
            const commentsCollection = database.collection("comments");
            const eventuserCollection = database.collection("eventuser");
            const departmentCollection = database.collection("department");

            // slider 
                app.post('/slider',async(req,res)=>{
                    const slider = req.body;
                    const result = await sliderCollection.insertOne(slider)
                    res.json(result)
                })

                app.get('/slider',async(req,res)=>{
                    const slider = sliderCollection.find({})
                    const result = await slider.toArray()
                    res.send(result) 
                })

                app.delete('/slider/:id',async(req,res)=>{
                    const id = req.params.id;
                    const query = {_id:ObjectId(id)}
                    const result = await sliderCollection.deleteOne(query)
                    res.json(result)
                })
            // course 

            app.post('/createcourse',async(req,res)=>{
                const course = req.body;
                const result = await courseCollection.insertOne(course)
                res.json(result)
            })

            app.get('/createcourse',async(req,res)=>{
                const course = courseCollection.find({})
                const result = await course.toArray()
                res.json(result)
            })

            app.delete('/createcourse/:id',async(req,res)=>{
                const id = req.params.id;
                const query = {_id:ObjectId(id)};
                const result = await courseCollection.deleteOne(query)
                console.log(result)
                res.json(result)
            })
            // events 

            app.post('/events',async(req,res)=>{
                const course = req.body;
                const result = await enentsCollection.insertOne(course)
                res.json(result)
            })

            app.get('/events',async(req,res)=>{
                const course = enentsCollection.find({})
                const result = await course.toArray()
                res.json(result)
            })

            app.delete('/events/:id',async(req,res)=>{
                const id = req.params.id;
                const query = {_id:ObjectId(id)};
                const result = await enentsCollection.deleteOne(query)
                res.json(result)
            })

            // blog
            app.post('/blog',async(req,res)=>{
                const course = req.body;
                const result = await blogCollection.insertOne(course)
                res.json(result)
            })

            app.get('/blog',async(req,res)=>{
                const course = blogCollection.find({})
                const result = await course.toArray()
                res.json(result)
            })

            app.delete('/blog/:id',async(req,res)=>{
                const id = req.params.id;
                const query = {_id:ObjectId(id)};
                const result = await blogCollection.deleteOne(query)
                res.json(result)
            })

            // message 
            app.post('/message',async(req,res)=>{
                const course = req.body;
                const result = await messageCollection.insertOne(course)
                res.json(result)
            })

            app.get('/message',async(req,res)=>{
                const course = messageCollection.find({})
                const result = await course.toArray()
                res.json(result)
            })
            app.delete('/message/:id',async(req,res)=>{
                const id = req.params.id;
                const query = {_id:ObjectId(id)};
                const result = await messageCollection.deleteOne(query)
                res.json(result)
            })
            // Techer
            app.post('/createtecher',async(req,res)=>{
                const course = req.body;
                const result = await techerCollection.insertOne(course)
                res.json(result)
            })

            app.get('/createtecher',async(req,res)=>{
                const course = techerCollection.find({})
                const result = await course.toArray()
                res.json(result)
            })

            app.delete('/createtecher/:id',async(req,res)=>{
                const id = req.params.id;
                const query = {_id:ObjectId(id)}
                const reuslt = await techerCollection.deleteOne(query)
                res.json(reuslt)
            })
            // user Collection 

            app.post('/user',async(req,res)=>{
                const user = req.body;
                const result = await userCollection.insertOne(user)
                res.json(result)
            })

            app.get('/user',async(req,res)=>{
                const user = userCollection.find({})
                const result= await user.toArray()
                res.send(result)
            })

            app.put('/user',async(req,res)=>{
                const user = req.body;
                const filter = {email:user.email};
                const option = {upsert:true};
                const updateDoc = {$set:user};
                const result = await userCollection.updateOne(filter,updateDoc,option)
                res.json(result)
            })

            // admin role 
            app.put('/user/admin',async(req,res)=>{
                const user = req.body;
                const filter = {email:user.email};
                const updateDoc = {$set:{role:'admin'}};
                const result = await userCollection.updateOne(filter,updateDoc);
                res.json(result)
            })

            app.get('/user/:email',async(req,res)=>{
                const adminUser = req.params.email;
                const query = {email:adminUser};
                const user = await userCollection.findOne(query)
                    let isAdmin = false;
    
                        if(user?.role === 'admin'){
                            isAdmin = true
                        }
                    res.json({admin:isAdmin})
            })

            app.post('/comments',async(req,res)=>{
                const comment = req.body;
                const result =await commentsCollection.insertOne(comment)
                res.json(result)
            })

            app.get('/comments',async(req,res)=>{
                const comment = commentsCollection.find({})
                const result = await comment.toArray()
                res.send(result)
            })

            app.delete('/comments/:id',async(req,res)=>{
                const id = req.params.id
                const query = {_id:ObjectId(id)}
                const result = await commentsCollection.deleteOne(query)
                res.json(result)

            })

            // total event 
            app.post('/eventuser',async(req,res)=>{
                const eventuser = req.body;
                const result = await eventuserCollection.insertOne(eventuser)
                res.json(result)
            })

            app.get('/eventuser',async(req,res)=>{
                const eventuser = eventuserCollection.find({})
                const result = await eventuser.toArray()
                res.send(result)
            })

            app.delete('/eventuser/:id',async(req,res)=>{
                const id = req.params.id;
                const query = {_id:ObjectId(id)};
                const result = await eventuserCollection.deleteOne(query)
                res.json(result)
            })

            // personCourse 
            app.post('/department',async(req,res)=>{
                const department = req.body;
                const result = await departmentCollection.insertOne(department)
                res.json(result)
            })

            app.get('/department',async(req,res)=>{
                const department = departmentCollection.find({})
                const result =await department.toArray()
                res.json(result)
            })
            app.delete('/department/:id',async(req,res)=>{
                const id = req.params.id;
                const query = {_id:ObjectId(id)};
                const result = await departmentCollection.deleteOne(query)
                res.json(result)
            })
        }
        finally{

        }
    }

    run().catch(console.dir)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})