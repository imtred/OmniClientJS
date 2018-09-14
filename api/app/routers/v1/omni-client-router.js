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
 * Check the balance on address
 * @return 200 Check the balance on address success
 * @return 409 Check the balance on address failed
 * @return 422 Validation failed
 */
router.get('/getallbalancesforaddress', (req, res, next) => {
    ctx.checkQuery('address', 'Invalid address - should not be empty').notEmpty();
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
router.get('/sendtether', (req, res, next) => {
    ctx.checkQuery('address1', 'Invalid address1 - should not be empty').notEmpty();
    ctx.checkQuery('address2', 'Invalid address2 - should not be empty').notEmpty();
    ctx.checkQuery('id', 'Invalid id - should not be empty').notEmpty();
    ctx.checkQuery('amount', 'Invalid amount - should not be empty').notEmpty();
    const errors = req.validationErrors();

    if (errors) {
        return next(new ValidationError(errors));
    }

    const params = req.body;

    omniClientService.sendTether(omniClientMapper.sendTetherToRequest(params), (data, err) => {
        if (err) {
            console.log(`[GET] /api/omniclient/getallbalancesforaddress ERROR ==> ${err.errors}`);
            return next(err);
        }
        res.status(200).json(data);
    });
});

module.exports = router;
