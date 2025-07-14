<script lang="ts" setup>
import { ref } from 'vue';
import { useTaskStore } from '../libs/store/task_store';
import type { Task } from '../libs/types';

const store = useTaskStore();

const newTask = ref('');
const error = ref<string | null>(null);

const handleSubmit = () => {
  if (!newTask.value.trim()) {
    console.warn('Task cannot be empty');
    error.value = 'Task cannot be empty';
    return;
  }
  const task: Task = {
    id: crypto.randomUUID(),
    title: newTask.value,
    completed: false,
  }
  store.addTask(task);
  newTask.value = ''; 
};
</script>

<template>
  <form class="task-form" @submit.prevent="handleSubmit">
    <label for="taskName">New task:</label>
    <input type="text" v-model="newTask" id="taskName" class="task-input" :aria-invalid="!!error || undefined" @input="error = ''" />
    <small v-if="error" id="error" class="error">{{ error }}</small>
    <div class="form-control">
      <button type="submit" class="task-btn">Add Task</button>
    </div>
  </form>
</template>

<style scoped lang="scss">
.task-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 20px;
  margin: 0 auto;
  label {
    font-size: 16px;
    color: #42b983;
    font-weight: bold;
  }
  .error {
    color: red;
    font-size: 12px;
  }
  .task-input {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #ccc;
    font-size: 16px;
    &:focus {
      border-color: #42b983;
      outline: none;
    }
  }
  .form-control {
    display: flex;
    flex-direction: row;
  
  .task-btn {
    margin-left: auto;
    padding: 10px 20px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    &:hover {
      background-color: #36a66f;
    }
  }
}
}
</style>
