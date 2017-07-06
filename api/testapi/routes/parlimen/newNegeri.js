'use strict'

import boom from 'boom'
import { Negeri } from '../../model/Negeri'

export default {
    method: 'POST',
    path: '/api/negeri',
    config: {
        auth: false,
        cors: true
    },
    handler: (req, res) => {
        let negeri = new Negeri
        negeri.kod_negeri = req.payload.kod_negeri
        negeri.nama_negeri = req.payload.nama_negeri
        negeri.save((err, negeri) => {
            if (err) {
                throw err
            }

            res({ data: negeri })
        })
    }
}