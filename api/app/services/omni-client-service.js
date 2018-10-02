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
                    if (err) return cb(null, new OmniCoreError(err));
                    else {
                        address = newAddress;
                        return cb(omniClientMapper.getNewAddressToResponse(address));
                    }
                });
            }
        });
    }

    getBalance(params, cb) {
        Omni.getomnibalance(params.address, params.propertyId, (balance, err) => {
            if (err) return cb(null, new OmniCoreError(err));
            return cb(omniClientMapper.getBalanceToResponse(balance));
        });
    }

    getAllBalancesForAddress(params, cb) {
        Omni.getallbalancesforaddress(params.address, (data, err) => {
            if (err) return cb(null, new OmniCoreError(err));
            return cb(omniClientMapper.getAllBalancesForAddressToResponse(data));
        });
    }

    sendTether(params, cb) {
        Omni.send(params.address1, params.address2, params.id, params.amount, (data, err) => {
            if (err) return cb(null, new OmniCoreError(err));
            return cb(omniClientMapper.getWalletAddressBalancesToResponse(data));
        });
    }
}

module.exports = new OmniServerService();
