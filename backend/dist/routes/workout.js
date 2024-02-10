"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.workoutRouter = void 0;
const express_1 = __importDefault(require("express"));
const workoutController_1 = require("../controllers/workoutController");
const auth_1 = require("../middlewares/auth");
const workoutRouter = express_1.default.Router();
exports.workoutRouter = workoutRouter;
workoutRouter.use(auth_1.auth);
workoutRouter.get("/", workoutController_1.getWorkouts);
workoutRouter.get("/:id", workoutController_1.getWorkout);
workoutRouter.post("/", workoutController_1.createWorkout);
workoutRouter.put("/:id", workoutController_1.updateWorkout);
workoutRouter.delete("/:id", workoutController_1.deleteWorkout);
