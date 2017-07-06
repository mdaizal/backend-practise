'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const NegeriModel = new Schema({
    kod_negeri: { type: Number, required: true, index: { unique: true } },
    nama_negeri: { type: String, required: true }
})

export const Negeri = mongoose.model('Negeri', NegeriModel )