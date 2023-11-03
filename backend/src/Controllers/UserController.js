const User = require('../Models/User');


exports.createUser = async (req, res) => {   
  try {
    const newUser= new User(req.body);     
    const savedUser = await newUser.save();       
    res.status(201).json(savedUser); 
  } catch (err) {
    res.status(500).json(err);
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const Users = await User.find();
    res.status(200).json(Users);
  } catch (err) {
    res.status(500).json(err);
  }
};


