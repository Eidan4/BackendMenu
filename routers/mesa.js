const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT, 
        superAdminRole,
        hasARole } = require('../middlewares');

const { createMesa,
        getMesa,
        updateMesa,
        deleteMesa} = require('../controllers/mesa');

const { validExistUserByEmail,
        validExistUserByDocument,
        validExistRole, 
        validExistUserByID} = require('../helpers/validators');

const router = Router();

router.post('/',[
    validateFields
],createMesa);

router.get('/',[
    validateFields
],getMesa);

router.patch('/:id',[
    validateFields
],updateMesa);

router.delete('/:id',[
    validateFields
],deleteMesa)

module.exports = router;
