const express = require('express');
const omniClientService = require('../../services/omni-client-service');
//const subscriberMapper = require('../../mappers/subscriber-mapper');
const ValidationError = require('../../errors/validation-error');

const router = express.Router();

/**
 * Description
 * @return 200
 * @return 500
 * @return 422 Validation failed
 */
router.post('/getnewaddress', async (req, res, next) => {
    const errors = req.validationErrors();

    if (errors) {
        return next(new ValidationError(errors));
    }
    const params = req.body;

    try {
        const isChecked = await subscriberService.isNewOrUpdatedService(
            subscriberMapper.isNewOrUpdatedToRequest(params)
        );

        res.status(200).json(isChecked);
    } catch (err) {
        console.log(`[GET] /api/user/info ERROR ==> ${err}`);
        return next(err);
    }
});

module.exports = router;
