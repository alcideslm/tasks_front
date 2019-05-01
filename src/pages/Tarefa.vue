<template>
  <div >
    <h1><i class="fa fa-check"></i>Lista de tarefas</h1>
    <form id="todo-list">
      <span class="todo-wrap" v-for="(task, i) in tasks" v-bind:key="i">
        <input type="checkbox" :id="task.id" :checked="task.concluido"/>
        <label :for="task.id" class="todo">
          <i class="fa fa-check"></i>
          {{task.titulo}}
        </label>
        <span class="delete-item" title="remove">
          <i class="fa fa-times-circle"></i>
        </span>
      </span>
      
      <span class="todo-wrap">
        <input type="checkbox" id="1" checked/>
        <label for="1" class="todo">
          <i class="fa fa-check"></i>
          Have a good idea
        </label>
        <span class="delete-item" title="remove">
          <i class="fa fa-times-circle"></i>
        </span>
      </span>
    <span class="todo-wrap">
    <input type="checkbox" id="2"/>
    <label for="2" class="todo">
      <i class="fa fa-check"></i>
      Plan idea execution
    </label>
    <span class="delete-item" title="remove">
      <i class="fa fa-times-circle"></i>
    </span>
  </span>
  <span class="todo-wrap">
    <input type="checkbox" id="3"/>
    <label for="3" class="todo">
      <i class="fa fa-check"></i>
      Execute idea
    </label>
    <span class="delete-item" title="remove">
      <i class="fa fa-times-circle"></i>
    </span>
  </span>
	<span class="todo-wrap">
    <input type="checkbox" id="4"/>
    <label for="4" class="todo">
      <i class="fa fa-check"></i>
      Celebrate with a cold one
    </label>
    <span class="delete-item" title="remove">
      <i class="fa fa-times-circle"></i>
    </span>
  </span>
  <div id="add-todo">
    <i class="fa fa-plus"></i>
    Add an Item
  </div>
</form>
  </div>
</template>

<script>
export default {
  data: function data(){
    return {
      tasks: []
    };
  },
  created() {
    this.$http
      .get(`${process.env.VUE_APP_API}/task`)
      .then((reponse) => {
        this.tasks = reponse.data;
      });
  }
}
</script>
