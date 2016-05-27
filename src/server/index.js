'use strict';
// Import the required libraries
import * as graphql from 'graphql';
import graphqlHTTP from 'express-graphql';
import express from 'express';
import * as Promise from 'bluebird';
import config from  './config.json';
import schema from './data/schema';
const cors = require('cors');


express()
  .options('*', cors())
  .use('/graphql', cors(),  graphqlHTTP({ schema: schema, pretty: true }))
  .listen(3000);

console.log('GraphQL server running on http://localhost:3000/graphql');
