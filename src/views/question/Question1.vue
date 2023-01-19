<template>
  <el-container>
    <el-main>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <div v-for="(test, index) in tests" :key="index">
              <p>{{ index + 1 }}.{{ test.timu }}</p>
              <el-checkbox-group v-if="test.type == '多选'" v-model="test.da">
                <!-- label绑定答案的值,可以绑定索引index,也可以绑定答案内容city -->
                <el-checkbox
                  v-for="(city, index) in test.xuanxiang"
                  :label="index"
                  :key="index"
                  >{{ city }}</el-checkbox
                >
              </el-checkbox-group>
              <el-radio-group v-else-if="test.type == '单选'" v-model="test.da">
                <el-radio
                  v-for="(city, index) in test.xuanxiang"
                  :label="index"
                  :key="index"
                  >{{ city }}</el-radio
                >
              </el-radio-group>

              <div v-else>
                <el-input
                  type="textarea"
                  :rows="2"
                  placeholder="请输入内容"
                  v-model="test.da"
                ></el-input>
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
            <h3>Question number:</h3>
            <div class="tihao">
              <!-- <span class="ti active">{{index + 1}}</span> -->
              <div v-for="(test, index) in tests" :key="index">
                <span v-if="test.da.length == '0'" class="ti">
                  {{ index + 1 }}
                  <!-- {{key}} -->
                </span>
                <span v-else class="ti active">{{ index + 1 }}</span>
              </div>
            </div>
          </div>
          <div>
            <el-button @click="submitCount" type="primary"
              >Submission</el-button
            >
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
          timu: "Grand Central Terminal, Park Avenue, New York is the world's",
          type: "单选",
          xuanxiang: [
            "largest railway station",
            "highest railway station",
            "longest railway station",
            "None of the above"
          ],
          // 答案存放字符串
          da: ""
        },
        {
          timu: "Entomology is the science that studies",
          type: "单选",
          xuanxiang: [
            "Behavior of human beings",
            "Insects",
            "The origin and history of technical and scientific terms",
            "The formation of rocks"
          ],
          // 答案存放字符串
          da: ""
        },
        {
          timu:
            "Eritrea, which became the 182nd member of the UN in 1993, is in the continent of",
          type: "单选",
          xuanxiang: ["Asia", "Africa", "Europe", "Australia"],
          // 答案存放字符串
          da: ""
        },
        {
          timu: "Garampani sanctuary is located at",
          type: "单选",
          xuanxiang: [
            "Junagarh, Gujarat",
            "Diphu, Assam",
            "Kohima, Nagaland",
            "Gangtok, Sikkim"
          ],
          // 答案存放字符串
          da: ""
        },
        {
          timu:
            "For which of the following disciplines is Nobel Prize awarded?",
          type: "单选",
          xuanxiang: [
            "Physics and Chemistry",
            "Physiology or Medicine",
            "Literature, Peace and Economics",
            "All of the above"
          ],
          // 答案存放字符串
          da: ""
        },
        {
          timu: "Hitler party which came into power in 1933 is known as",
          type: "单选",
          xuanxiang: [
            "Labour Party",
            "Nazi Party",
            "Ku-Klux-Klan",
            "Democratic Party"
          ],
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
      console.log("Submission");
      // 是否答完
      let isComplete = true;
      this.tests.forEach((val, i) => {
        if (val.da.length == 0) {
          isComplete = false;
          return;
        }
      });

      if (isComplete) {
        let postData = [];
        this.tests.forEach((val, i) => {
          postData[i] = val.da;
        });
        let score = 0;
        // 答题完整,可以提交,在这里进行提交数据操作
        this.$http
          .post("http://127.0.0.1:8843/question/postAnswer", {
            data: postData,
            index: 1,
            username: sessionStorage.getItem("user")
          })
          .then(response => {
            score = response.data.data;
            alert("The points earned this time are:" + score);
          });
        alert("Submit successfully!");
      } else {
        alert("Not finished, please continue to answer!");
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
