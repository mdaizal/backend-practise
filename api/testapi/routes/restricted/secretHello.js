export default{
    method: 'get',
    path: '/api/secretHello',
    config: {
        auth: 'jwt'
    },
    handler: (req, res) => {
        res({ message: 'You are viewing a restricted page because you are authorized.', useragent: req.headers['user-agent'] }).header("Authorization", req.headers.authorization);
    }
};