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
exports.signin = exports.signup = void 0;
const database_1 = require("../config/database");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name, password } = req.body;
    try {
        const existingUser = yield database_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 12);
        const user = yield database_1.prisma.user.create({
            data: {
                email,
                name,
                password: hashedPassword,
            },
        });
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ user, token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.signup = signup;
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield database_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        const matchPassword = yield bcrypt_1.default.compare(password, user.password);
        if (!matchPassword) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            email: user.email,
        }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ user, token });
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong" });
    }
});
exports.signin = signin;
