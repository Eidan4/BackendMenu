const colleccionesPermitidas = (collection='',collectiones=[]) => {
    const includa = collection.includes(collection);
    if(!includa){
        throw new Error(`La collection ${collection} no es permitida ${collectiones}`);
    }

    return true;
}

module.exports = {
    colleccionesPermitidas
}