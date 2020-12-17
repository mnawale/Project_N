const express = require('express');

const { body } = require('express-validator');

const budgetsController = require('../controllers/budgets');

const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', auth, budgetsController.fetchAll);
//router.get('/id',auth,budgetsController.fetchBudget);

router.post(
  '/',
  [
    auth,
    body('userId').trim().not().isEmpty(),
    body('title').trim().isLength({ min: 5 }).not().isEmpty(),
    body('value').trim().isLength({ min: 2 }).not().isEmpty(),
    body('month').trim().isLength({ min: 2 }).not().isEmpty(),
    body('tags').trim().isLength({ min: 2 }).not().isEmpty(),
  ],
  budgetsController.budget
);

router.delete('/:id', auth, budgetsController.deleteBudget);

module.exports = router;
