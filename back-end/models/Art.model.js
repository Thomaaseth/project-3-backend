const { Schema, model } = require('mongoose')

const artSchema = new Schema (
    {
        art: {
            type: String,
        },
        description: {
            type: String,
            minLength: 10,
            maxLength: 1000,
        },
        title: {
            type: String,            
        },
        date: {
            type: Date,
        },
        artist: {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    },
    {
        timestamps: true,
    }
)

const Art = model('Art', artSchema)

module.exports = Art