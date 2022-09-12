const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields,
        validateJWT, 
        superAdminRole,
        hasARole } = require('../middlewares');

const { createCategory,
        getCategory,
        getCategoryId,
        updateCategory,
        deleteCategory} = require('../controllers/category');

const { validExistUserByEmail,
        validExistUserByDocument,
        validExistRole, 
        validExistUserByID} = require('../helpers/validators');

const router = Router();

router.post('/',[
    validateFields
],createCategory);

router.get('/',[
    validateFields
],getCategory);

router.get('/:id',[
    validateFields
],getCategoryId); 

router.patch('/:id',[
    validateFields
],updateCategory);

router.delete('/:id',[
    validateFields
],deleteCategory);

module.exports = router;
