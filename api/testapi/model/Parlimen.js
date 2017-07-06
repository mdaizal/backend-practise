'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const ParlimenModel = new Schema({
    kod_parlimen: { type: Number, required: true, index: { unique: true } },
    nama_parlimen: { type: String, required: true },
    kod_negeri: { type: Number, required: true }
})

export const Parlimen = mongoose.model('Parlimen', ParlimenModel )