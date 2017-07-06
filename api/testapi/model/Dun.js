'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const DunModel = new Schema({
    kod_dun: { type: Number, required: true, index: { unique: true } },
    nama_dun: { type: String, required: true },
    kod_parlimen: { type: Number, required: true },
    kod_negeri: { type: Number, required: true }
})

export const Dun = mongoose.model('Dun', DunModel )