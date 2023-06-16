const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
// mongo

mongoose.connect('mongodb://127.0.0.1:27017/Assignment4', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });

const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    description: String,
});

//const ProductModel = mongoose.model('Product', ProductSchema);
const User1 = mongoose.model('products',ProductSchema); // get the User model
//------------------------------------------------------------------------
app.get('/products', function(req, res) {
    User1.find().exec()
    .then(function(products) {
        res.send(products);
    })
    .catch(function(err) {
        console.log(err);
        res.status(500).send('Error retrieving products');
    });

  });
//------------------------------------------------------------------------

app.get('/products/:id', function(req, res) {
    const id = req.params.id;
  
   
  
      // Find the product with the specified ID
      User1.findOne({ _id: id }, function(err, product) {
        if (err) throw err;
        if (!product) {
          res.status(404).send('Product not found');
        } else {
          res.send(product);
        }
        client.close();
      });
    });
//------------------------------------------------------------------------
app.get('/products', function(req, res) {
    const limit = parseInt(req.query.limit) || 10;
  
    
  
      // Limit the number of results returned by the query
      User1.find().limit(limit).toArray(function(err, products) {
        if (err) throw err;
        res.send(products);
        client.close();
      });
    });
//------------------------------------------------------------------------



const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());

// Signup endpoint
app.post("/signup", async (req, res) => {
  try {
    const newUser = new User({
      name:req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    await newUser.save();

    res.status(201).send("User created");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
});

// Login endpoint
app.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user.password === req.body.password) {
      res.status(200).send("Login successful");
    } else {
      res.status(401).send("Incorrect email or password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error logging in");
  }
});



app.listen(5000, () => {
    console.log("Server is listening on port 5000");
});