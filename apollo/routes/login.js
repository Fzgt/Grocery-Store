const router = require("express").Router();

const {
    authController
} = require('../controllers/controller.js');

router.post('/login', authController.login);


module.exports = router;