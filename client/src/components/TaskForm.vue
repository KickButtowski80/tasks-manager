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
          'show-off-text': isShowOff
        }"
      >
        <span :class="{ 'text-underLine': !isError }">
          {{ taskNameMg }}
        </span>
        {{ restMg }}
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
      isShowOff: false,
      taskNameMg: "",
      restMg: "",
    };
  },
  watch: {
    postValidationMsg(n, o) {
      const { msg, status } = n;
      this.taskNameMg = msg.match(/^.*(?=(\ was)) /g)[0];
      this.restMg = msg.split(this.taskNameMg)[1];
      this.isError = status === "error" ? true : false;
      this.isShowOff = true;
      setTimeout(() => {
        this.taskNameMg = "";
        this.restMg = "";
        this.isShowOff = false;
      }, 3000);
    
    },
  },
  methods: {
    addTask() {
      const task = {
        name: this.taskName,
        completed: false,
      };
      this.taskName = "";
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

.show-off-text .text-underLine {
  text-decoration: underline;
  outline: 6px solid #645cff;
  border-radius: 1rem;
  background: rgb(223, 223, 234);
  padding: 5px;
  margin-right: 7px;
}
</style>