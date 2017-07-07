'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const TotalKaumParlimen = new Schema({
    kod_parlimen: { type: Number, required: true, index: { unique: true } },
    kod_negeri: { type: Number, required: true },
    melayu: { type: Number, required: true },
    cina: { type: Number, required: true },
    india: { type: Number, required: true },
    lain: { type: Number, required: true },
    jumlah: { type: Number, required: true }
})

export const TotalKaum = mongoose.model('TotalKaum', TotalKaumParlimen )