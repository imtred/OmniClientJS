const ServerError = require('../errors/server-error');
const omniClientMapper = require('../mappers/omni-client-mapper');
const Omni = require('./../../../lib/OmniRPC.js').Omni;
const fs = require('fs');
const starWars = require('starwars');

const configurationFile = './../../../configuration.json';
const configuration = JSON.parse(fs.readFileSync(configurationFile));

/**
 * OmniServer service
 * @class OmniServerService
 */
class OmniServerService {
    constructor() {}
}

module.exports = new OmniServerService();
