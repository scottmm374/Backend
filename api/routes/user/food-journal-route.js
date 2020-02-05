const express = require("express");
const foodMod = require("../../models/food-journal-model.js");
const router = express.Router();
const restricted = require("../../middleware/auth-user-middleware");

// * Works Get all food
router.get("/", async (req, res, next) => {
  try {
    const food = await foodMod.getAllFood();
    res.status(200).json(food);
  } catch (err) {
    console.log(err);
    next();
  }
});

// * Works get all categories
router.get("/categories", async (req, res, next) => {
  try {
    const categories = await foodMod.getCategories();
    res.status(200).json(categories);
  } catch (err) {
    console.log(err);
    next();
  }
});

// * Works Add food
router.post("/addFood", async (req, res, next) => {
  try {
    const { food_name, qty, date, children_id, category_id } = req.body;
    const newFood = await foodMod.addFood(req.body);
    res.status(201).json({
      message: `${food_name} added!`,
      newFood
    });
  } catch (err) {
    next(err);
  }
});

// * Works Update Food
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const edit = await foodMod.updateFood(id, req.body);
    res.status(201).json({
      message: "Food record Updated"
    });
  } catch (err) {
    console.log("edit food", err);
    next(err);
  }
});

// * Works Delete food
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const removeFood = await foodMod.removeFood(id);
    res.status(201).json({
      message: "Food record removed"
    });
  } catch (err) {
    console.log("remove food", err);
    next(err);
  }
});

router.get("/month", async (req, res, next) => {
  try {
    const dateRange = await foodMod.getCatByDate();
    res.status(200).json(dateRange);
    console.log("dateRange", dateRange);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
