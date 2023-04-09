const tokensService = require('../services/tokensService');
const usersService = require('../services/usersService')
const personagesService = require('../services/personagesService')

class usersContoller {

    async getUsers(req, res, next) {
        try {
            const {query, limit, page, sort_asc, sort_desc} = req.query
            const users = await usersService.getUsers(query, limit, page, sort_asc, sort_desc);
            return res.status(200).json(users);
        } 
        catch (e) {
            next(e);
        }
    }

    async getUser(req, res, next) {
        try {
            const id = req.params.id
            const user = await usersService.getUser(id);
            return res.status(200).json(user);
        } 
        catch (e) {
            next(e);
        }
    }

    async getUserPersonages(req, res, next){
        try {
            const id = req.params.id
            const personages = await personagesService.getUserPersonages(id);
            return res.status(200).json(personages);
        } 
        catch (e) {
            next(e);
        }
    }

    async updateUser(req, res, next) {
        try {
            const token = req.cookies.token || req.headers.bearer
            const {id: user_id} = req.user
            const id = req.params.id
            const {email, oldPassword, newPassword} = req.body

            const user = await usersService.updateUser(user_id, token, id, email, oldPassword, newPassword);
            if(id === user_id) {
                res.cookie('token', user.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/'})
            }
            return res.status(200).json(user);
        } 
        catch (e) {
            next(e);
        }
    }

    async deleteUser(req, res, next) {
        try {
            const token = req.cookies.token || req.headers.bearer
            const {id: user_id} = req.user
            const id = req.params.id
            if(id === user_id) {
                res.clearCookie('token');
            }
            const user = await usersService.deleteUser(user_id, token, id);
            return res.status(200).json({message: user ? "Пользователь был успешно удален" : "Пользователь не был удален"});
        } 
        catch (e) {
            next(e);
        }
    }

}
  
module.exports =  new usersContoller()