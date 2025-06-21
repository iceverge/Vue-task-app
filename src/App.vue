<script setup lang="ts">
import TaskForm from './components/TaskForm.vue';
import type { Task } from './types';
import TaskList from './components/TaskList.vue';
import { ref } from 'vue';
const message = ref('Simple Task Manager App using Vue3!');

const tasks = ref<Task[]>([]);

function addTask(newTask: string) {
  tasks.value.push({
    id: crypto.randomUUID(),
    title: newTask,
    completed: false,
  });
  console.log('New Task Added:', newTask);
}

  function updateTask(id: string) {
    const task = tasks.value.find(task => task.id === id);
    if (task) {
      task.completed = !task.completed;
      console.log('Task Updated:', task);
    }
  }

  function removeTask(id: string) {
    tasks.value = tasks.value.filter(task => task.id !== id);
    console.log('Task Removed:', id);
  }


</script>

<template>
  <div class="wrapper">
    <h1>{{ message }}</h1>
    <TaskForm @addTask="addTask"/>
    <TaskList :tasks @updateTask="updateTask" @removeTask="removeTask" />
  </div>
</template>

<style scoped>
.wrapper {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}
h1 {
  color: #42b983;
  text-align: center;
  font-size: x-large;
}
 input {
  padding: 4px 8px;
  border-radius: 4px;
 }
</style>
