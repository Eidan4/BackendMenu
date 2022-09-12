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
    validateFields
],createOrden);

router.get('/',[
    validateFields
],gerOrden);

router.get('/',[
    validateFields
],gerOrden);

router.get('/:id',[
    validateFields
],getOrdenId);

router.patch('/:id',[
    validateFields
],updateOrden);

router.delete('/:id',[
    validateFields
],deleteOrden);

module.exports = router;