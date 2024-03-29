const bcrypt = require('bcryptjs');
const { response } = require('express');
const { validationResult } = require('express-validator');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');

const crearUsuario = async (req, res = response) => {
    try {
        const { email, password, nombre } = req.body;

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({ ok: false, msg: 'Ya existe el email en base de datos' });
        }

        const usuario = new Usuario(req.body);

        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        const token = await generarJWT(usuario.id);

        res.json({ ok: true, usuario, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Problemas en el servidor',
        });
    }
};

const login = async (req, res = response) => {
    try {
        const { email, password } = req.body;

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(404).json({ ok: false, msg: 'Email no encontrado' });
        }

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(404).json({ ok: false, msg: 'Password incorrecta' });
        }

        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Problemas en el servidor',
        });
    }
};

const renewToken = async (req, res = response) => {
    const uid = req.uid;

    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token,
    });
};

module.exports = {
    crearUsuario,
    login,
    renewToken,
};
