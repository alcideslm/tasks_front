<template>
  <div >
    <h1><i class="fa fa-check"></i>Lista de tarefas - Cadastro de usuario</h1>
    <div id="todo-list">
      <div class="form-group">
        <label for="nome">Nome</label>
        <input type="text" class="form-control" id="nome" v-model="user.nome" placeholder="Nome de usúario">
      </div>
      <small v-if="msgErro != ''" class="form-text text-muted error">{{msgErro}}</small>
      <small v-if="salvo" class="form-text text-muted success">Salvo com sucesso!</small>
      <button @click="save" class="btn btn-primary">Salvar</button>
      <router-link to="/">
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
      user: {
        nome: '',
      },
      msgErro: '',
      salvo: false
    };
  },
  methods: {
    save(){
      this.msgErro = "";
      if (this.user.nome == ''){
        this.msgErro = "Campo nome obrigatório."
        return;
      }

      this.$http
        .post(`${process.env.VUE_APP_API}/user`,this.user)
        .then((result) => { 
          this.user = result.data;
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
