const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT, 
        superAdminRole,
        hasARole } = require('../middlewares');

const { CreateRol,
        getRol,
        updateRol,
        deleteRol} = require('../controllers/role');

const { validExistUserByEmail,
        validExistUserByDocument,
        validExistRole, 
        validExistUserByID} = require('../helpers/validators');


const router = Router();

router.post('/',[
    validateJWT, 
    validateFields
],CreateRol);

router.get('/',[
    validateFields
],getRol);

router.patch('/:id',[
    validateJWT, 
    validateFields
],updateRol);

router.delete('/:id',[
    validateJWT, 
    validateFields
],deleteRol);

module.exports = router;