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
      <button type="submit" class="btn submit-btn" @click.prevent="addTask">
        submit
      </button>
    </div>
    <div class="form-alert"></div>
  </form>
</template>

<script>
export default {
  emits: ['send-task'],
  data() {
    return {
      taskName: "",
    };
  },
  methods: {
    addTask() {
      const task = {
        name: this.taskName,
        completed: false,
      };
     
      this.$emit("send-task", task);
    },
  },
};
</script>

<style>
</style>