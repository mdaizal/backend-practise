'use strict'

import boom from 'boom'
import { SimulasiParlimen } from '../../model/P_Simulasi'

export default{
    method: 'POST',
    path: '/api/simulasiparlimen',
    config: {
        auth: false,
        cors: true
    },
    handler: (req, res) => {
        let sim = new SimulasiParlimen
        sim.kod_parlimen = req.payload.kod_parlimen
        sim.t_melayu = req.payload.t_melayu
        sim.t_cina = req.payload.t_cina
        sim.t_india = req.payload.t_india
        sim.t_lain = req.payload.t_lain
        sim.u_melayu = req.payload.u_melayu
        sim.u_cina = req.payload.u_cina
        sim.u_india = req.payload.u_india
        sim.u_lain = req.payload.u_lain
        sim.sim_count = req.payload.sim_count
        let created = new Date()
        sim.sim_created = created

        sim.save((err, sim) => {
            if (err) {
                throw err
            }

            res( { data: sim })
        })
    }
}