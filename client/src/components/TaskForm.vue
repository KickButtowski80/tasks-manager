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
      <span
        :class="{
          'text-danger': isError,
          'text-success': !isError,
        }"
      >
        {{ pvmg }}
      </span>
    </div>
  </form>
</template>

<script>
export default {
  props: ["postValidationMsg"],
  emits: ["send-task"],
  data() {
    return {
      taskName: "",
      validationMsg: "",
      pvmg: this.postValidationMsg,
      isError: false,
    };
  },
  watch: {
    postValidationMsg(n, o) {
      const { msg, status} = n
      this.pvmg = msg;
      this.isError = status === 'error' ? true : false
      setTimeout(() => {
        this.pvmg = "";
      }, 3000);
    },
  },
  methods: {
    addTask() {
      const task = {
        name: this.taskName,
        completed: false,
      };
      this.taskName = '';
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