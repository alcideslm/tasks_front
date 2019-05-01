<template>
  <div>
    <h1><i class="fa fa-check"></i>Lista de tarefas</h1>
    <div id="todo-list" >
      <div v-for="(user, i) in users" v-bind:key="i">
        <router-link :to="'/user/' + user.id">
          <span class="user">{{user.nome}}</span>
        </router-link>
      </div>
      <router-link to="/user/new"> 
        <div id="add-todo">
          <i class="fa fa-plus"></i>
          Adicionar usuario
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data: function data(){
    return {
      users: []
    };
  },
  created() {
    this.$http
      .get(`${process.env.VUE_APP_API}/user`)
      .then((reponse) => {
        this.users = reponse.data;
      });
  }
}
</script>
