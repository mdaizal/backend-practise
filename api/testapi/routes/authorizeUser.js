import JWT from 'jsonwebtoken';
import { Login, createToken } from '../../../config';

export default {
    method: 'post',
    path: '/api/login',
    config: {
        auth: false,
        cors: true,
        pre: [
            {
                method: Login, assign: 'user'
            }
        ],
        handler: (req, res) => {
            res({ token: createToken(req.pre.user), username: req.payload.username }).code(201);
        }
    }
};