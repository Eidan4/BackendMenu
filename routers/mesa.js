const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT, 
        superAdminRole,
        hasARole } = require('../middlewares');

const { createMesa,
        getMesa,
        getMesasId,
        updateMesa,
        deleteMesa} = require('../controllers/mesa');

const { validExistUserByEmail,
        validExistUserByDocument,
        validExistRole, 
        validExistUserByID} = require('../helpers/validators');

const router = Router();

router.post('/',[
    validateFields,
    validateJWT, 
],createMesa);

router.get('/',[
    validateFields
],getMesa);

router.get('/:id',[
    validateFields
],getMesasId); 

router.patch('/:id',[
    validateFields,
    validateJWT, 
],updateMesa);

router.delete('/:id',[
    validateFields,
    validateJWT, 
],deleteMesa)

module.exports = router;
