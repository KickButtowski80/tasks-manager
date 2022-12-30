<template>
  <section class="tasks-container">
    <p class="loading-text">Loading...</p>

    <div class="tasks" v-for="task in tasks" :key="task.id">
      <task-item
        :task="task"
        v-on:sent-deleted-id="receivedDelID"
        v-on:edited-task="editedTask"
        v-on:no-edited-task="noEditedTask"
      ></task-item>
    </div>
  </section>
</template>

<script>
import TaskItem from "./TaskItem.vue";

export default {
  components: {
    TaskItem,
  },
  props: ["task"],
  data() {
    return {
      tasks: [],
      fetchTaskId: 0,
    };
  },
  mounted() {
    this.loadTasks();
  },
  watch: {
    task(newVal, oldVal) {
      this.addTask();
    },
  },
  methods: {
    async addTask() {
      const response = await fetch("http://localhost:3000/api/v1/tasks/", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name: this.task.name,
          completed: this.task.completed,
        }),
      });
      const addedTask = await response.json();
      this.fetchTaskId = addedTask.task._id;
      this.tasks.unshift({ _id: this.fetchTaskId, ...this.task });
    },
    async loadTasks() {
      const tasks = await fetch("http://localhost:3000/api/v1/tasks/", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const temp = await tasks.json();
      this.tasks = temp.tasks;
    },
    receivedDelID(deletedId) {
      this.tasks = this.tasks.filter((t) => t._id !== deletedId);
    },
    async editedTask(task) {
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
    },
    noEditedTask(event) {
      console.log("no edited task", event);
    },
  },
};
</script>

<style>
</style>