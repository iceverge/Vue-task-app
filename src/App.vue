<script setup lang="ts">

import TaskForm from './components/TaskForm.vue';
import TaskList from './components/TaskList.vue';
import { ref } from 'vue';

const message = ref('Simple Task Manager App using Vue3 with Pinia!');

</script>

<template>
  <div class="wrapper">
    <h1>{{ message }}</h1>
    <TaskForm/>
    <TaskList />
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
  line-height: 40px;
  padding: 0 10px;
}
 input {
  padding: 4px 8px;
  border-radius: 4px;
 }
</style>
