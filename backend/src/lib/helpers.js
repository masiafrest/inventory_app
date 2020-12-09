
const checkToken = (req, res, next) => {
    const header = req.header['authorization'];

    if (typeof header !== 'undefined') {
        const bearear = header.split(' ');
        const token = bearear[1];

        req.token = token;
        next();
    } else {
        res.sendStatus(403)
    }

}
module.exports = { checkToken }