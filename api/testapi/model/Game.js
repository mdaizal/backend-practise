import mongoose from 'mongoose'

const Schema = mongoose.Schema

const GameModel = new Schema({
    title: { type: String },
    genre: { type: String },
    description: { type: String },
    developer: { type: String },
    year_released: { type: Date },
    platform: { type: String },
    finished: { type: Boolean }
})

export const Game = mongoose.model('Game', GameModel )