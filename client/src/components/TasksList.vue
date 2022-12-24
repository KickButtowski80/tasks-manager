<template>
  <section class="tasks-container">
    <p class="loading-text">Loading...</p>

    <div class="tasks" v-for="task in tasks" :key="task.id">
      <task-item :task="task" v-on:sent-deleted-id="receivedDelID"></task-item>
    </div>
  </section>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  components: {
    TaskItem,
  },
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    this.loadTasks();
  },
  methods: {
    async loadTasks() {
      const tasks = await fetch("http://localhost:3000/api/v1/tasks/", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const temp = await tasks.json();
      this.tasks = temp.tasks;
    },
    receivedDelID(deletedId) {
      this.tasks = this.tasks.filter((t) => t._id !== deletedId);
    },
  },
};
</script>

<style>
</style>