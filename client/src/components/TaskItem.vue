<template>
  <div>
    <div
      class="single-task"
      :class="{
        'task-completed': task.completed,
        'task-editing': isEditing,
        'task-deleting': isDeleting,
      }"
    >
      <h5 class="focusTask">
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
      <span
          class="task-edit-message"
          :class="{ ' task-accepted-edition': isEditAccepted }"
          style="font-size: 16px"
        >
          edited</span>
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
  </div>
</template>

<script>
export default {
  emits: ["no-edited-task", "edited-task", "sent-deleted-task"],
  props: ["task"],

  data() {
    return {
      originalTask: { ...this.task },
      isEditing: false,
      isDeleting: false,
      isEditAccepted: false,
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
      this.isDeleting = true;
      this.$emit("sent-deleted-task", this.task);
      setTimeout(() => {
        this.isDeleting = false;
      }, 2000);
    },
    editTask() {
      this.isEditing = true;
      this.$refs.taskTitle.contentEditable = true;
      this.$refs.taskTitle.focus();
    },
    acceptEdit() {
      this.task.name = this.$refs.taskTitle.innerText;
      this.$emit("edited-task", this.task);
     
      this.isEditAccepted = true;
      
      setTimeout(() => {
        this.isEditAccepted = false;
        this.isEditing = false;
        this.$refs.taskTitle.contentEditable = false;
      },1500);
    },
    cancelEdit() {
      this.$refs.taskTitle.innerText = this.originalTask.name;
      this.task.completed = this.originalTask.completed;
      this.task.name = this.originalTask.name;
      this.$emit("no-edited-task", this.originalTask);

      this.$refs.taskTitle.contentEditable = false;
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
.task-edit-message{
  display: none;
}
.task-accepted-edition {
  color: red; 
  display: inline-block;
}

[contenteditable] {
  outline: 0px solid transparent;
}
.task-editing {
  display: flex;
}
.task-editing .focusTask {
  outline: 6px solid #645cff;
  border-radius: 1rem;
  background: rgb(223, 223, 234);
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
.task-editing .task-btns,
.task-deleting .task-btns {
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