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
    <div class="form-alert">
      {{postValidationMsg}}
    </div>
  </form>
</template>

<script>
export default {
  props: ['postValidationMsg'],
  emits: ["send-task"],
  data() {
    return {
      taskName: "",
      validationMsg: "",
    };
  },
  methods: {
    errorMessage(){
      this.validationMsg = this.postErrorMsg
    },
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

<style scoped>
.form-alert {
  display: block;
}

.form-alert .text-success {
  color: var(--green-dark);
}
</style>