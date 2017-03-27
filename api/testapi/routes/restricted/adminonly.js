export default{
    method: 'get',
    path: '/api/admin',
    config: {
        auth: 'jwt'
    },
    handler: (req, res) => {
        res({ message: 'You are viewing a restricted page because you are authorized and you are admin.' }).header("Authorization", req.headers.authorization);
    }
};