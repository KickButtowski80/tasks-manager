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
      <!-- <span
        :class="{
          'text-danger': isError,
          'text-success': !isError,
          'show-off-text': isShowOff
        }"
      >
        <span :class="{ 'text-underline': !isError }">
          {{ taskNameMg }}
        </span>
        {{ restMg }}
      </span> -->

      <span
        :class="{
          'text-danger': isError,
          'text-success': !isError,
          'show-off-text': isShowOff,
        }"
      >
        {{ validationMsg }} -- {{ isError }}
      </span>
    </div>
  </form>
</template>

<script>
export default {
  emits: ["added-task"],
  data() {
    return {
      taskName: "",
      validationMsg: "",
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
          if (Object.keys(addedTask).includes("msg")) {
            this.validationMsg = addedTask.msg.errors.name.message;
            this.isError = true;
            return;
          }
          const addedJob = {
            _id: addedTask.task._id,
            name: this.taskName,
            completed: false,
          }
          this.$emit("added-task", addedJob);
          this.validationMsg = `${this.taskName} was added successfully!`;
          this.isError = false;
          this.taskName = "";
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