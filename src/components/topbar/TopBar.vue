<template>
  <header>
    <nav class="clear">
      <div class="left">
        <div class="imgbox left">
          <img src="@/assets/img/Top_Logo.jpg" class="top_img" alt="" />
        </div>
        <ul class="right">
          <router-link class="px16 pointer" to="/home" tag="li" replace
            ><span
              @click="
                flagT();
                homelist();
              "
              >Home</span
            >
          </router-link>
          <router-link class="px16 pointer" to="/release" tag="li" replace>
            <span @click="xxx">Release</span>
          </router-link>
          <router-link class="px16 pointer" to="/car" tag="li" replace>
            <span @click="xx">Cart</span>
          </router-link>
          <!--          <router-link class="px16 pointer" style="cursor:help" to='/help' tag='li' replace><span>帮助</span></router-link>-->
          <router-link
            class="px16 pointer"
            style="cursor:help"
            to="/question1"
            tag="li"
            replace
            ><span>Quiz 1</span></router-link
          >
          <router-link
            class="px16 pointer"
            style="cursor:help"
            to="/question2"
            tag="li"
            replace
            ><span>Quiz 2</span></router-link
          >
          <router-link
            class="px16 pointer"
            style="cursor:help"
            to="/question3"
            tag="li"
            replace
            ><span>Quiz 3</span></router-link
          >
          <router-link
            class="px16 pointer"
            style="cursor:help"
            to="/question4"
            tag="li"
            replace
            ><span>Quiz 4</span></router-link
          >
          <router-link
            class="px16 pointer"
            style="cursor:help"
            to="/question5"
            tag="li"
            replace
            ><span>Quiz 5</span></router-link
          >
          <router-link
            class="px16 pointer"
            style="cursor:help"
            to="/AI"
            tag="li"
            replace
            ><span>Chatbot</span></router-link
          >
        </ul>
      </div>
      <div class="right px14">
        <div class="px14" v-if="$store.state.img" style="padding-top: 20px">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ $store.state.name
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">Logout</el-dropdown-item>
              <el-dropdown-item command="b">My Products</el-dropdown-item>
              <el-dropdown-item command="c">My Message</el-dropdown-item>
              <el-dropdown-item command="d">My Balance</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <ul class="px14" v-else>
          <router-link class="px14 pointer" to="/login" tag="li" replace
            ><span>Login</span></router-link
          >
          <li>|</li>
          <router-link class="px14 pointer" to="/reg" tag="li" replace
            ><span>Registration</span></router-link
          >
        </ul>
      </div>
    </nav>

    <div>
      <el-dialog
        title="My posted products"
        :visible.sync="centerDialogVisible"
        append-to-body
        :modal="false"
        lock-scroll
        width="50%"
        center
      >
        <div style="overflow:auto;height: 600px;margin: 20px">
          <div
            style="margin-top: 10px;margin-left: 10px;"
            class="single xx"
            v-for="(item, index) in collect"
            :key="item.id"
          >
            <div class="imgbox">
              <!-- 图片展示 -->
              <img :src="http + item.imgUrl" alt="" />
            </div>
            <ul>
              <li>
                <!-- 描述 -->
                <p class="describe">
                  {{ item.content }}
                </p>
              </li>
              <li class="clear">
                <!-- 二手价/原价 -->
                <p class="pricebox">
                  <span class="priTitle">{{ item.title }}</span>
                </p>
              </li>
              <li style="padding-left:10px;">
                <span class="price">￥{{ item.price }}</span
                ><span>/</span><span class="cost">￥{{ item.bprice }}</span>
              </li>
              <li class="lisc">
                <span class="licount">
                  <span>Browse:</span><span>{{ item.count }}</span>
                  <span>Collection:</span><span>{{ item.sc }}</span>
                  <img src="@/assets/img/gouwuche.svg" alt="收藏" />
                </span>
              </li>
              <li class="clear">
                <p>
                  <!-- 时间 -->
                  <span class="item" style="padding-left: 8px"
                    >Release Time:{{ item.createTime.substring(0, 10) }}</span
                  >
                  <!-- 收藏次数  浏览次数 点击收藏 -->
                </p>
              </li>
              <li>
                <div style="float: left">
                  <el-button type="warning" size="medium" @click="sxj(item.id)"
                    >Upload/Remove</el-button
                  >
                </div>
                <div style="float: right">
                  <el-button type="danger" size="medium" @click="sc(item.id)"
                    >Delete product</el-button
                  >
                </div>
              </li>
              <div></div>
            </ul>
          </div>
        </div>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="My Balance"
        :visible.sync="centerDialogVisible2"
        append-to-body
        :modal="false"
        lock-scroll
        width="60%"
        center
      >
        <h3>Current account points remaining are: {{ this.score }}</h3>
      </el-dialog>
    </div>
    <div>
      <el-dialog
        title="My posted message"
        :visible.sync="centerDialogVisible1"
        append-to-body
        :modal="false"
        lock-scroll
        width="60%"
        center
      >
        <div style="overflow:auto;height: 600px;margin: 20px">
          <div style="float: left">
            <el-card class="box-card">
              <div class="block">
                <el-timeline>
                  <el-timeline-item
                    v-for="(item, index) in msg"
                    :key="item.id"
                    :timestamp="item.time"
                    placement="top"
                  >
                    <i
                      class="el-icon-delete"
                      title="Delete Message"
                      style="cursor:pointer"
                      @click="del(item.id)"
                    ></i>
                    <el-card>
                      <h4>{{ item.text }}</h4>
                      <br />
                      <p>
                        {{ $store.state.name }} At {{ item.time }} left a
                        message for the product：{{ pname[index].title }}
                      </p>
                    </el-card>
                  </el-timeline-item>
                </el-timeline>
              </div>
            </el-card>
          </div>
        </div>
      </el-dialog>
    </div>
  </header>
</template>

<script>
import "../../assets/css/heder.css";
import "@/assets/css/car.css";
import "@/assets/css/home.css";
import "@/assets/css/goods.css";
import "@/assets/css/details.css";

export default {
  name: "TopBar",
  data() {
    return {
      Acolor: "",
      path: "/home",
      username: "",
      centerDialogVisible: false,
      centerDialogVisible1: false,
      centerDialogVisible2: false,
      collect: [],
      score: 0,
      http: "http://127.0.0.1:8843",
      msg: [],
      pname: []
    };
  },
  methods: {
    del(id) {
      this.$confirm(
        "This operation will permanently delete this message, whether to continue?",
        "Reminder",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      ).then(() => {
        this.$http
          .post("http://127.0.0.1:8843/message/delete", {
            id: id,
            username: sessionStorage.getItem("user")
          })
          .then(response => {
            this.$message.success(response.data.msg);
            setTimeout(function() {
              location.reload();
            }, 1000);
          });
      });
    },
    sc(id) {
      this.$confirm(
        "This operation will permanently delete all information about this product, whether to continue?",
        "Reminder",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      ).then(() => {
        this.$http
          .post("http://127.0.0.1:8843/product/delete", {
            id: id,
            username: sessionStorage.getItem("user")
          })
          .then(response => {
            this.$message.success("Delete successfully");
            setTimeout(function() {
              location.reload();
            }, 1000);
          });
      });
    },
    sxj(id) {
      this.$confirm(
        "The system automatically determines whether to upload or remove the product from the shelf (other users will not be able to see the product), and whether to continue?",
        "Reminder",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      ).then(() => {
        this.$http
          .put("http://127.0.0.1:8843/product/obtained", {
            id: id
          })
          .then(response => {
            this.$message.success(response.data.msg);
            setTimeout(function() {
              location.reload();
            }, 1000);
          });
      });
    },
    xxx() {
      this.pd();
    },
    xx() {
      this.pd1();
    },
    flagT() {
      if (this.path != this.$route.path) {
        this.$router.replace(this.path);
      }
      this.$store.commit("decrementT");
      console.log("mmp");
    },
    homelist() {
      this.$store.dispatch("aHome").then(res => {
        console.log("The submission is completed");
        console.log(res);
      });
    },
    pd() {
      if (sessionStorage.getItem("user") == null) {
        this.$message.error("Please login to your account before proceeding");
        setTimeout(() => {
          this.$router.replace("/login");
        }, 0);
      } else {
        this.$router.replace("/release");
      }
    },
    pd1() {
      if (sessionStorage.getItem("user") == null) {
        this.$message.error("Please login to your account before proceeding");
        setTimeout(() => {
          this.$router.replace("/login");
        }, 0);
      } else {
        this.$router.replace("/car");
      }
    },
    handleCommand(command) {
      if (command == "a") {
        this.out();
      }
      if (command == "b") {
        //我发布的商品
        this.myproduct();
      }
      if (command == "c") {
        //我发布的留言
        this.mymsg();
      }
      if (command == "d") {
        this.myscore();
      }
    },
    myproduct() {
      this.$http
        .post("http://127.0.0.1:8843/product/productListByUser", {
          page: 1,
          number: 1000,
          username: sessionStorage.getItem("user")
        })
        .then(response => {
          this.collect = response.data.data;
        });
      this.centerDialogVisible = true;
    },
    myscore() {
      this.$http
        .post("http://127.0.0.1:8843/question/scoreById", {
          username: sessionStorage.getItem("user")
        })
        .then(response => {
          this.score = response.data.data;
        });
      this.centerDialogVisible2 = true;
    },
    mymsg() {
      this.centerDialogVisible1 = true;
      this.$http
        .post("http://127.0.0.1:8843/message/messageListByUser", {
          page: 1,
          number: 10000,
          username: sessionStorage.getItem("user")
        })
        .then(response => {
          this.msg = response.data.data;
          let index = new Array();
          for (let i = 0; i < response.data.data.length; i++) {
            index.push(response.data.data[i].fid);
          }
          this.$http
            .post("http://127.0.0.1:8843/product/productListByIds", {
              pId: index
            })
            .then(response => {
              this.pname = response.data.data;
            });
        });
    },

    out() {
      this.$confirm("Sure to quit your account??", "Reminder", {
        confirmButtonText: "Confirm",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          sessionStorage.clear();
          this.$message({
            type: "success",
            message: "Logout successful"
          });
          this.$router.replace("/home");
          setTimeout(function() {
            location.reload();
          }, 1000);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "Exit Failure"
          });
        });
    }
  },
  created() {
    this.homelist();
    console.log(sessionStorage.getItem("user"), sessionStorage.length);
    //
    if (sessionStorage.getItem("user") != null) {
      this.$store.state.img = true;
      this.$store.state.name = sessionStorage.getItem("user");
    }
  }
};
</script>

<style scoped>
.colorblue {
  color: #4da5ff;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}

.el-icon-arrow-down {
  font-size: 12px;
}

#paging {
  width: 1200px;
  margin: 0 auto;
}

#paging > div {
  text-align: center;
}
</style>
