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
    validateFields
],CreateRol);

router.get('/',[
    validateFields
],getRol);

router.patch('/:id',[
    validateFields
],updateRol);

router.delete('/:id',[
    validateFields
],deleteRol);

module.exports = router;