const User = require('../Models/User');
const multer = require('multer');
const storage = multer.memoryStorage();
module.exports.upload = multer({ storage: storage });

exports.createUser = async (req, res) => {   
  try {
    const technology = req.files.technology ? req.files.technology[0] : null;
    const businessModel = req.files.businessModel ? req.files.businessModel[0] : null;

    const newUser = await User.create({    
      companyName: req.body.companyName,
      companyDescription: req.body.companyDescription,
      teamMembers: req.body.teamMembers,
      teamMemberNames: req.body.teamMemberNames,
      teamMemberRoles: req.body.teamMemberRoles,
      problem: req.body.problem,
      solution: req.body.solution,
      targetMarket: req.body.targetMarket,
      stageOfDevelopment: req.body.stageOfDevelopment,
      pitchDeckLink: req.body.pitchDeckLink,
      businessPlanLink: req.body.businessPlanLink,
      intellectualPropertyDescription: req.body.intellectualPropertyDescription,
      competitiveLandscapeDescription: req.body.competitiveLandscapeDescription,
      website: req.body.website,
      socialMediaLinks: req.body.socialMediaLinks,
      videoPitchLink: req.body.videoPitchLink,
      technology: {
        data: technology.buffer,
        contentType: technology.mimetype,
      },
      businessModel: {
        data: businessModel.buffer,
        contentType: businessModel.mimetype,
      }
    });
    res.status(201).json(newUser); 
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