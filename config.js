import JWT from 'jsonwebtoken';
import boom from 'boom';

export const STATIC_ROUTES = [
    {
        method: 'GET',
        path: '/',
        handler: (req, res) => {
            res.file('./public/index.html')
        }
    },
    {
        method: 'GET',
        path: '/{p*}',
        handler: (req, res) => {
            res.file('./public/404.html')
        }
    }
];

export const GOOD_LOGGING = {
    register: require('good'),
    options: {
        ops: {
            interval: 1000
        },
        reporters: {
            consoleLog: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{
                    response: '*',
                    log: '*'
                }]
            }, {
                module: 'good-console'
            }, 'stdout'],
            fileLog: [{
                module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ ops: '*' }]
            }, {
                module: 'good-squeeze',
                name: 'SafeJson',
                args: [
                    null,
                    { separator: ','}
                ]
            }, {
                module: 'rotating-file-stream',
                args: [
                    'ops_log',
                    {
                        size: '1000B',
                        path: './log'
                    }
                ]
            }]
        }
    }
};

export const SECRET_KEY = 'V1ID9J3jXAZCimmimhx08VJayjP0R3n1Z9QulVt4LAwQR5rNN9Z8L37x3Qd2Mk7WaGnuOyQ+XbUwoiXQTgHc+twB5cKyNypPFDQ63tgGlpqFe/K4pMlUYaqV2iFALlkBjjUmXrNRXGZQQNI3qvGb62rrkekgd7yo8txVst89kEGfkhGaYTRBa9kibJuE8c0qf8I69M3ku6QW+DdHnSReWJcYkYxf5RZI2S2y6vqem0iracW5xU5m4sTYyDBLaiQWIpLv57UtN/HgcBBLMLYXIaz1yaHaf65VDc6sp3CS5aKhyHsi0O4mPve/wqUjv5EItWSW1ai+fjcOSyMsep5Yuw==';

// for testing jwt authorization
export const people = {
    1: {
        id: 1,
        name: 'Aizal valid user',
        username: 'mdaizal',
        password: 'mdaizal',
        scope: 'admin'
    }
};

export const userLogin = (req, res) => {
    const password = req.payload.password;
    const username = req.payload.username;

    if(username === people[1].username) {
        if(password === people[1].password) {
            res(people[1]);
        } else {
            res(boom.badRequest('Wrong password'));
        }
    } else {
        res(boom.badRequest('Wrong username'));
    }
};

export const validate = (decoded, request, callback) => {
    console.log(" - - - - - - - decoded token:");
    console.log(decoded);
    console.log(" - - - - - - - request info:");
    console.log(request.info);
    console.log(" - - - - - - - user agent:");
    console.log(request.headers['user-agent']);
    if (!people[decoded.id]){
        return callback(null, false);
    } else {
        return callback(null, true);
    }
}

export const createToken = (user) => {
    return (
        {token: JWT.sign(user, SECRET_KEY, { algorithm: 'HS256', expiresIn: '5m' })}
    );
};