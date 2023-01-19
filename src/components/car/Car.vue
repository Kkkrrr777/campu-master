<template>
  <div id="Goods">
    <div class="CarBd">
      <div v-if="collect.length <= 0" style="margin-top: 50px;width: 600px">
        <!--        <div class="left">-->
        <!--          <img src="@/assets/img/car.png" alt="">-->
        <!--        </div>-->
        <!--        <div class="left r">-->
        <!--          <p>您还没收藏过宝贝哦</p>-->
        <!--          <p><a href="/home">去随便逛逛吧</a><span>,看看有没有喜欢的</span></p>-->
        <!--          <p></p>-->
        <!--        </div>-->
        <el-card :body-style="{ padding: '0px' }" style="margin-left: 200px">
          <img src="@/assets/img/car.png" class="image" />
          <div style="padding: 14px;">
            <span>You have not yet purchased the product</span>
            <p>
              <a href="/home">Go for a casual stroll</a
              ><span>,See if there is anything you like</span>
            </p>
          </div>
        </el-card>
      </div>
      <div class="GoodsBd" v-else>
        <p style="font-size: 20px;color: #0DA5DD">
          Product purchases, will show you the products you have purchased, you
          have purchased a total of{{ collect.length }}The product of your
          choice
        </p>
        <div
          style="margin-top: 20px"
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
                <span>Number of buyers:</span><span>{{ item.sc }}</span>
                <img src="@/assets/img/gouwuche.svg" alt="收藏" />
              </span>
            </li>
            <li class="clear">
              <p>
                <!-- 时间 -->
                <span class="item" style="padding-left: 8px"
                  >Purchase Time:{{
                    car[index].createTime.substring(0, 10)
                  }}</span
                >
                <!-- 收藏次数  浏览次数 点击收藏 -->
              </p>
            </li>
            <li>
              <div style="float: left;">
                <el-button type="primary" @click="dk(item)"
                  >View Details</el-button
                >
              </div>
              <div style="float: right">
                <el-button type="danger" @click="hover(car[index].id)"
                  >Delete records</el-button
                >
              </div>
            </li>
          </ul>
        </div>
        <div id="paging">
          <div class="block">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
        <el-drawer
          :visible.sync="drawer"
          :direction="direction"
          :show-close="close"
          :destroy-on-close="true"
          :before-close="handleClose"
          size="90%"
        >
          <div id="Details" style="overflow:auto;">
            <p>
              Product Details<span style="font-size: 10px;color: red"
                >(Tip:Click on the blank space to close)</span
              >
            </p>
            <div class="clearfix">
              <div class="left">
                <ul>
                  <li>
                    <img :src="http + datas.imgUrl" alt="" />
                  </li>
                </ul>
              </div>
              <div class="right">
                <ul>
                  <li>
                    <span>Product Name:</span
                    ><span class="name">{{ datas.title }}</span>
                  </li>
                  <li>
                    <span>Product Original Price:</span><span>￥</span
                    ><span>{{ datas.bprice }}</span>
                  </li>
                  <li>
                    <span>Product Used Price:</span
                    ><span
                      ><span style="color: red;font-size: 20px"
                        >￥{{ datas.price }}</span
                      ></span
                    >
                  </li>
                  <li class="des">
                    <span>Product Description:</span
                    ><span>{{ datas.content }}</span>
                  </li>
                  <li>
                    <span>Seller Contact:</span><span>{{ tel }}</span>
                  </li>
                  <li>
                    <span>Product shelf time:</span
                    ><span>{{ datas.createTime }}</span>
                  </li>
                  <li>
                    <span
                      >Views:<span style="color: red">{{
                        datas.count
                      }}</span></span
                    >
                  </li>
                  <li>
                    <span
                      >Number of buyers:<span style="color: red">
                        {{ datas.sc }}</span
                      ></span
                    >
                  </li>
                  <!--                      <li>-->
                  <!--                        <el-button type="primary" @click="sc(item.id,item.sc)">收藏商品</el-button>-->
                  <!--                      </li>-->
                </ul>
              </div>
            </div>
          </div>
        </el-drawer>
      </div>
    </div>
  </div>
</template>

<script>
import "@/assets/css/car.css";
import "@/assets/css/home.css";
import "@/assets/css/goods.css";
import "@/assets/css/details.css";

export default {
  name: "Car",
  data() {
    return {
      modal: false,
      close: true,
      withHeader: false,
      imgremove: false,
      collect: [],
      datas: {},
      car: [],
      tel: "",
      http: "http://127.0.0.1:8843",
      collectSwitchCount: 2,
      total: 0,
      currentPage: 1,
      pagesize: 10,
      drawer: false,
      direction: "ltr"
    };
  },
  methods: {
    mopen(id, userId, count) {
      console.log(id, userId);
      this.$http
        .get("http://127.0.0.1:8843/user/selectById?id=" + userId)
        .then(response => {
          this.tel = response.data.data.tel;
        });
      this.$http
        .put(
          "http://127.0.0.1:8843/product/update?id=" +
            id +
            "&count=" +
            (count + 1)
        )
        .then(response => {
          console.log(response.data);
        });
    },
    dk(item) {
      this.drawer = true;
      this.datas = item;
      console.log(item);
    },
    handleClose(done) {
      done();
    },
    hover(id) {
      this.$confirm(
        "Whether to stop keeping purchase records for this product?",
        "Reminder",
        {
          confirmButtonText: "Confirm",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      ).then(() => {
        this.$http
          .post("http://127.0.0.1:8843/favorites/deleteFavorites", {
            username: sessionStorage.getItem("user"),
            fid: id
          })
          .then(response => {
            if (response.data.data == true) {
              this.$message.success("Delete successfully");
              setTimeout(() => {
                location.reload();
                this.$router.replace("/home");
              }, 500);
            }
          });
      });
    },
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      // 当前页
      console.log(val);
      console.log(`Current page: ${val}`);
      this.currentPage = val;
      this.$router.replace("/release");
      this.$http
        .post("http://127.0.0.1:8843/favorites/favoriteList", {
          page: this.currentPage,
          number: this.pagesize,
          username: sessionStorage.getItem("user")
        })
        .then(response => {
          this.car = response.data.data;
          let index = response.data.data;
          let pId = new Array();
          for (let i = 0; i < index.length; i++) {
            pId.push(index[i].productId);
          }
          this.$http
            .post("http://127.0.0.1:8843/product/productListById", {
              page: "1",
              number: "10",
              pId: JSON.parse(JSON.stringify(pId))
            })
            .then(response => {
              console.log(response.data);
              this.collect = response.data.data;
              this.total = response.data.total;
            });
        });
    },
    handlePageSizes() {
      this.$router.replace("/release");
      this.$http
        .post("http://127.0.0.1:8843/favorites/favoriteList", {
          page: this.currentPage,
          number: this.pagesize,
          username: sessionStorage.getItem("user")
        })
        .then(response => {
          this.car = response.data.data;
          let index = response.data.data;
          let pId = new Array();
          if (this.data.data.length != 0) {
            for (let i = 0; i < index.length; i++) {
              pId.push(index[i].productId);
            }
            this.$http
              .post("http://127.0.0.1:8843/product/productListById", {
                page: "1",
                number: "10",
                pId: JSON.parse(JSON.stringify(pId))
              })
              .then(response => {
                console.log(response.data);
                this.collect = response.data.data;
                this.total = response.data.total;
                console.log(this.car);
              });
          }
        });
    },
    carDetailsEl() {
      this.$router.replace("/details");
    }
  },
  created() {
    if (sessionStorage.getItem("user") == null) {
      setTimeout(() => {
        this.$router.replace("/login");
      }, 0);
    } else {
      // this.$router.replace('/release');
      this.$http
        .post("http://127.0.0.1:8843/favorites/favoriteList", {
          page: this.currentPage,
          number: this.pagesize,
          username: sessionStorage.getItem("user")
        })
        .then(response => {
          this.car = response.data.data;
          let index = response.data.data;
          let pId = new Array();
          if (response.data.data.length != 0) {
            for (let i = 0; i < index.length; i++) {
              pId.push(index[i].productId);
            }
            this.$http
              .post("http://127.0.0.1:8843/product/productListById", {
                page: "1",
                number: "10",
                pId: JSON.parse(JSON.stringify(pId))
              })
              .then(response => {
                console.log(response.data);
                this.collect = response.data.data;
                this.total = response.data.total;
              });
          }
        });
    }
  }
};
</script>

<style>
#paging {
  width: 1200px;
  margin: 0 auto;
}

#paging > div {
  text-align: center;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
