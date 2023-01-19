<template>
  <div id="Login">
    <h2>Login</h2>
    <div class="Login">
      <form class="LoginBd">
        <div class="user">
          <input
            type="text"
            id="user"
            name="user"
            v-model="userName"
            placeholder="Please enter your email address"
          />
        </div>
        <div class="password">
          <input
            type="password"
            id="password"
            name="password"
            v-model="passWord"
            placeholder="Please enter your password"
            maxlength="16"
          />
        </div>
        <div class="clear">
          <div class="left">
            <input id="remember" type="checkbox" />
            <label for="remember">
              <span class="remember">Remember the password</span>
            </label>
          </div>
          <div class="right">
            <el-link type="primary" @click="wj">Forgot password？</el-link>
          </div>
        </div>
        <div class="bottonbox">
          <input
            type="button"
            value="Login"
            class="button pointer"
            @click="updataInfo"
          />
        </div>
        <p>
          <span class="on">Don't have an account yet？</span>
          <span class="reg pointer" @click="goReg">Go to Register</span>
        </p>
      </form>
    </div>
    <div>
      <el-dialog
        title="Change password"
        :visible.sync="centerDialogVisible1"
        append-to-body
        :modal="false"
        lock-scroll
        center
      >
        <div class="Reg1">
          <form action="" class="RegBd">
            <div>
              <input
                type="email"
                v-model.trim="email"
                @click="op = true"
                placeholder="Please enter the email address of the account you want to retrieve for verification"
              />
              <p v-show="op" class="oo">
                Tip:In order to save cost, the platform did not spend money to
                buy enterprise mailbox, when you do not receive the verification
                code, please go to the spam folder to look for it
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
                placeholder="Please enter the new password"
                maxlength="16"
              />
            </div>
            <div>
              <input
                type="button"
                value="submit"
                id="button"
                class="pointer"
                @click="reggo"
              />
            </div>
          </form>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import "@/assets/css/login.css";
import { Message } from "element-ui";
import "../../assets/css/reg.css";
// import "@/network/request.js"

export default {
  name: "Login",
  data() {
    return {
      userName: "",
      passWord: "",
      centerDialogVisible1: false,
      email: "",
      code: "",
      confirm_password: "",
      verify: "Get verification code",
      verifycood: false,
      op: false
    };
  },
  methods: {
    reggo() {
      this.$http
        .post(
          "http://127.0.0.1:8843/user/update?email=" +
            this.email +
            "&passWord=" +
            this.passWord,
          {
            code: this.code
          }
        )
        .then(response => {
          if (response.data.data == true) {
            this.centerDialogVisible1 = false;
            this.$message.success("Password change successfully");
          } else {
            this.$message.error("Network abnormal, please try again later");
          }
        });
    },
    verifyClick(verify) {
      const regemail = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
      const reguser = /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,20}$/;
      if (this.email != "") {
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
        const prom = {
          email: this.email,
          sta: "1"
        };
        this.$http
          .post("http://127.0.0.1:8843/user/getCode", prom)
          .then(response => {
            if (response.data.data == true) {
              this.$message.success(
                "Verification code sent successfully, please pay attention to check"
              );
            } else {
              this.$message.error("Network abnormal, please try again later");
            }
          });
      } else {
        this.$message.error("Please enter the correct email address");
      }
    },
    wj() {
      this.centerDialogVisible1 = true;
    },
    goReg() {
      this.$router.replace("/reg");
    },
    updataInfo() {
      let prom = {
        userName: this.userName,
        passWord: this.passWord
      };
      this.$http
        .post("http://127.0.0.1:8843/user/login", prom)
        .then(response => {
          if (response.data.data == false) {
            this.$message.error(response.data.msg);
          } else if (response.data.data) {
            this.$message({
              message: "Login successfully",
              type: "success"
            });
            this.$router.replace("/home");
            this.$store.state.img = true;
            console.log(response.data.data.userName);
            this.$store.state.name = response.data.data.userName;
            sessionStorage.setItem(
              "user",
              response.data.data.userName.toString()
            );
          }
        });
    }
  },
  computed: {
    getVal: {
      get() {
        // 这里也是用了Vuex里的 modules 大家可以当成普通的变量来看
        return this.$store.state.userName;
      },
      set(newuserName) {
        this.$store.commit("handleVal", newuserName);
        console.log(newuserName);
      }
    }
  }
};
</script>

<style></style>
