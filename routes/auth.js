import express from 'express';

const Router = express.Router();

Router.post('/login', (req, res) => {
    const {email, password} = req.body;

    if (email == "admin" && password == "admin") {
        req.session.user = {
            email
        }
        return res.status(200).json(req.session.user);
    }

    return res.status(500).json({msg: "Il y a eu une erreur lors de l'authentification !"});
});

Router.get('/me', (req, res) => {
    if (req.session.user) {
        return res.status(200).json(req.session.user);
    }

    return res.status(500).json({msg: "Vous n'est pas connecté !"});
})

Router.get('/logout', (req, res) => {
    if (req.session.user) {
        req.session.destroy();
    }

    return res.status(200).json({msg: "Vous est déconnecté !"});
})

export default Router;