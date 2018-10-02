const express = require('express');
const omniClientService = require('../../services/omni-client-service');
const omniClientMapper = require('../../mappers/omni-client-mapper');
const ValidationError = require('../../errors/validation-error');

const router = express.Router();

/**
 * Generates the new Tether address
 * @return 200 Generate the new Tether address success
 * @return 409 Generate the new Tether address failed
 * @return 422 Validation failed
 */
router.get('/getnewaddress', (req, res, next) => {
    const errors = req.validationErrors();

    if (errors) {
        return next(new ValidationError(errors));
    }

    omniClientService.getNewAddress((address, err) => {
        if (err) {
            console.log(`[GET] /api/omniclient/getnewaddress ERROR ==> ${err.errors}`);
            return next(err);
        }
        res.status(200).json(address);
    });
});

/**
 * Get the balance for address
 * @return 200 Get the balance for address success
 * @return 409 Get the balance for address failed
 * @return 422 Validation failed
 */
router.get('/getbalance', (req, res, next) => {
    req.checkQuery('address', 'Invalid address - should not be empty').notEmpty();
    req.checkQuery('propertyId', 'Invalid address - should not be empty').notEmpty();

    const errors = req.validationErrors();

    if (errors) {
        return next(new ValidationError(errors));
    }

    const params = req.query;

    omniClientService.getBalance(omniClientMapper.getBalanceToRequest(params), (ids, err) => {
        if (err) {
            console.log(`[GET] /api/omniclient/getbalance ERROR ==> ${err.errors}`);
            return next(err);
        }
        res.status(200).json(ids);
    });
});

/**
 * Get all balances for address
 * @return 200 Get all balances for address success
 * @return 409 Get all balances for address failed
 * @return 422 Validation failed
 */
router.get('/getallbalancesforaddress', (req, res, next) => {
    req.checkQuery('address', 'Invalid address - should not be empty').notEmpty();
    const errors = req.validationErrors();

    if (errors) {
        return next(new ValidationError(errors));
    }

    const params = req.query;

    omniClientService.getAllBalancesForAddress(
        omniClientMapper.getAllBalancesForAddressToRequest(params),
        (ids, err) => {
            if (err) {
                console.log(
                    `[GET] /api/omniclient/getallbalancesforaddress ERROR ==> ${err.errors}`
                );
                return next(err);
            }
            res.status(200).json(ids);
        }
    );
});

/**
 * Send Tether
 * @return 200 Send Tether success
 * @return 409 Send Tether failed
 * @return 422 Validation failed
 */
router.post('/sendtether', (req, res, next) => {
    req.checkBody('address1', 'Invalid address1 - should not be empty').notEmpty();
    req.checkBody('address2', 'Invalid address2 - should not be empty').notEmpty();
    req.checkBody('id', 'Invalid id - should not be empty').notEmpty();
    req.checkBody('amount', 'Invalid amount - should not be empty').notEmpty();
    req.checkBody('id', 'Invalid id - shouldn not be symbolic').isNumeric();
    req.checkBody('amount', 'Invalid amount - shouldn be symbolic').isString();
    const errors = req.validationErrors();

    if (errors) {
        return next(new ValidationError(errors));
    }

    const params = req.body;

    omniClientService.sendTether(omniClientMapper.sendTetherToRequest(params), (data, err) => {
        if (err) {
            console.log(`[POST] /api/omniclient/sendtether ERROR ==> ${err.errors}`);
            return next(err);
        }
        res.status(200).json(data);
    });
});

module.exports = router;
