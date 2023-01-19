<template>
  <div id="Help">
    <div class="top">
      <h1>{{msg}}</h1>
<!--      <a href="../static/conversation.html">跳转按钮1</a>-->
      <button @click="jumpHtml">点击打开聊天机器人</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',
  data(){
    return {
      msg :'欢迎与机器人小皮聊天!你可以问她任何问题'
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
