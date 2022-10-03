const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields,
        validateJWT, 
        superAdminRole,
        hasARole } = require('../middlewares');

const { createOrden,
        gerOrden,
        getOrdenId,
        updateOrden,
        deleteOrden} = require('../controllers/order');

const { validExistUserByEmail,
        validExistUserByDocument,
        validExistRole, 
        validExistUserByID} = require('../helpers/validators');

const router = Router();

router.post('/',[
    // check('id','Id is required of mongo').isMongoId(),
    validateFields,
],createOrden);

router.get('/',[
    validateJWT,
    validateFields
],gerOrden);

router.get('/:id',[
    validateFields
],getOrdenId);

router.delete('/:id',[
    validateJWT,
    validateFields
],deleteOrden);

router.patch('/:id',[
    validateJWT,
    validateFields
],updateOrden);


module.exports = router;