'use strict';

const throwJsonError = require('../../errors/throw-json-error');
const createJsonError = require('../../errors/create-json-error');
const {getOfficeById, deleteOffice} = require('../../repositories/offices_repository');


async function deleteOfficeById(req, res){
    try {
        const {id: companyId} = req.auth;
        const {id} = req.params;

        console.log(typeof(companyId));
        console.log(id);
        

        const hasOffice = await getOfficeById(id, companyId);
        if(!hasOffice){
            throwJsonError('No hay ninguna sucursal con ese id',400);
        }

        if(hasOffice.deletedAt){
            throwJsonError('La sucursal ya ha sido eliminada', 400);
        }

    const deleted=  await deleteOffice(id, companyId);

        res.send({message:'Sucursal eliminada correctamente'}).status(201)
        
    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports ={deleteOfficeById};