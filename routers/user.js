const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT, 
        superAdminRole,
        hasARole } = require('../middlewares');

const { createUser,
        getUser,
        getMeseros,
        updateUser,
        deleteUser} = require('../controllers/user');

const { validExistUserByEmail,
        validExistUserByDocument,
        validExistRole, 
        validExistUserByID} = require('../helpers/validators');

const router = Router();

router.post('/',[
    validateFields
],createUser);

router.get('/',[
    validateFields
],getUser);

router.get('/meseros',[
    validateFields
],getMeseros);

router.patch('/:id',[
    validateFields
],updateUser);

router.delete('/:id',[
    validateFields
],deleteUser);

module.exports = router;