import mongoose from "mongoose";

const{ Schema, model} = mongoose;

const authorSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
            trim:true,
        },
        fecnac: {
            type: Date,
            require:true,
        },
        image: {
            type: String,
            trim:true,
        },
        descrip: {
            type: String,
            trim:true,
        },
        uid: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    }
);

export const Author = model("Author", authorSchema);