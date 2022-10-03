const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT, 
        superAdminRole,
        hasARole } = require('../middlewares');

const { createUser,
        getUser,
        getMeserosId,
        getMeseros,
        updateUser,
        deleteUser} = require('../controllers/user');

const { validExistUserByEmail,
        validExistUserByDocument,
        validExistRole, 
        validExistUserByID} = require('../helpers/validators');

const router = Router();

router.post('/',[
    validateFields,
    validateJWT, 
],createUser);

router.get('/',[
    validateFields,
    validateJWT, 
],getUser);

router.get('/meseros/',[
    validateFields,
    validateJWT, 
],getMeseros);

router.get('/:id',[
    validateJWT, 
    validateFields
],getMeserosId)


router.patch('/:id',[
    validateJWT, 
    validateFields
],updateUser);

router.delete('/:id',[
    validateJWT, 
    validateFields
],deleteUser);

module.exports = router;