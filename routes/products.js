/*     //Normally done without using swagger 


const express = require('express');
const productController = require('../controllers/products.controller');
const checkAuthMiddleware = require('../middleware/check-auth');


const router = express.Router();

router.post("/", checkAuthMiddleware.checkAuth, productController.save);
router.get("/:id", productController.show);
router.get("/", productController.index);
router.patch("/:id",checkAuthMiddleware.checkAuth, productController.update);
router.delete("/:id", checkAuthMiddleware.checkAuth, productController.destroy);




module.exports = router;   */


const express = require('express');
const productController = require('../controllers/products.controller');
const checkAuthMiddleware = require('../middleware/check-auth');
const upload = require("../middleware/imageUpload");


const router = express.Router();

/**
 * @swagger
 * tags:
 *     name: Products
 *     description: The Product model managing API endpoint
*/

/**
 * @swagger
 * components:
 *   schemas:
 *      Products:
 *        type: array
 *        items:
 *          required:
 *            - title
 *            - description
 *            - images
 *            - specification 
 *            - ratings
 *            - userId
 *            - rate
 *            - stock
 *          properties:
 *            title:
 *              type: string
 *              description: The title of the Product
 *            description:
 *              type: text
 *              description: description of Product
 *            images:
 *              type: file
 *              description: Image description
 *            specification:
 *              type: string
 *              description: Specification description of the Product
 *            ratings:
 *              type: integer
 *              description: ratings of product
 *            userId:
 *              type: integer
 *              description: the userId
 *            rate:
 *              type: float
 *              description: rate of product
 *            stock:
 *              type: integer
 *              description: stock of product
 */


/**
 * @swagger
 * /product:
 *   post:
 *     summary: Create new Product
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     requestBody:
 *        required: true
 *        content:
 *           multipart/form-data:
 *               schema:
 *                  $ref: '#/components/schemas/Products'
 *     responses:
 *          '200':
 *               description: Succesfully created
 *          '500':
 *               description: Internal Server Error
 */
router.post("/", checkAuthMiddleware.checkAuth,upload.fields([
    { name: "images" },
  ]), productController.createProduct);


/**
 * @swagger
 * /product/{id}:
 *   get:
 *     summary: Get all the Products
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     parameters:
 *       - in: path
 *         name: id 
 *         schema:
 *           type: integer
 *           required: true
 *           description: Id of the Product 
 *     responses:
 *        '200': 
 *           description: List of all Products 
*/
router.get("/:id", productController.show);

/**
 * @swagger
 * /product:
 *   get:
 *     summary: Get all the Products
 *     tags: [Products]
 *     security:
 *       - jwt: []
 *     responses:
 *        '200': 
 *           description: List of all Products 
*/
router.get("/", productController.index);

/**
 * @swagger
 * /product/{id}:
 *   put:
 *      summary: Update the Product by id
 *      tags: [Products]
 *      security:
 *        - jwt: []
 *      parameters: 
 *        - in: path
 *          name: id
 *          schema:
 *             type: integer
 *             required: true
 *             description: the product id 
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Products'
 *      responses:
 *        200:
 *          description: Product details updated succesfully
 *        500: 
 *          description: Some Server Error
 * 
 */
router.put("/:id",checkAuthMiddleware.checkAuth, productController.update);

/**
 * @swagger
 * /product/{id}:
 *   delete:
 *      summary: Update the Product by id
 *      tags: [Products]
 *      security:
 *        - jwt: []
 *      parameters: 
 *        - in: path
 *          name: id
 *          schema:
 *             type: integer
 *             required: true
 *             description: the product id 
 *      responses:
 *        200:
 *          description: Succcesfully deleted
 *        500: 
 *          description: Some Server Error
 * 
 */
router.delete("/:id", checkAuthMiddleware.checkAuth, productController.destroy);




module.exports = router;