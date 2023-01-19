<template>
  <div id="Help">
    <div class="top">
      <h1>{{msg}}</h1>
<!--      <a href="../static/conversation.html">跳转按钮1</a>-->
      <button @click="jumpHtml">Click to open chatbot</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data(){
    return {
      msg :'Welcome to chat with the robot P! You can ask any questions'
    }
  },
  methods:{
    jumpHtml(){
      window.location.href = "../static/conversation.html"
    }
  }
}
</script>

<style>

</style>
