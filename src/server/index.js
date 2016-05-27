'use strict';
// Import the required libraries
import * as graphql from 'graphql';
import graphqlHTTP from 'express-graphql';
import express from 'express';
import * as Promise from 'bluebird';
import config from  './config.json';
import schema from './data/schema';

// const auth = (req, res, next) => {
//     const token = req.get('X-Auth-Token');
//
//     if (token && token === config.secret) { return next();}
//
//     console.log(`Unauthorized. Token provided: ${token}`)
//     res.status(401).end();
// }

const cors = (req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    next();
}

express()
  .use('/graphql', cors,  graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
