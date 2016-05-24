import fs from 'fs';
import path from 'path';
import schema from './data/schema';
import { graphql }  from 'graphql';
import { introspectionQuery, printSchema } from 'graphql/utilities';
import * as Promise from 'bluebird'

// Save JSON of full schema introspection for Babel Relay Plugin to use
const getSchema = (schema, introspection) => {
    graphql(schema, introspectionQuery).then(result => {
        if (result.errors) {
          console.error(
            'ERROR introspecting schema: ',
            JSON.stringify(result.errors, null, 2)
          );
        } else {
          fs.writeFileSync(
            path.join(__dirname, './data/schema.json'),
            JSON.stringify(result, null, 2)
          );
        }
    })
};





getSchema(schema, introspectionQuery);

// Save user readable type system shorthand of schema
fs.writeFileSync(
  path.join(__dirname, './data/schema.graphql'),
  printSchema(schema)
);
