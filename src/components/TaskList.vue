<script lang="ts" setup>
import { computed, ref } from 'vue';
import type { Filter, Task } from '../libs/types';
import { useTaskStore } from '../libs/store/task_store';

const taskTtore = useTaskStore();
const tasks = computed<Task[]>(() => taskTtore.all);
const filter = ref<Filter>('all');

const setFilter = (newFilter: Filter) => {
  filter.value = newFilter;
};

const taskDoneCount = computed<Task[]>(() => taskTtore.completed);
const filteredTasks = computed(() => {
  switch (filter.value) {
    case 'todo':
      return taskTtore.todo;
    case 'completed':
      return taskTtore.completed;
    default:
      return taskTtore.all;
  }
})

</script>
<template>
  <div class="task-list">
    <h2 v-if="tasks.length"> {{ taskDoneCount.length }} / {{ tasks.length }} tasks completed</h2>
    <h2 v-else>No tasks available!</h2>
    <div class="task-filter" v-if="tasks.length">
      <button @click="setFilter('all')" :class="{ active: filter === 'all' }">All</button>
      <button @click="setFilter('todo')" :class="{ active: filter === 'todo' }">Todo</button>
      <button @click="setFilter('completed')" :class="{ active: filter === 'completed' }">Completed</button>
    </div>
    <transition-group name="task" tag="ul">
      <li v-for="task in filteredTasks" :key="task.id">
        <span :class="{ 'line-through': task.completed }">{{ task.title }}</span>
        <span class="task-actions">
          <input type="checkbox" @input="taskTtore.updateTask(task.id)" :checked="task.completed" />
          <button @click="taskTtore.removeTask(task.id)">Remove</button>
        </span>
        </li>
    </transition-group>
  </div>
</template>

<style scoped lang="scss">
.task-list {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;

  h2 {
    color: #42b983;
    text-align: center;
  }

  .task-filter {
    display: flex;
    justify-content: right;
    gap: 10px;
    margin-bottom: 20px;
    button {
      padding: 8px 16px;
      background-color: #42b983;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      &:hover {
        background-color: #36a66f;
      }
      &.active {
        background-color: #502dec;
      }
    }
  }

  .task-enter-active, .task-leave-active {
    transition: all 0.4s cubic-bezier(0.55, 0, 0.1, 1);
  }
  .task-enter-from, .task-leave-to {
    opacity: 0;
    transform: translateX(100px) scale(0.95);
  }
  .task-leave-active {
    position: absolute;
  }

  ul {
    list-style-type: none;
    padding: 0;
    li {
      padding: 10px;
      background-color: #42b983;
      margin-bottom: 10px;
      color: white;
      border-radius: 4px;
      font-size: 18px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .line-through {
        text-decoration: line-through;
        color: #ccc;
      }
      input {
        margin-right: 10px;
        transform: scale(1.5);
      }
      &:hover {
        background-color: #36a66f;
      }
      .task-actions {
        display: flex;
        align-items: center;
        gap: 10px;
        button {
          background-color: #ff4d4d;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 10px;
          &:hover {
            background-color: #e60000;
          }
        }
      }
    }
  }
}
</style>