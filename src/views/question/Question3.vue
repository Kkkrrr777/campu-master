<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div v-for="(test, index) in tests" :key="index">
              <p>{{index + 1}}.{{test.timu}}</p>
              <el-checkbox-group v-if="test.type == '多选'" v-model="test.da">
                <!-- label绑定答案的值,可以绑定索引index,也可以绑定答案内容city -->
                <el-checkbox
                  v-for="(city,index) in test.xuanxiang"
                  :label="index"
                  :key="index"
                >{{city}}</el-checkbox>
              </el-checkbox-group>
              <el-radio-group v-else-if="test.type == '单选'" v-model="test.da">
                <el-radio
                  v-for="(city,index) in test.xuanxiang"
                  :label="index"
                  :key="index"
                >{{city}}</el-radio>

              </el-radio-group>

              <div v-else>
                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="test.da"></el-input>
              </div>
            </div>
          </div>
          <br />
          <!-- <div>
            <router-link :to="{name:'first',params:{username:'小灰灰',code:1}}">跳转第1页</router-link>
            <router-link :to="{name:'second',params:{username:'小灰灰',code:1}}">跳转第2页</router-link>
            <router-link :to="{name:'third',params:{username:'小灰灰',code:1}}">跳转第3页</router-link>
          </div>-->
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple-light">
            <h3>题号:</h3>
            <div class="tihao">
              <!-- <span class="ti active">{{index + 1}}</span> -->
              <div v-for="(test,index) in tests" :key="index">
                <span v-if="test.da.length == '0'" class="ti">
                  {{index + 1}}
                  <!-- {{key}} -->
                </span>
                <span v-else class="ti active">{{index + 1}}</span>
              </div>

            </div>
          </div>
          <div>
            <el-button @click="submitCount" type="primary">提交考卷</el-button>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      tests: [
        {
          timu: "Kiran Bedi received Magsaysay Award for government service in",
          type: "单选",
          xuanxiang: ["1992", "1993",
            "1994", "1995"],
          // 答案存放字符串
          da: ""
        },
        {
          timu: "Logarithm tables were invented by",
          type: "单选",
          xuanxiang: ["John Napier", "John Doe",
            "John Harrison", "John Douglas"],
          // 答案存放字符串
          da: ""
        },
        {
          timu: "With which sport is the Jules Rimet trophy associated?",
          type: "单选",
          xuanxiang: ["Basketball", "Football", "Hockey", "Golf"],
          // 答案存放字符串
          da: ""
        },
        {
          timu: "Joule is the unit of",
          type: "单选",
          xuanxiang: ["temperature", "pressure",
            "energy", "heat"],
          // 答案存放字符串
          da: ""
        },
        {
          timu: "Kemal Ataturk was",
          type: "单选",
          xuanxiang: ["the first President of Independent Kenya", "the founder of modern Turkey",
            "revolutionary leader of Soviet Union", "None of the above"],
          // 答案存放字符串
          da: ""
        },
        {
          timu: "Milkha Singh Stood ____ in 1960 Olympics, in Athletics.",
          type: "单选",
          xuanxiang: ["fourth in 400m final", "second in 400m final",
            "eighth in 50km walk", "seventh in 800m final"],
          // 答案存放字符串
          da: ""
        }
        // {
        //   timu: "我是第三题,问答题",
        //   type: "问答",
        //   xuanxiang: ["AA反打", "BB烦", "CC粉丝", "DD让人"],
        //   // 答案存放字符串
        //   da: ""
        // }
      ]
    };
  },
  created() {},
  updated() {
    console.log(tests);
  },
  methods: {
    submitCount() {
      console.log("提交试卷");
      // 是否答完
      let isComplete = true;
      this.tests.forEach((val,i) =>{
        if(val.da.length == 0){
          isComplete = false;
          return;
        }
      })

      if(isComplete){
        let postData = [];
        this.tests.forEach((val,i) =>{
          postData[i] = val.da
        })
        let score =0;
        // 答题完整,可以提交,在这里进行提交数据操作
        this.$http
          .post('http://127.0.0.1:8843/question/postAnswer',{
            data:postData,
            index:3,
            username: sessionStorage.getItem("user")
          }).then(response => {
          score = response.data.data
          alert('本次分数为:'+score);
        })
        alert('交卷成功!');

      }else{
        alert('未打完,请继续答卷!');
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
/* 题目*/
.tihao {
  display: flex;
  justify-content: space-around;
}
.ti {
  display: inline-block;
  width: 25px;
  height: 25px;
  line-height: 27px;
  border: 0.1px solid #bbb;
  color: #bbb;
  border-radius: 10%;
  text-align: center;
}
.active {
  background-color: blue;
  color: white;
}
</style>

