const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT, 
        superAdminRole,
        hasARole } = require('../middlewares');

        const { validExistUserByEmail,
            validExistUserByDocument,
            validExistRole, 
            validExistUserByID} = require('../helpers/validators');

const {CreatePse} = require('../controllers/pse');


const router = Router();

router.post('/',[
    validateFields
],CreatePse)