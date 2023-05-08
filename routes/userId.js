const express = require('express');
const { update } = require('../controllers/products.controller');
const userIdController = require('../controllers/userId.controller');

const router = express.Router();

router.post("/", userIdController.save);
router.get("/:id", userIdController.show);
router.get("/", userIdController.index);
router.patch("/:id", userIdController.update);
router.delete("/:id", userIdController.destroy);

module.exports = router;