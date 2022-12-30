<template>
  <div class="single-task" :class="{ 'task-completed': task.completed, 'task-editing': isEditing }">
    <h5>
      <span class="status-icon" ref="completedStatusIcons">
        <i
          style="margin-left: -13px"
          class="far"
          :class="{
            'fa-check-circle': task.completed,
            'fa-circle': !task.completed,
          }"
          @click="task.completed=!task.completed"
        ></i>
      </span>
      <span ref="taskTitle" class="task-title">{{ task.name }}</span>
    </h5>
    <div class="task-btns" ref="btns">
      <button type="button" class="edit-btn" @click="isEditing = true">
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
  props: ["task"],
  data() {
    return {
      isEditing: false,
      originalTask: {...this.task},
    };
  },
  watch: {
    isEditing(val) {
      this.$refs.taskTitle.contentEditable = val;  // this needs to be here so we can focus AFTER setting content editable
      if (val) this.$refs.taskTitle.focus();
    },
  },
  methods: {
    async deleteTask() {
      await fetch(`${import.meta.env.VITE_SERVER_HOST}/api/v1/tasks/` + this.task._id, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      this.$emit("sent-deleted-id", this.task._id);
    },
    acceptEdit() {
      this.task.name = this.$refs.taskTitle.innerText;  // WARNING: editing a prop
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
      this.$refs.taskTitle.innerText = this.originalTask.name;
      this.task.name = this.originalTask.name;
      this.task.completed = this.originalTask.completed;
    },
  },
};
</script>

<style scoped>
.status-icon {
  display: none
}
.task-editing .edit-btns, 
.task-editing .status-icon {
  display: inline;
}
.task-editing .task-btns {
  display: none;
}
.task-title {
  text-decoration: none;
  display: inline;
}
.task-completed .task-title {
  text-decoration: line-through;
}
.check-icon {
  margin-left: -2px; 
  font-size: 16px
}
.task-completed .check-icon {
margin-left: -13px;
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