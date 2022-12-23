<template>
  <section class="tasks-container">
    <p class="loading-text">Loading...</p>

    <div class="tasks" v-for="task in tasks" :key="task.id">
      <div class="single-task" :class="{ 'task-completed': task.completed }">
        <h5>
          <span><i class="far fa-check-circle"></i></span>
          {{ task.name }}
        </h5>
        <div class="task-links">
          <router-link to="google.com" class="edit-link">
            <i class="fas fa-edit"></i>
          </router-link>
          <!-- <a href="" class="edit-link">
            <i class="fas fa-edit"></i>
          </a> -->
          <button type="button" class="delete-btn" data-id="${taskID}">
            <i class="fas fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
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
  },
};
</script>

<style>
</style>