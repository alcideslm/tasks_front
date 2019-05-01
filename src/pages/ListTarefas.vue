<template>
  <div >
    <h1><i class="fa fa-check"></i>Lista de tarefas - {{usuario.nome}}</h1>
    <form id="todo-list">
      <span class="todo-wrap" v-for="(task, i) in tasks" v-bind:key="i">
        <input type="checkbox" :id="task.id" v-model="task.concluido" @change="updateTask(task)"/>
        <label :for="task.id" class="todo">
          <i class="fa fa-check"></i>
          {{task.titulo}}
        </label>
        <router-link :to="'/task/edit/' + task.id">
          <span class="edit-item" title="Alterar">
            <i class="fa fa-edit"></i>
          </span>
        </router-link>
      </span>
      <div v-if="!achouTarefas">Nenhum item encontrado</div>
      <small v-if="msg != ''" class="form-text text-muted">{{msg}}</small>
      <router-link :to="'/task/new/' + this.$route.params.id">
        <div id="add-todo">
          <i class="fa fa-plus"></i>
          Nova Tarefa
        </div>
      </router-link>

      <router-link to="/">
        <div id="back">
          <i class="fa fa-arrow-left"></i>
          Voltar ao início
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
      achouTarefas : false,
      msg: ''
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
    },
    updateTask(task){
      this.$http
        .post(`${process.env.VUE_APP_API}/task`,task)
        .then(() => { 
          this.msg = "Salvo com sucesso!";
        })
        .catch(() => {
          this.msg = "Ocorreu um erro ao atualizar tarefa!";
        });
      setTimeout(function () { this.msg = ""; }.bind(this), 3000)
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
