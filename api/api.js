const api = require("express").Router();
const isLoggedIn = require("./middleware/isLoggedIn");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

api.use('/auth', authRoutes);
api.use('/users', userRoutes);
api.use('/events', eventRoutes);
// api.use('/reviews', isLoggedIn, reviewRoutes);

module.exports = api;