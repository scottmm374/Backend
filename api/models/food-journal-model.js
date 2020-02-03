const db = require("../../data/db.config");

async function addFood(food) {
  const [id] = await db("foods").insert(food);
  return db("foods")
    .where({ id })
    .first();
}

function getAllFood() {
  return db("foods").select();
}

function getByChildId(id) {
  return db("foods").where("child_id", id);
}

async function updateFood(food, id) {
  await db("foods")
    .where({ id })
    .update(food);
}

function removeFood(id) {
  return db("foods")
    .where({ id })
    .del();
}

function getCategories() {
  return db("categories");
}

module.exports = {
  addFood,
  getAllFood,
  getByChildId,
  updateFood,
  removeFood,
  getCategories
};