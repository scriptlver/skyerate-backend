const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },

        director:{
            type:String,
            required:true,
            trim:true,
        },

        genre:{
            type:[String],
            required:true,
            lowercase: true,
            enum: [
                "Terror",
               "Suspense",
               "Ação",
              "Ficção Científica",
              "Romance",
              "Comédia",
              "Comédia romântica",
              "Drama"
            ]
        },

       duration:{
          type:Number,
          required:true,
          min: 1
        },

        platform:{
            type:String,
            required:true,
            trim:true,
        },

        releaseYear:{
            type:Number,
            required:true,  
        },

        coverImage:{
            type:String,
            required:true,
        },

        isBook:{
            type:Boolean,
            default:false,
        },

        bookName:{
            type:String,
            trim:true,
        },

        isSaga:{
           type:Boolean,
           default:false,
        },

        sagaName:{
            type:String,
            trim:true,
        },

        externalLinks:{
            type:[String],
            trim:true,
        },

        externalId: {
            type: String,
            index: true,
            unique: true,
            sparse: true,
       },

        description:{
           type:String,
           trim:true,
           maxlength: 1000,
        },
    },
    { timestamps: true },
);

module.exports = mongoose.model("Movie", MovieSchema);