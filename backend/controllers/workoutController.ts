import { prisma } from "../config/database";
import { Request, Response } from "express";

type RequestExt = Request & { payload?: number };

// Get all workouts
export const getWorkouts = async (req: RequestExt, res: Response) => {
  try {
    const userId = req.payload;
    const workouts = await prisma.workout.findMany({
      where: {
        userId,
      },
    });
    res.status(200).json(workouts);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single workout
export const getWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "ID must be a valid number" });
    }

    const workout = await prisma.workout.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Create a workout
export const createWorkout = async (req: RequestExt, res: Response) => {
  try {
    const { title, reps, load } = req.body;

    if (!title || !reps || !load) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    const userId = req.payload;

    const workout = await prisma.workout.create({
      data: {
        title,
        reps,
        load,
        User: { connect: { id: userId } },
      },
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update a workout
export const updateWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, reps, load } = req.body;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "ID must be a valid number" });
    }

    if (!title || !reps || !load) {
      return res.status(400).json({ error: "Please fill all fields" });
    }
    const workout = await prisma.workout.update({
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
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete a workout
export const deleteWorkout = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      return res.status(400).json({ error: "ID must be a valid number" });
    }

    const workout = await prisma.workout.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(workout);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
