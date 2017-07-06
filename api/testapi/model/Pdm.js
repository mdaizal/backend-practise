'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const PdmModel = new Schema({
    kod_pdm: { type: Number, required: true, index: { unique: true } },
    nama_pdm: { type: String, required: true },
    kod_parlimen: { type: Number, required: true },
    kod_dun: { type: Number, required: true },
    kod_negeri: { type: Number, required: true }
})

export const Pdm = mongoose.model('Pdm', PdmModel )