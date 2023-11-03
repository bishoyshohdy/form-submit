
// const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://contracktrial:7FoqwZHMdfKSUORr@contrack.vyss1cb.mongodb.net/?retryWrites=true&w=majority";

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Require the 'cors' module
const userRoutes = require('./src/Routes/UserRoutes');
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      return cb(null, './docs'); 
  },
  filename: function (req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`); 
  }
});


const upload = multer({ storage: storage });

const app = express(); 

const allowedOrigins = ['http://localhost:3001'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.use(cors(corsOptions)); 

app.use(express.json());
app.use('/users', userRoutes);
// app.post('/uploads', upload.fields([{ name: 'technology', maxCount: 1 }, { name: 'businessModel', maxCount: 1 }]), (req, res) => {
//   // console.log(req.body);
//   console.log(req.files);
//   const technologyFile = req.files['technology'];
//   // const businessModelFile = req.files['businessModel'][0];

//   const technologyObject = {
//     technology: "Your technology description", // You can set this as needed
//     filename: technologyFile.filename,
//     filePath: `/docs/${technologyFile.filename}`,
//     uploadedAt: new Date(),
//   };

//   const user = {
//     step5: [technologyObject], // You can append it to the existing "step5" array
//   };

//   // Save the user object to your MongoDB collection

//   // Return a response to the frontend
//   res.json(technologyObject); // You can adjust the response as needed
// });

app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post('/uploads', upload.fields([{ name: 'technology', maxCount: 1 }, { name: 'businessModel', maxCount: 1 }]), (req, res) => {
  console.log(req.files);
  const technologyFile = req.files['technology'];

  const technologyObject = {
    technology: {
      name: technologyFile.name,
      lastModified: technologyFile.lastModified,
      lastModifiedDate: technologyFile.lastModifiedDate,
      size: technologyFile.size,
      type: technologyFile.type,
      webkitRelativePath: technologyFile.webkitRelativePath,
    },
    filename: technologyFile.filename,
    filePath: `/docs/${technologyFile.filename}`,
    uploadedAt: new Date(),
  };

  const User = {
    step5: [technologyObject], 
  };

  res.json(technologyObject); 
});









// MongoDB Configuration
const connectionString =
  "mongodb+srv://contracktrial:WM6UvZBGA0rWME8D@cluster0.8rdmzee.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start the server on port
const PORT = 3000;
app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
