import JWT from 'jsonwebtoken';
import boom from 'boom';
import mongoose from 'mongoose';
import { User } from './api/testapi/model/User';
import bcrypt from 'bcryptjs';

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

const dbUrl = 'mongodb://localhost:27017/hapi-app';

export const Login = (req, res) => {
    const password = req.payload.password;
    const username = req.payload.username;

    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl, {}, (err) => {
        if(err) {
            throw err;
        }
    });

    User.findOne({ username: username }, (err, user) => {
        if(user) {
            bcrypt.compare(password, user.password, (err, isValid) => {
                if(isValid){
                    res({id: user._id, username: user.username, admin: user.admin});
                } else {
                    res(boom.badRequest('Wrong password'));
                }
            });
        } else {
            res(boom.badRequest('Wrong username'));
        }
    });

    mongoose.disconnect((err) => {
        if(err) {
            throw err;
        }
    });
};

const afterLogin = (decodedId) => {
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl, {}, (err) => {
        if(err) {
            throw err;
        }
    });

    return User.findOne({ _id: decodedId }, {})
        .select('-password -__v -email')
        .exec((err, user) => {
            if(err) {
                throw err;
            }

            if(!user) {
                throw boom.badRequest('Something got stuck in the middle...');
            } else {                
                return user;
            }
        });

        mongoose.disconnect();
};

export const validate = (decoded, request, callback) => {
    console.log(" - - - - - - - decoded token:");
    console.log(decoded);
    console.log(" - - - - - - - request info:");
    console.log(request.info);
    console.log(" - - - - - - - user agent:");
    console.log(request.headers['user-agent']);
  
    if(!afterLogin(decoded.id)){
        return callback(null, false);
    } else {
        return callback(null, true);
    }
};

export const createToken = (user) => {
    return (
        {token: JWT.sign(user, SECRET_KEY, { algorithm: 'HS256', expiresIn: '5m' })}
    );
};