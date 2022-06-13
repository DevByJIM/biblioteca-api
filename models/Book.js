import mongoose from "mongoose";

const { Schema, model } = mongoose;



const bookSchema = new Schema(
    {
        title: {
            type: String,
            require:true,
            trim: true,
        },
        author: {
            type: String,
            require:true,
            trim:true,
        },
        synopsis: {
            type:String,
            trim:true,
        },
        gender: {
            type: String,
            require:true,
            trim:true,
        },
        pages: {
            type: Number,
            require:true,
        },
        cover: {
            type: String,
            trim:true,
        },
        fecpub: {
            type: String,
            require:true,
            trim:true,
        },
        feclec: {
            type: Date,
            require:true,
        },
        observ: {
            type: String,
            trim:true,
        },
        value: {
            type: Number,
        },
        hasmovie: {
            type: Boolean,
        },
        fechor:{
            type: Date,
        },
        uid: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        authorid:{
            type: Schema.Types.ObjectId,
            ref: "Author",
            required: true,
        }
    }
);

export const Book = model("Book", bookSchema);

