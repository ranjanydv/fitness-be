const app = require("express").Router();


app.get("/", (req, res) => {
  res.json({
    message: "Welcome to api service V1."
  });
});

// auth routes
app.use("/auth", require("./auth.routes"));

// user routes
// app.use("/users", require("./user.routes"));

// blog routes
app.use("/blogs", require("./blog.routes"));

// Tips routes
app.use("/tips", require("./injuryPrevention.routes"));

// Ingredient routes
app.use("/ingredients", require("./ingredient.routes"));

// Meal routes
app.use("/meals", require("./meal.routes"));

// Meal Detail routes
app.use("/mealDetails", require("./mealDetail.routes"));

// Workouts routes
app.use("/workouts", require("./workout.routes"));

// order routes
// app.use("/orders", require("./order.routes"));

// cart routes
// app.use("/cart", require("./cart.routes"));


module.exports = app;