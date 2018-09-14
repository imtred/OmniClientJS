const _ = require('lodash');

/**
 * OmniServer mapper
 * @class OmniServerMapper
 */
class OmniServerMapper {
    /**
     * Requests
     */
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
        return { address: address };
    }

    getAllBalancesForAddressToResponse(ids) {
        return { ids: ids };
    }

    sendTetherToRequest(data) {
        return {
            data: data
        };
    }
}

module.exports = new OmniServerMapper();
