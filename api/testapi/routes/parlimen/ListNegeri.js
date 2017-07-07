'use strict'

import boom from 'boom'
import { Negeri } from '../../model/Negeri'

export default {
    method: 'GET',
    path: '/api/listnegeri',
    config: {
        auth: false,
        cors: true
    },
    handler: (req, res) => {
        Negeri.find({}, (err, result) => {
            if (err) {
                boom.badRequest("Got problems...")
            }

            res( { negeri: result })
        })
    }
}