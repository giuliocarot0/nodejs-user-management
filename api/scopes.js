module.exports = (app) => {
    app.get('/auth/scopes', (req, res) => {
        //implement middleware check
        if (!req.user) return res.status(401).json({ error: true, message: 'Invalid user to access it.' });
        else return res.status(200).json(JSON.parse(req.user.scopes).scopes);
    });
};