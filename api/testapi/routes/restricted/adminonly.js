import { isAdmin } from '../../../../config'

export default{
    method: 'get',
    path: '/api/admin',
    config: {
        auth: 'jwt',
        pre: [
            {
                method: isAdmin, assign: 'admin'
            }
        ]
    },
    handler: (req, res) => {
        res({ message: 'You are viewing a restricted page because you are authorized and you are admin.', info: req.pre.admin }).header("Authorization", req.headers.authorization);
    }
};