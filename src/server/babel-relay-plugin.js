var babel = require('babel-core');
var fs = require('fs');
var path = require('path')
// `babel-relay-plugin` returns a function for creating plugin instances
var getBabelRelayPlugin = require('babel-relay-plugin');

// load previously saved schema data (see "Schema JSON" below)
var schema = require('./data/schema.json');

// create a plugin instance
var plugin = getBabelRelayPlugin(schema.data);
const source = fs.readFileSync(path.join(__dirname, '../client/routes/AppHomeRoute.js'));

// compile code with babel using the plugin
return babel.transform(source, {
    plugins: [plugin],
});
