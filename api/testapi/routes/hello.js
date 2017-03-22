export default {
    method: 'get',
    path: '/api/hello',
    handler: (req, res) => {
        res({ res: 'Hello there' });
    }
};