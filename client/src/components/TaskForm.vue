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
          'show-off-text': isShowOff,
        }"
      >
        <span :class="{ 'text-underline': !isError }">
          {{ taskNameMsg }}
        </span>
        {{ validationMsg }}
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
      taskNameMsg: "",
    };
  },
  watch: {
    validationMsg1(n, o) {
      if (this.isError) {
        this.validationMsg = n;
      } else if (!this.isError) {
        this.isShowOff = true;
      }
      setTimeout(() => {
        this.taskNameMsg = "";
        this.validationMsg = "";
        this.isError = true;
        this.isShowOff = false;
      }, 2500);
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
            this.validationMsg = addedTask.msg;
            this.isError = true;
            this.resetForm();
            return;
          }
          const addedJob = {
            _id: addedTask.task._id,
            name: this.taskName,
            completed: false,
          }; 
          this.$emit("added-task", addedJob);
          this.isShowOff = true;
          this.isError = false;
          this.taskNameMsg = this.taskName;
          this.validationMsg = `was added successfully!`;
          this.resetForm();
        }
      } catch (error) {
        console.log("post task error is ", error);
      }
    },
    resetForm() {
      setTimeout(() => {
        this.taskName = "";
        this.taskNameMsg = "";
        this.validationMsg = "";
        this.isError = true;
        this.isShowOff = false;
      }, 2500);
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