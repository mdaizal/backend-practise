'use strict';

import hapi from 'hapi';
import glob from 'glob';
import path from 'path';
import { STATIC_ROUTES, GOOD_LOGGING, SECRET_KEY, validate } from './config';

const server = new hapi.Server();

server.connection({ port: 3003 });

// attach static routes
server.register(require('inert'), (err) => {
    if (err){
        throw err;
    }

    STATIC_ROUTES.forEach(route => {
        console.log(`Attaching static routes ${route.path}`);
        server.route(route);
    })
});

// attach test api
const pattern = 'api/**/testapi/**routes/*.js'
glob.sync(pattern, {
    root: __dirname
}).forEach(file => {
    const route = require(path.join(__dirname, file));
    console.log(`Attaching API routes: ${route.default.path} (${route.default.method})`);
    server.route(route.default);
});

// attach restricted api
server.register(require('hapi-auth-jwt2'), (err) => {
    if (err){
        throw err;
    }

    server.auth.strategy('jwt', 'jwt', {
        key: SECRET_KEY,
        validateFunc: validate,
        verifyOptions: { algorithms: ['HS256'] }
    });

    const restrict_api = 'api/**/testapi/**/restricted/*.js';
    glob.sync(restrict_api, {
        root: __dirname
    }).forEach(file => {
        const route = require(path.join(__dirname, file));
        console.log(`Attaching restricted API routes: ${route.default.path} (${route.default.method})`)
        server.route(route.default);
    });
});

// start server and log activities
server.register(GOOD_LOGGING, (err) => {
    if (err){
        throw err;
    }

    server.start((err) => {
        if (err){
            throw err;
        }

        console.log(`Server is running at: ${server.info.uri}`);
    });
});