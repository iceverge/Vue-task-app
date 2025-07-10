import { defineStore } from "pinia";
import type { Task } from "../../types";

export const useTaskStore = defineStore("task", {
  state: () => ({
    tasks: [] as Task[],
  }),
  getters: {
    all: (state) => state.tasks,
    todo: (state) => state.tasks.filter((task) => !task.completed),
    completed: (state) => state.tasks.filter((task) => task.completed),
  },
  actions: {
    addTask(task: Task) {
      this.tasks.push(task);
    },
    removeTask(id: string) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    updateTask(id: string) {
      const task = this.tasks.find((task) => task.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
});
