export default {
    method: 'get',
    path: '/api/greeting',
    handler: (req, res) => {
        res({ res: 'Greetings Master.' });
    }
};