<template>
  <div class="single-task" :class="{ 'task-completed': task.completed }">
    <h5>
      <span><i class="far fa-check-circle"></i></span>
      {{ task.name }}
    </h5>
    <div class="task-links">
      <!-- <router-link to="google.com" class="edit-link">
        <i class="fas fa-edit"></i>
      </router-link> -->
      <a href="" class="edit-link">
        <i class="fas fa-edit"></i>
      </a>
      <button type="button" class="delete-btn" @click="deleteTask()">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["task"],
  data() {
    return {};
  },
  methods: {
    async deleteTask() {
      console.dir(this.task);
      await fetch("http://localhost:3000/api/v1/tasks/" + this.task._id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      this.$emit('sent-deleted-id', this.task._id)
    },
  },
};
</script>

<style>
</style>