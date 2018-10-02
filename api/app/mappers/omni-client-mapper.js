const _ = require('lodash');

/**
 * OmniServer mapper
 * @class OmniServerMapper
 */
class OmniServerMapper {
    /**
     * Requests
     */
    getBalanceToRequest(params) {
        let propertyId = _.get(params, 'propertyId', '') || '';
        if (propertyId) propertyId = parseInt(propertyId);
        return {
            address: _.get(params, 'address', '') || '',
            propertyId: propertyId
        };
    }

    getAllBalancesForAddressToRequest(params) {
        return {
            address: _.get(params, 'address', '') || ''
        };
    }

    sendTetherToRequest(params) {
        return {
            address1: _.get(params, 'address', '') || '',
            address2: _.get(params, 'address', '') || '',
            id: _.get(params, 'address', '') || '',
            amount: _.get(params, 'address', '') || ''
        };
    }

    /**
     * Responses
     */
    getNewAddressToResponse(address) {
        return address;
    }

    getBalanceToResponse(balance) {
        return balance;
    }

    sendTetherToRequest(data) {
        return data;
    }

    getWalletAddressBalancesToResponse(data) {
        return data;
    }
}

module.exports = new OmniServerMapper();
