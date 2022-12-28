<template>
  <div class="single-task" :class="{ 'task-completed': task.completed }">
    <h5>
      <span style="display: none" ref="completedStatusIcons">
        <i
          style="margin-left: -13px"
          class="far"
          :class="{ 'fa-check-circle': task.completed }"
          @click="lineOrNoLine"
        ></i>
        <i
          style="margin-left: -2px; font-size: 16px"
          class="far"
          :class="{ 'fa-circle': !task.completed }"
          @click="lineOrNoLine"
        ></i>
      </span>
      <span ref="taskTitle" style="display: inline">{{ task.name }}</span>
    </h5>
    <div class="task-btns" ref="btns">
      <button type="button" class="edit-btn" @click="editTask">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn" @click="deleteTask">
        <i class="fas fa-trash"></i>
      </button>
    </div>
    <div class="edit-btns task-btns" ref="editBtns">
      <button type="button" @click="acceptEdit">
        <i class="fa fa-check"></i>
      </button>
      <button type="button" @click="cancelEdit">
        <i class="fa fa-xmark"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits:['edited-task'],
  props: ["task"],
  data() {
    return {};
  },
  methods: {
    async deleteTask() {
      await fetch("http://localhost:3000/api/v1/tasks/" + this.task._id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      this.$emit("sent-deleted-id", this.task._id);
    },
    editTask() {
      this.$refs.taskTitle.contentEditable = true;
      this.$refs.taskTitle.focus();
      this.$refs.btns.style.display = "none";
      this.$refs.editBtns.style.display = "inline";
      this.$refs.completedStatusIcons.style.display = "inline";
    },
    acceptEdit() {
      this.task.name = this.$refs.taskTitle.innerText;
      this.$emit('edited-task', this.task)
      this.guiProccess();
    },
    cancelEdit() {
      this.guiProccess();
    },
    guiProccess() {
      this.$refs.taskTitle.contentEditable = false;
      this.$refs.btns.style.display = "inline";
      this.$refs.editBtns.style.display = "none";
      this.$refs.completedStatusIcons.style.display = "none";
    },
    lineOrNoLine() {
      this.$refs.taskTitle.contentEditable = false;
      if (this.$refs.taskTitle.style.textDecoration === "none") {
        this.$refs.taskTitle.style.textDecoration = "line-through";
        this.task.completed = true;
      } else {
        this.$refs.taskTitle.style.textDecoration = "none";
        this.task.completed = false;
      }
      this.$refs.taskTitle.contentEditable = true;
    },
  },
};
</script>

<style scoped>
.edit-btns {
  display: none;
}

.edit-btns button {
  margin-right: 4px;
  background: transparent;
  font-size: 0.75rem;
  border: transparent;
  cursor: pointer;
}
</style>