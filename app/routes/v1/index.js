const app = require("express").Router();


app.get("/", (req, res) => {
  res.json({
    message: "Welcome to api service V1."
  });
});

// auth routes
// app.use("/auth", require("./auth.routes"));

// user routes
// app.use("/users", require("./user.routes"));

// product routes
// app.use("/products", require("./product.routes"));

// order routes
// app.use("/orders", require("./order.routes"));

// cart routes
// app.use("/cart", require("./cart.routes"));


module.exports = app;