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
        <span :class="{ 'text-underline': !isError }">
          {{ taskNameMg }}
        </span>
        {{ validationMsg }}
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
  // watch: {
  //   postValidationMsg(n, o) {
  //     const { msg, taskName, status } = n;
  //     debugger;
  //     this.restMg = msg.split(this.taskNameMg)[1];
  //     this.isError = status === "error" ? true : false;
  //     this.isShowOff = true;
  //     setTimeout(() => {
  //       this.taskNameMg = "";
  //       this.restMg = "";
  //       this.isShowOff = false;
  //     }, 3000);

  //   },
  // },
  methods: {
    async addTask() {
      try {
        const response = await fetch("http://localhost:3000/api/v1/tasks/", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: this.taskName,
            completed: false,
          }),
        });
        const addedTask = await response.json();
        if (addedTask) {
          this.taskNameMg = this.taskName;
          if (Object.keys(addedTask).includes("msg")) {
            this.validationMsg = addedTask.msg.errors.name.message;
            this.isError = true;
            this.isShowOff = true;
            setTimeout(() => {
              this.taskNameMg = "";
              this.validationMsg = "";
              this.isShowOff = false;
              this.isError = false;
            }, 3000);
            return;
          }

          this.$emit("send-task", addedTask.task);
          // TODO: add case where you show success
          this.validationMsg = "was added successfully!";
          this.isShowOff = true;
          setTimeout(() => {
              this.taskNameMg = "";
              this.validationMsg = "";
              this.isShowOff = false;
              this.isError = false;
            }, 3000);
        }
      } catch (error) {
        console.log("post task error is ", error);
      }
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

.show-off-text .text-underline {
  text-decoration: underline;
  outline: 6px solid #645cff;
  border-radius: 1rem;
  background: rgb(223, 223, 234);
  padding: 5px;
  margin-right: 7px;
}
</style>