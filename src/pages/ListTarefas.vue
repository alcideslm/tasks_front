<template>
  <div >
    <h1><i class="fa fa-check"></i>Lista de tarefas - {{usuario.nome}}</h1>
    <form id="todo-list">
      <span class="todo-wrap" v-for="(task, i) in tasks" v-bind:key="i">
        <input type="checkbox" :id="task.id" :checked="task.concluido"/>
        <label :for="task.id" class="todo">
          <i class="fa fa-check"></i>
          {{task.titulo}}
        </label>
        <span class="edit-item" title="Alterar">
          <i class="fa fa-edit"></i>
        </span>
      </span>
      <div v-if="!achouTarefas">Nenhum item encontrado</div>

      <div id="add-todo">
        <i class="fa fa-plus"></i>
        Nova Tarefa
      </div>
        <router-link to="/">
          <div id="back">
            <i class="fa fa-arrow-left"></i>
            Voltar
          </div>
        </router-link>
    </form>
  </div>
</template>

<script>
export default {
  data: function data(){
    return {
      tasks: [],
      userId: 0,
      usuario: {
        nome: ''
      },
      achouTarefas : false
    };
  },
  methods: {
    loadTasks(){
      this.$http
      .get(`${process.env.VUE_APP_API}/task/byUser/${this.$route.params.id}`)
      .then((reponse) => {
        this.tasks = reponse.data;
        this.achouTarefas =  this.tasks.length > 0

        if (this.achouTarefas)
          this.usuario = this.tasks[0].user;
      });
    }
  },
  created() {
    this.loadTasks();
  },
  watch: {
    '$route' () {
      this.loadTasks();
    },
  },
}
</script>
