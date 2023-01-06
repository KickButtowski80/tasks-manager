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
        <input
          ref="taskTitle"
          type="text"
          class="task-title"
          v-model="taskName"
          :disabled="!isEditing"
        />
      </h5>

      <div class="task-btns" ref="btns">
        <button type="button" class="edit-btn" @click="startEditing">
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
    <div
      :class="{
        'task-editing': isEditing,
      }"
    >
      <span
        :class="{
          'task-accepted-edition': isEditAccepted,
          'task-un-accepted-edition': !isEditAccepted,
        }"
        style="font-size: 16px"
      >
        {{ editMsg }}</span
      >
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
      taskName: this.task.name,
      editMsg: "",
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

    async editTask(task) {
      const response = await fetch(
        "http://localhost:3000/api/v1/tasks/" + task._id,
        {
          method: "PATCH",
          body: JSON.stringify(task),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      console.log("patching reponse is", await response.json());
      this.$emit("edited-task", this.task);
    },
    startEditing() {
      this.isEditing = true;
      this.$refs.taskTitle.focus();
    },
    taskNameValidation() {
      if (this.taskName.length === 0) {
        this.isEditAccepted = false;
        this.editMsg = "Cannot Have Empty Name";
        return this.isEditAccepted;
      }
      if (1 < this.taskName.lenght || this.taskName.length < 5) {
        this.isEditAccepted = false;
        this.editMsg = "Cannot Have Name Less than 5 Chars";

        return;
      }
      if (this.taskName.length > 20) {
        this.isEditAccepted = false;
        this.editMsg = "Cannot Have Name More than 20 Chars";
        return this.isEditAccepted;
      }
      return !this.isEditAccepted;
    },
    acceptEdit() {
      const validationStatus = this.taskNameValidation();
      if (validationStatus) {
        const currentTask = {
          _id: this.task._id,
          name: this.taskName,
          completed: this.task.completed,
        };
        this.editTask(currentTask);
        this.isEditAccepted = true;
        this.editMsg = `${this.taskName} Was Edited Successfuly`;
        setTimeout(() => {
          this.isEditAccepted = false;
          this.isEditing = false;
          this.editMsg = "";
        }, 1500);
      }
    },
    cancelEdit() {
      this.taskName = this.originalTask.name;
      this.task.completed = this.originalTask.completed;
      this.isEditAccepted = false;
      this.editMsg = "editing was canceled";
      setTimeout(() => {
        this.isEditAccepted = false;
        this.isEditing = false;
        this.editMsg = "";
      }, 1500);
    },
  },
};
</script>

<style scoped>
input[type="text"] {
  width: 85%;
  margin-left: 5px;
  border: none;
  background: none;
  color: inherit;
  font-size: 22px;
}

input[type="text"]:focus {
  /* outline: none; */
  outline: thin dotted; 
}

.task-edit-message1 {
  display: none;
}
.task-accepted-edition {
  color: rgb(9, 166, 58);
  display: inline-block;
}

.task-un-accepted-edition {
  color: rgb(167, 83, 101);
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