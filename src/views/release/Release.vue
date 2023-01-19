<template>
  <div id="Release">
    <div class="title">Release:</div>
    <div class="ReleaseBd">
      <ul>
        <li>
          <span>Product Images:</span>
          <div style="padding-left: 95px">
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:8843/image/uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </li>
        <li>
          <span>Product Name:</span>
          <input v-model="title" type="text" />
        </li>
        <li>
          <span>Original price of the product:</span>
          <input v-model="bprice" type="number" />
        </li>
        <li>
          <span>Selling Price:</span>
          <input v-model="price" type="number" />
        </li>
        <li>
          <span class="describe">Product Description:</span>
          <textarea
            v-model="content"
            name="textarea"
            id=""
            placeholder="Please describe the product you posted"
          >
          </textarea>
        </li>
        <li>
          <span></span>
          <button @click="sunm">Release</button>
          <input type="reset" value="Reset" id="reset" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "@/assets/css/release.css";
import request from "@/network/request";

export default {
  name: "Release",
  data() {
    return {
      imageUrl: "",
      dbimgUrl: "",
      title: "",
      bprice: "",
      price: "",
      content: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.dbimgUrl = res.data;
      this.$message.success(res.msg);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("Upload avatar image in JPG format only!");
      }
      if (!isLt2M) {
        this.$message.error("Upload avatar image size cannot exceed 2MB!");
      }
      return isJPG && isLt2M;
    },
    sunm() {
      this.$http
        .put("http://127.0.0.1:8843/product/addProduct", {
          imgUrl: this.dbimgUrl,
          title: this.title,
          bprice: this.bprice,
          price: this.price,
          content: this.content,
          username: sessionStorage.getItem("user")
        })
        .then(response => {
          setTimeout(() => {
            location.reload();
            this.$router.replace("/home");
            location.reload();
          });
        });
    }
  },
  created() {
    if (sessionStorage.getItem("user") == null) {
      setTimeout(() => {
        this.$router.replace("/login");
      }, 0);
    } else {
      this.$router.replace("/release");
    }
  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
