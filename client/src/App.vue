<template>
  <div>
    <task-form v-on:send-task="gotTask"></task-form>
    <tasks-list :task="sendTask"></tasks-list>
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
      sendTask: {},
    };
  },
  methods: {
    gotTask(task) { 
      this.sendTask = task
    },
  },
};
</script>

<style>
</style>