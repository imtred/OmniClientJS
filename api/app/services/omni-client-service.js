const OmniCoreError = require('../errors/omnicore-error');
const omniClientMapper = require('../mappers/omni-client-mapper');
const Omni = require('./../../../lib/OmniRPC.js').Omni;

/**
 * OmniServer service
 * @class OmniServerService
 */
class OmniServerService {
    constructor() {}

    getNewAddress(cb) {
        let account = null;
        let address = null;

        Omni.listaccounts((accounts, err) => {
            if (err) {
                return cb(null, new OmniCoreError(err));
            } else {
                account = accounts[0];
                Omni.getnewaddress(account, (newAddress, err) => {
                    if (err) return new cb(null, new OmniCoreError(err));
                    else {
                        address = newAddress;
                        return cb(omniClientMapper.getNewAddressToResponse(address));
                    }
                });
            }
        });
    }

    async getAllBalancesForAddress(params, cb) {
        let balances = null;
        let ids = [];

        Omni.getallbalancesforaddress(params.address, (data, err) => {
            if (err) return new cb(null, new OmniCoreError(err));
            balances = data;
            for (let i = 2; i < data.length; i++) {
                ids.push(balances[i]['propertyid']);
            }
            return cb(omniClientMapper.getAllBalancesForAddressToResponse(ids));
        });
    }

    async sendTether(params, cb) {
        Omni.send(params.address1, params.address2, params.id, params.amount, (data, err) => {
            if (err) return new cb(null, new OmniCoreError(err));
            return cb(omniClientMapper.getAllBalancesForAddressToResponse(data));
        });
    }
}

module.exports = new OmniServerService();
