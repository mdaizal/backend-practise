'use strict'

import boom from 'boom'
import { Parlimen } from '../../model/Parlimen'

export default {
    method: 'GET',
    path: '/api/listparlimen',
    config: {
        auth: false,
        cors: true
    },
    handler: (req, res) => {
        Parlimen.find({}, (err, result) => {
            if (err){
                boom.badRequest( { error: err })
            }

            res( { parlimen: result })
        })
    }
}