'use strict'

import boom from 'boom'
import { TotalKaum } from '../../model/P_TotalKaum'

export default {
    method: 'POST',
    path: '/api/totalkaumparlimen',
    config: {
        auth: false,
        cors: true
    },
    handler: (req, res) => {
        let total = new TotalKaum
        total.kod_parlimen = req.payload.kod_parlimen
        total.kod_negeri = req.payload.kod_negeri
        total.melayu = req.payload.melayu
        total.cina = req.payload.cina
        total.india = req.payload.india
        total.lain = req.payload.lain
        total.jumlah = req.payload.jumlah

        total.save((err, total) => {
            if (err) {
                throw err
            }

            res( { data: total })
        })
    }
}