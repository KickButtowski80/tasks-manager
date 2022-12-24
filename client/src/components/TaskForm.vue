<template>
  <form class="task-form">
    <h4>task manager</h4>
    <div class="form-control">
      <input
        type="text"
        name="name"
        class="task-input"
        placeholder="e.g. wash dishes"
        v-model="taskName"
      />
      <button type="submit" class="btn submit-btn" @click.prevent="addTask">submit</button>
    </div>
    <div class="form-alert"></div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      taskName: "",
    };
  },
  methods: {
    async addTask() {
      await fetch("http://localhost:3000/api/v1/tasks/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(this.taskName),
      });
    },
  },
};
</script>

<style>
</style>