<template>
  <div id="Reg">
    <h2>Register</h2>
    <div class="Reg">
      <form action="" class="RegBd">
        <div>
          <input
            type="text"
            v-model.trim="userName"
            placeholder="Please enter your username"
          />
        </div>
        <div>
          <input
            type="email"
            v-model.trim="email"
            @click="op = true"
            placeholder="Please enter the correct email address for verification"
          />
          <p v-show="op" class="oo">
            Tip:In order to save cost, the platform did not spend money to buy
            enterprise mailbox, when you do not receive the verification code,
            please go to the spam folder to look for it
          </p>
        </div>
        <div id="verify">
          <input
            class="verify"
            type="email"
            v-model.trim="code"
            placeholder="Please enter verification code"
            maxlength="8"
          />
          <button v-on:click="verifyClick(verify)" :disabled="verifycood">
            {{ verify }}
          </button>
        </div>
        <div>
          <input
            type="password"
            v-model.trim="passWord"
            name="password"
            placeholder="Please enter your password"
            maxlength="16"
          />
        </div>
        <div>
          <input
            type="password"
            v-model.trim="confirm_password"
            name="password"
            placeholder="Please reconfirm your password"
            maxlength="16"
          />
          <p v-show="ps" class="oo">
            The password entered twice does not match
          </p>
        </div>

        <div>
          <input
            type="button"
            value="Register"
            id="button"
            class="pointer"
            @click="reggo"
          />
        </div>
        <p>
          <span class="on">Already have an account？</span>
          <span class="reg pointer" @click="goLogin">Go to Login</span>
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { Message } from "element-ui";
import "../../assets/css/reg.css";
// import "@/network/request.js"
import request from "@/network/request";

export default {
  name: "Register",
  data() {
    return {
      userName: "",
      roomId: "",
      code: "",
      email: "",
      passWord: "",
      confirm_password: "",
      verify: "Get verification code",
      verifycood: false,
      verify_ccood: false,
      tel: "",
      qqopenid: null,
      op: false,
      ps: false
    };
  },
  methods: {
    open2() {
      this.$message({
        message: this.msg,
        type: "success"
      });
    },
    open4() {
      this.$message.error(this.msg);
    },
    kongstudent_number() {
      const regstudent_number = /^[0-9]*$/;
      if (regstudent_number.test(this.student_number) == false) {
        this.student_number = "";
      }
    },
    konguser() {
      const reguser = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{0,20}$/;
      if (reguser.test(this.userName) == false) {
        this.userName = "";
      }
    },
    kongpassword() {
      if (this.passWord != this.confirm_password) {
        this.ps = true;
      } else {
        this.ps = false;
      }
    },
    verifyClick(verify) {
      const regemail = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
      const reguser = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      if (this.userName == "") {
        this.$message.error("Username input is empty or incorrect format！");
      }
      if (regemail.test(this.email)) {
        this.verify = "60";
        this.verifycood = true;
        let kong = "";
        clearInterval(kong);
        kong = setInterval(() => {
          this.verify--;
          if (this.verify <= 0) {
            clearInterval(kong);
            this.verifycood = false;
            this.verify = "Reacquire";
          }
        }, 1000);
        // axios.post('http://127.0.0.1:8843/user/getCode',{
        // 	email: this.email,
        // 	sta: '0'
        // }).then((res)=>{
        // 	console.log(res)
        // });
        const prom = {
          email: this.email,
          sta: "0"
        };
        request({
          url: "/user/getCode",
          method: "post",
          data: prom
        })
          .then(res => {
            if (res.code == -1) {
              this.$message.error(res.msg);
              clearInterval(kong);
              this.verifycood = false;
              this.verify = "Get verification code";
            }
            console.log(res);
            // alert(res.msg)
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    goLogin() {
      this.$router.replace("/login");
    },
    reggo() {
      request({
        url:
          "/user/add" +
          "?" +
          "userName=" +
          this.userName +
          "&roomId=" +
          this.roomId +
          "&email=" +
          this.email +
          "&passWord=" +
          this.passWord +
          "&tel=" +
          this.tel +
          "&qqopenid=" +
          this.qqopenid,
        method: "put",
        data: {
          code: this.code
        }
      })
        .then(res => {
          console.log("res.data");
          console.log(res.data);
          if ((res.data = false)) {
            this.$message.error(res.msg);
            console.log(res.data);
          } else {
            console.log(res.data);
            this.$notify({
              title: "Register successfully",
              message: "Jump to login page",
              type: "success"
            });
            setTimeout(function() {}, 1000);
            this.$router.replace("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {},
  created() {}
};
</script>

<style></style>
