"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("../config/database");
dotenv_1.default.config();
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let token = req.headers.authorization;
        if (!token)
            return res.status(401).json({ error: "You are not authenticated!" });
        token = token.split(" ")[1];
        const { id } = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = yield database_1.prisma.user.findUnique({
            where: {
                id,
            },
        });
        if (!user) {
            return res.status(401).json({ error: "You are not authenticated!" });
        }
        req.payload = user.id;
        next();
    }
    catch (error) {
        res.status(401).json({ error: "You are not authenticated." });
    }
});
exports.auth = auth;
