const { validationResult } = require('express-validator');

const Budget = require('../models/budget');

exports.fetchAll = async (req, res, next) => {
  try {
    const [allBudgets] = await Budget.fetchAll();
    res.status(200).json(allBudgets);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
exports.fetchBudget = async (req, res, next) => {
  const userId = req.params.id;
  console.log(userId)
  try {
    userId: userId;
      
  const [userBudgets] = await Budget.fetchBudget(userId);
    res.status(200).json(userBudgets);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.budget= async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return;
  const userId = req.body.userId;
  const title = req.body.title;
  const value = req.body.value;
  const month =req.body.month;
  const tags = req.body.tags;


  try {
    const budget = {
      userId: userId,
      title: title,
      value: value,
      month:month,
      tags:tags,
      
    };
    const result = await Budget.save(budget);
    res.status(201).json({ message: 'Posted!' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteBudget = async (req, res, next) => {
  try {
    const deleteResponse = await Budget.delete(req.params.id);
    res.status(200).json(deleteResponse);
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
