<template>
  <div >
    <h1><i class="fa fa-check"></i>Lista de tarefas</h1>
    <div id="todo-list">
      <div class="form-group">
        <label for="titulo">Título</label>
        <input type="text" class="form-control" id="titulo" v-model="task.titulo" placeholder="Título da tarefa">
      </div>
      <div class="form-group">
        <label for="tarefa">Tarefa</label>
        <textarea class="form-control" id="tarefa"  v-model="task.texto" rows="3" maxlength="1000"></textarea>
      </div>
      <small v-if="msgErro != ''" class="form-text text-muted error">{{msgErro}}</small>
      <small v-if="salvo" class="form-text text-muted success">Salvo com sucesso!</small>
      <button @click="save" class="btn btn-primary">Salvar</button>
      <router-link :to="'/user/' + this.userId">
        <div id="back">
          <i class="fa fa-arrow-left"></i>
          Voltar
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data: function data(){
    return {
      userId: null,
      task: {
        titulo: '',
        texto: '',
      },
      msgErro: '',
      salvo: false
    };
  },
  created() {
    this.getTask();
  },
  methods: {
    getTask(){
      if (this.$route.params.userId){
        this.userId = this.$route.params.userId;
        console.log("Is new!")
      }
      if (this.$route.params.taskId){
        this.$http
        .get(`${process.env.VUE_APP_API}/task/byId/${this.$route.params.taskId}`)
        .then((reponse) => {
          let task = reponse.data;
          this.task = task;
          this.userId = task.user.id;
        });
      }
    },
    save(){
      this.msgErro = "";
      if (this.task.titulo == ''){
        this.msgErro = "Campo titulo obrigatório."
        return;
      }

      this.task.user = {
        id: this.userId
      }

      this.$http
        .post(`${process.env.VUE_APP_API}/task`,this.task)
        .then((result) => { 
          this.task = result.data;
          this.salvo = true;

          setTimeout(function () { this.salvo = false; }.bind(this), 3000)
        });

    }
  }
}
</script>

<style>
.error {
  color: red !important;
  margin-bottom: 5px;
}

.success {
  color: green !important;
  margin-bottom: 5px;
}
</style>
