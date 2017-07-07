'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const SimulasiParlimenModel = new Schema(
    {
        kod_parlimen: { type: Number, required: true },
        t_melayu: { type: Number, required: true }, // t_<kaum> - % turnout
        t_cina:{ type: Number, required: true },
        t_india:{ type: Number, required: true },
        t_lain:{ type: Number, required: true },
        u_melayu: { type: Number, required: true }, // u_<kaum> - % undi BN. Undi lawan auto-calc. tak perlu 3, 4 penjuru coz sum pihak lawan = 1 pihak lawan
        u_cina: { type: Number, required: true },
        u_india: { type: Number, required: true },
        u_lain: { type: Number, required: true },
        sim_count: { type: Number },
        sim_created: { type: Date }
    }
)

export const SimulasiParlimen = mongoose.model('SimulasiParlimen', SimulasiParlimenModel )