<template>
  <div
    class="single-task"
    :class="{
      'task-completed': task.completed,
      'task-editing': isEditing,
    }"
  >
    <h5>
      <span class="icon-status" ref="completedStatusIcons">
        <i
          style="margin-left: -13px"
          class="far"
          :class="{
            'fa-check-circle': task.completed,
            'fa-circle': !task.completed,
          }"
          @click="task.completed = !task.completed"
        ></i>
      </span>
      <span ref="taskTitle" class="task-title">{{ task.name }}</span>
    </h5>
    <div class="task-btns" ref="btns">
      <button type="button" class="edit-btn" @click="editTask">
        <i class="fas fa-edit"></i>
      </button>
      <button type="button" class="delete-btn" @click="deleteTask">
        <i class="fas fa-trash"></i>
      </button>
    </div>
    <div class="edit-btns" ref="editBtns">
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
  emits: ["no-edited-task","edited-task","sent-deleted-id"],
  props: ["task"],
  data() {
    return {
      originalTask: { ...this.task },
      isEditing: false,
    };
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
      // // this.$refs.completedStatusIcons.focus();
      // this.$refs.taskTitle.focus();
      this.isEditing = true;
    },
    acceptEdit() {
      this.task.name = this.$refs.taskTitle.innerText;
      this.$emit("edited-task", this.task);

      this.isEditing = false;
      this.$refs.taskTitle.contentEditable = true;
    },
    cancelEdit() {
      this.$refs.taskTitle.innerText = this.originalTask.name;
      this.task.completed = this.originalTask.completed;
      // this.task.name = this.originalTask.name
      this.$emit("no-edited-task", this.originalTask);

      this.$refs.taskTitle.contentEditable = true;
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
.task-editing {
  display: flex;
}

.task-btns {
  display: flex;
  align-items: center;
  gap: 0 0.5rem;
}

.icon-status {
  display: none;
}
.task-editing .icon-status {
  display: inline;
}
.task-editing .task-btns {
  display: none;
}
.task-editing .edit-btns {
  display: inline;
}

.task-title {
  display: inline;
}

.task-editing:focus {
  background: rgb(200, 52, 52);
}

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