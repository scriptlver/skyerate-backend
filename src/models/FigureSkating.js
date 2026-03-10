const mongoose = require("mongoose");

const PerformanceSchema = new mongoose.Schema(

    {

      music: {
        type: [String],
        trim: true,
        },

      skaters: {
      type: [String],
      required: true,
      trim: true,
        },

      artist: {
        type: [String],
        required:true,
        trim:true,
      },

        skaterCountry: {
        type: String,
        required: true,
        trim: true,
        },

        modality: {
            type: String,
            required: true,
            enum: ["individual feminino", "individual masculino", "duplas", "dança no gelo"]
        },

        category: {
        type: String,
        required: true,
        enum: ["Novato", "Junior", "Senior", "Elite"],
        },

        event: {
            type: String,
            required: true,
            trim: true,
        },

        currentRanking: {
            type: Number,
        },

        duration: {
            type: String,
        },

        technicalScore: {
        type: Number,
        default: 0,
        },

        programComponents: {
        type: Number,
        default: 0,
        },

        deductions: {
        type: Number,
        default: 0,
        },

        totalSegmentScore: {
        type: Number,
        required: true,
        },

  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Performance", PerformanceSchema);