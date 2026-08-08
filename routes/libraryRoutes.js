const express = require("express");
const router = express.Router();
const { addBook, getBooks } = require("../controllers/libraryController");
const auth = require("../middleware/auth");
const roleCheck = require("../middleware/role");

router.use(auth);

router.get("/", getBooks);
router.post("/", roleCheck("administrator", "librarian"), addBook);

module.exports = router;
