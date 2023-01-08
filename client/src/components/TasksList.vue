<template>
  <section class="tasks-container">
    <div class="loader-parent">
      <div :class="{ 'lds-ripple': isLoading }">
        <div></div>
        <div></div>
      </div>
    </div>
    <div class="tasks" v-for="task in tasks" :key="task._id">
      <task-item :task="task" v-on:sent-deleted-task="receivedDelT">
      </task-item>
    </div>
  </section>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  props: ["addedJob"],
  components: {
    TaskItem,
  },
  data() {
    return {
      tasks: [],
      isLoading: false,
      isDeleted: false,
    };
  },
  mounted() {
    this.isLoading = true;
    this.loadTasks();
  },
  watch: {
    addedJob(newTaskVal, oldVal) {
      // when the task props recieved, it can be added to tasks
      this.addTask();
      this.loadTasks();
    },
  },
  methods: {
    addTask() {
      this.tasks.unshift(this.addedJob);
    },
    async loadTasks() {
      const tasks = await fetch("http://localhost:3000/api/v1/tasks/", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const temp = await tasks.json();
      this.tasks = temp.tasks;
      this.isLoading = false;
    },
    receivedDelT(deletedTask) {
      const { _id, name } = deletedTask;
      const id = this.tasks.findIndex((t) => t._id === _id);
      this.tasks.splice(id, 1, { _deleted: true, name: `${name} was deleted` });

      setTimeout(() => {
        this.tasks.splice(id, 1);
      }, 1500);
    },
  },
};
</script>

<style scoped>
.loader-parent {
  -webkit-box-align: center;
  -webkit-box-pack: center;
  display: -webkit-box;
}
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 300px;
  height: 300px;
  -webkit-box-align: center;
  -webkit-box-pack: center;
  display: -webkit-box;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid rgb(50, 75, 149);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 36px;
    left: 36px;
    width: 0;
    height: 0;
    opacity: 0;
  }
  4.9% {
    top: 36px;
    left: 36px;
    width: 100px;
    height: 100px;
    opacity: 0;
  }
  5% {
    top: 36px;
    left: 36px;
    width: 200px;
    height: 200px;
    opacity: 1;
  }
  100% {
    top: 0px;
    left: 0px;
    width: 300px;
    height: 300px;
    opacity: 0;
  }
}
</style>