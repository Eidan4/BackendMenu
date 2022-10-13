const path = require('path')
const {v4} = require('uuid')

const subirArchivo = (files,extensionValidas = ['jpg', 'png', 'gif','PNG'],carpeta ='')=> {
    
    return new Promise((resolve, reject)=>{
        const archivo = files;

        const nombrecortado = archivo.name.split('.');

        const extension = nombrecortado[nombrecortado.length-1];

        try {
            if(!extensionValidas.includes(extension)){
                return reject(`La extension ${extension} no es permitida, estas extenciones son las permitidas ${extensionValidas}`);
            }    
        } catch (error) {
            res.status(404).json({message: error.message})
        }
        
        const nombreTemp = v4() + '.' + 'WebP';
        const uploadPath = path.join(__dirname,'../uploads/' , carpeta, nombreTemp);

        archivo.mv(uploadPath, (err)=> {
            if (err) {
                reject(err);
            }

            resolve(nombreTemp);
        });
    });

    

}

module.exports = {
    subirArchivo
}