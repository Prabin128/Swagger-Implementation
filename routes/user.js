const express = require('express');
const userController = require('../controllers/user.controller');
const router =  express.Router();



/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication and authorization
 */

/**
 * @swagger
 * /user/signup:
 *   post:
 *     summary: Signup a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *               phone:
 *                 type: string
 *                 description: User's phone number
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: User already exists
 */

router.post('/signup', userController.signUp);


/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Login with an existing user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User's email
 *               password:
 *                 type: string
 *                 description: User's password
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *       400:
 *         description: Invalid request body
 *       401:
 *         description: Invalid email or password
 */
router.post('/login', userController.login);

module.exports = router;