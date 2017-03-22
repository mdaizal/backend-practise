export default {
    method: 'get',
    path: '/api/greeting/{name}',
    handler: (req, res) => {
        res({ res: 'Greetings Master ' + encodeURIComponent(req.params.name) });
    }
};