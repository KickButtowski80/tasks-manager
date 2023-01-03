<template>
  <div>
    <task-form v-on:send-task="gotTask" 
    :postValidationMsg="postVM"
    ></task-form>
    <tasks-list 
    :task="sendTask"
    v-on:post-validation-msg="postValiMsg"
    ></tasks-list>
  </div>
</template>

<script>
import TaskForm from "./components/TaskForm.vue";
import TasksList from "./components/TasksList.vue";
export default {
  components: {
    TaskForm,
    TasksList,
  },
  data() {
    return {
      postVM:'',
      sendTask: {},
    };
  },
  methods: {
    gotTask(task) { 
      this.sendTask = task
    },
    postValiMsg(VMsg){     
      this.postVM = VMsg;
    },
  },
};
</script>

<style>
</style>