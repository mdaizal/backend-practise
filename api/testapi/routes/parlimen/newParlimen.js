'use strict'

import boom from 'boom'
import { Parlimen } from '../../model/Parlimen'

export default {
    method: 'POST',
    path: '/api/parlimen',
    config: {
        auth: false,
        cors: true
    },
    handler: (req, res) => {
        let parlimen = new Parlimen
        parlimen.kod_parlimen = req.payload.kod_parlimen
        parlimen.nama_parlimen = req.payload.nama_parlimen
        parlimen.kod_negeri = req.payload.kod_negeri
        parlimen.save((err, parlimen) => {
            if (err) {
                throw err
            }

            res({ data: parlimen })
        })
    }
}