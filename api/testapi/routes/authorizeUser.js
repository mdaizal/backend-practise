import JWT from 'jsonwebtoken';
import { userLogin, createToken } from '../../../config';

export default {
    method: 'post',
    path: '/api/login',
    config: {
        auth: false,
        pre: [
            {
                method: userLogin, assign: 'user'
            }
        ],
        handler: (req, res) => {
            res(createToken(req.pre.user)).code(201);
        }
    }
};