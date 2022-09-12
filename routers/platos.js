const { Router } = require('express');

const { check } = require('express-validator');

const { validateFields,
        validateJWT, 
        superAdminRole,
        hasARole,
        validarArchivoSubir } = require('../middlewares');

const { createPlato,
        getPlatos,
        getPlatosID,
        getPlatosCategory,
        getImagenes,
        updatePlatosImages,
        updatePlatos,
        deletePlatos} = require('../controllers/platos');


const { validExistUserByEmail,
        validExistUserByDocument,
        validExistRole, 
        validExistUserByID} = require('../helpers/validators');

const {colleccionesPermitidas} = require('../helpers/colleccionesPermitidas')

const router = Router();

router.post('/',[
    validateFields,
    // validarArchivoSubir
],createPlato);

router.get('/',[
    validateFields
],getPlatos);

router.get('/:id',[
    validateFields
],getPlatosID);

router.get('/platoscategory/:name',[
    validateFields 
],getPlatosCategory);

router.get('/:collection/:name',[
    check('id','Id is required of mongo').isMongoId(),
    check('collection').custom(c =>colleccionesPermitidas(c,['user','img'])),
],getImagenes)

router.patch('/:collection/:id',[
    check('id','Id is required of mongo').isMongoId(),
    check('collection').custom(c =>colleccionesPermitidas(c,['user','img'])),
    validateFields,
    // validarArchivoSubir
],updatePlatosImages);

router.patch('/:id',[
    validateFields
],updatePlatos)

router.delete('/:id',[
    validateFields
],deletePlatos);

module.exports = router;
