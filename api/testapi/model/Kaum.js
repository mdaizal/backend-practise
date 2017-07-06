'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const KaumModel = new Schema({
    kod_parlimen: { type: Number, required: true },
    kod_dun: { type: Number, required: true },
    kod_pdm: { type: Number, required: true },
    kod_negeri: { type: Number, required: true },
    melayu: { type: Number, required: true },
    cina: { type: Number, required: true },
    india: { type: Number, required: true },
    lain: { type: Number, required: true }
})

export const Kaum = mongoose.model('Kaum', KaumModel )