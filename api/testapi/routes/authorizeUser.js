import JWT from 'jsonwebtoken';
import { Login, createToken } from '../../../config';

export default {
    method: 'post',
    path: '/api/login',
    config: {
        auth: false,
        pre: [
            {
                method: Login, assign: 'user'
            }
        ],
        handler: (req, res) => {
            res(createToken(req.pre.user)).code(201);
        }
    }
};