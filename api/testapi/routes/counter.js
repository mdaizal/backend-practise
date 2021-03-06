import boom from 'boom';
import { Counter } from '../model/Counter';

export default{
  method: 'GET',
  path: '/api/counter',
  config: {
    auth: false,
    cors: true
  },
  handler: (req, res) => {
    Counter.find({}, (err, result) => {
      if(err) {
        res(boom.badRequest(err)) ;
      }
      res(result);
    })
  }
};