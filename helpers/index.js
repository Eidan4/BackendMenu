const capitalizeStr = require('./capitalizeStr');
const generarJWT = require('./generar-jwt');
const validator = require('./validators');
const subirArchivo = require('./subir-archivos');
const colleccionesPermitidas = require('./colleccionesPermitidas');
module.exports ={
    ...capitalizeStr,
    ...generarJWT,
    ...validator,
    ...subirArchivo,
    ...colleccionesPermitidas
}
