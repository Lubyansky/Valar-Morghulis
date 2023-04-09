const ApiError = require('../exceptions/apiError');
const tokensService = require('../services/tokensService');

module.exports = async function (req, res, next) {
    try {
        const token = req.cookies.token || req.headers.bearer
        if (!token) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokensService.validateToken(token);
        const tokenFromDb = await tokensService.findToken(token);
        if (!userData || !tokenFromDb) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;
        next();
    } 
    catch (e) {
        return next(ApiError.UnauthorizedError());
    }
};

