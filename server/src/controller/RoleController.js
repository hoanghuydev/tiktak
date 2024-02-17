import {
    alreadyExistRow,
    badRequest,
    internalServerError,
} from '../utils/handleResp';
import * as roleServices from '../services/role';
class RoleController {
    async insertRole(req, res) {
        try {
            const { code, value } = req.body;
            const resp = await roleServices.insertRole(code, value);
            if (resp[1])
                return res.status(201).json({
                    err: 0,
                    mes: 'Added role',
                });
            else return alreadyExistRow('Role already exists', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
    async removeRole(req, res) {
        try {
            const { id, code } = req.body;
            let resp = null;
            if (id) resp = await roleServices.removeRole({ id });
            if (code) resp = await roleServices.removeRole({ code });
            if (resp)
                return res.status(200).json({
                    err: 0,
                    mes: 'Removed role',
                });
            else return badRequest('Not found role', res);
        } catch (error) {
            console.log(error);
            return internalServerError(res);
        }
    }
}
export default new RoleController();
