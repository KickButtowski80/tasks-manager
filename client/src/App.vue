<template>
  <div>
    <task-form></task-form>
    <tasks-list></tasks-list>
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
};
</script>

<style>
</style>