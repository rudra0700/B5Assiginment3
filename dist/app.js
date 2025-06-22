"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const books_controller_1 = require("./app/controller/books.controller");
const borrow_controllers_1 = require("./app/controller/borrow.controllers");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use("/api/books", books_controller_1.booksRoutes);
exports.app.use("/api/borrow", borrow_controllers_1.borrowRoutes);
exports.app.get("/", (req, res) => {
    res.send({
        message: "Library management system",
    });
});
