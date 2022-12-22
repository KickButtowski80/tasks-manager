<template>
  <div>
    {{ tasks }}
  </div>
</template>

<script>
export default {
  data(){
    return{
      tasks: []
    }
  },
  mounted(){
    this.loadTasks()
  },
  methods:{
    async loadTasks (){
      const tasks = await fetch('http://localhost:3000/api/v1/tasks',{
        mode: 'no-cors'
      })
      debugger
       this.tasks = tasks
    }
  }

}
</script>

<style>

</style>