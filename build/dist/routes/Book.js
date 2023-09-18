"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Book_1 = __importDefault(require("../controllers/Book"));
const ValidateSchema_1 = require("../middleware/ValidateSchema");
const router = express_1.default.Router();
router.post("/create", (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.book.create), Book_1.default.createBook);
router.get("/get/:bookId", Book_1.default.readBook);
router.get("/get/", Book_1.default.readAll);
router.patch("/update/:bookId", (0, ValidateSchema_1.ValidateSchema)(ValidateSchema_1.Schemas.book.update), Book_1.default.updateBook);
router.delete("/delete/:bookId", Book_1.default.deleteBook);
exports.default = router;
//# sourceMappingURL=Book.js.map