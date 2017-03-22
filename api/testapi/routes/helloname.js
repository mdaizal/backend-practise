export default {
    method: 'post',
    path: '/api/helloname',
    handler: (req, res) => {
        const { name } = req.payload;
        res({ res: `Hello ${name}`});
    }
};