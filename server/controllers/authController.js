const authService = require('../services/authService');

class authContoller {
    
    async registration(req, res, next) {
        try {
            const {email, password} = req.body
            const user = await authService.registration(email, password);
            res.cookie('token', user.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.status(200).json(user);
        } 
        catch (e) {
            next(e);
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await authService.login(email, password);
            res.cookie('token', userData.token, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true, path: '/'})
            return res.status(200).json(userData);
        } 
        catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const token = req.cookies.token || req.headers.bearer;
            const _token = await authService.logout(token);
            res.clearCookie('token', { secure: true, httpOnly: true });
            return res.status(200).json(_token);
        } 
        catch (e) {
            next(e);
        }
    }

    async getUser(req, res, next){
        try {
          const {id} = req.user
          const user = await authService.getUser(id)
          res.json(user)
        }
        catch(e) {
          next(e);
        }
      }
    
}
  
module.exports =  new authContoller()