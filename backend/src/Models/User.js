const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  step1: [
    {
      companyName: {
        type: String,
        // required: true,
      },
      companyDescription: {
        type: String,
        // required: true,
      },
      teamMembers: {
        type: Number,
        // required: true,
      },
      teamMemberNames: {
        type: [String],
        // required: true,
      },
      teamMemberRoles: {
        type: [String],
        // required: true,
      },
    },
  ],
  step2: [
    {
      problem: {
        type: String,
        // required: true,
      },
      solution: {
        type: String,
        // required: true,
      },
      targetMarket: {
        type: String,
        // required: true,
      },
      businessModel: {
        type: Buffer,
        contentType:String

        // required: true,
      },
    },
  ],
  step3: [
    {
      stageOfDevelopment: {
        type: String,
        // required: true,
      },
    },
  ],
  step4: [
    {
      
      businessPlanLink: {
        type: String,
      },
      pitchDeckLink: {
        data: String,
        contentType: String,
      },
      technology: {
        type: String,
      },
      intellectualPropertyDescription: {
        type: String,
      },
      competitiveLandscapeDescription: {
        type: String,
      },
    },
  ],
    step5: [
      {
        website: {
          type: String,
        },
        socialMediaLinks: {
          type: String,
        },
        videoPitchLink: {
          type: String,
        },
        technology:{
          filename: String,
          filePath: String, 
          uploadedAt: { type: Date, default: Date.now
        },
        },
      }
  ],
});

module.exports = mongoose.model('User', UserSchema);
