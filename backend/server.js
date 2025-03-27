const app = require("./app");
const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

// Setting up config file
dotenv.config({ path: "backend/config/config.env" });

// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
});


// Unhandled Promise rejection

process.on("unhandledRejection", (err) => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Shutting down the server due to Unhandled Promise rejection`);
  server.close(() => {
    process.exit(1);
  });
});
