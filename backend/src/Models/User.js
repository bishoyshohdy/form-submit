const { Int32 } = require('mongodb');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

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
        data: Buffer,
        contentType: String,
        // required: true,
      },
      stageOfDevelopment: {
        type: String,
        // required: true,
      },
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
          data: Buffer,
          contentType: String,
        },

});

module.exports = mongoose.model('User', UserSchema);
