const { Schema, model } = require("mongoose")


const favouriteSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        artPiece: {
            type: Schema.Types.ObjectId,
            ref: "Art",
        },
    },
    {
    timestamps: true
    }
 );

const Favourite = model("Favourite", favouriteSchema);

module.exports = Favourite;

