<template>
  <div>
    <task-form v-on:added-task="gotAddedTask"></task-form>
    <tasks-list :addedJob="sendAddedTask"></tasks-list>
  </div>
</template>

<script>
import TaskForm from "./components/TaskForm.vue";
import TasksList from "./components/TasksList.vue";
export default {
  components: {
    TaskForm,
    TasksList,
  },
  data() {
    return {
      sendAddedTask: {},
    };
  },
  methods: {
    gotAddedTask(task) { 
      this.sendAddedTask = task;
    },
  },
};
</script>

<style>
</style>