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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkout = exports.updateWorkout = exports.createWorkout = exports.getWorkout = exports.getWorkouts = void 0;
const database_1 = require("../config/database");
// Get all workouts
const getWorkouts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.payload;
        const workouts = yield database_1.prisma.workout.findMany({
            where: {
                userId,
            },
        });
        res.status(200).json(workouts);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getWorkouts = getWorkouts;
// Get a single workout
const getWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: "ID must be a valid number" });
        }
        const workout = yield database_1.prisma.workout.findUnique({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json(workout);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.getWorkout = getWorkout;
// Create a workout
const createWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, reps, load } = req.body;
        if (!title || !reps || !load) {
            return res.status(400).json({ error: "Please fill all fields" });
        }
        const userId = req.payload;
        const workout = yield database_1.prisma.workout.create({
            data: {
                title,
                reps,
                load,
                User: { connect: { id: userId } },
            },
        });
        res.status(200).json(workout);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.createWorkout = createWorkout;
// Update a workout
const updateWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, reps, load } = req.body;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: "ID must be a valid number" });
        }
        if (!title || !reps || !load) {
            return res.status(400).json({ error: "Please fill all fields" });
        }
        const workout = yield database_1.prisma.workout.update({
            where: {
                id: Number(id),
            },
            data: {
                title,
                reps,
                load,
            },
        });
        res.status(200).json(workout);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateWorkout = updateWorkout;
// Delete a workout
const deleteWorkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ error: "ID must be a valid number" });
        }
        const workout = yield database_1.prisma.workout.delete({
            where: {
                id: Number(id),
            },
        });
        res.status(200).json(workout);
    }
    catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteWorkout = deleteWorkout;
