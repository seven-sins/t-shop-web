<template>
  <div class="t-edit-window">
    <div class="f-full" style="overflow:auto">
      <Form
        ref="form"
        :model="model"
        :rules="rules"
        @validate="errors = $event"
        style="padding:20px 50px"
      >
        <div class="t-form-item">
          <Label for="userName">用户名:</Label>
          <TextBox
            inputId="userName"
            name="userName"
            v-model="model.userName"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("userName") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="userCode">用户编码:</Label>
          <TextBox
            inputId="userCode"
            name="userCode"
            v-model="model.userCode"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("userCode") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="loginAccount">登录账号:</Label>
          <TextBox
            inputId="loginAccount"
            name="loginAccount"
            :precision="1"
            v-model="model.loginAccount"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("loginAccount") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="phone">电话:</Label>
          <TextBox
            inputId="phone"
            name="phone"
            v-model="model.phone"
            placeholder="电话号码(11位)"
          ></TextBox>
          <div class="error">{{ getError("phone") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="idCard">证件号码:</Label>
          <TextBox
            inputId="idCard"
            name="idCard"
            v-model="model.idCard"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("idCard") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="birthday">生日:</Label>
          <DateBox
            inputId="birthday"
            name="birthday"
            format="yyyy-MM-dd"
            v-model="model.birthday"
            placeholder="请选择"
          ></DateBox>
          <div class="error">{{ getError("birthday") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="sex">性别:</Label>
          <ComboBox
            inputId="sex"
            name="sex"
            valueField="id"
            textField="text"
            v-model="model.sex"
            :data="staticData.sex"
          ></ComboBox>
          <div class="error">{{ getError("sex") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="isSysUser">是否系统用户:</Label>
          <ComboBox
            inputId="isSysUser"
            name="isSysUser"
            valueField="id"
            textField="text"
            v-model="model.isSysUser"
            :data="staticData.isSysUser"
          ></ComboBox>
          <div class="error">{{ getError("isSysUser") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="isDisabled">是否停用:</Label>
          <ComboBox
            inputId="isDisabled"
            name="isDisabled"
            valueField="id"
            textField="text"
            v-model="model.isDisabled"
            :data="staticData.isDisabled"
          ></ComboBox>
          <div class="error">{{ getError("isDisabled") }}</div>
        </div>
      </Form>
    </div>

    <div class="t-form-btn buttons f-noshrink">
      <LinkButton @click="save()">保存</LinkButton>
      <LinkButton @click="cancel()">取消</LinkButton>
    </div>
  </div>
</template>

<script>
import http from "@/utils/http";
import valid from "@/utils/validate";
import staticData from "@/utils/staticData";
import { user_post } from "@/utils/urls";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      rules: {
        userCode: valid({ required: true, max: 18, message: "输入不能超过18个字符" }),
        userName: valid({ required: true, max: 18, message: "输入不能超过18个字符" }),
        loginAccount: valid({ required: true, max: 18, message: "输入不能超过18个字符" }),
        phone: valid({ length: 11, message: "请输入正确的手机号" }),
        idCard: valid({ min: 6, max: 18, message: "只允许输入6-18个字符" }),
        isSysUser: valid({ required: true }),
        isDisabled: valid({ required: true })
      },
      model: {},
      errors: {},
      staticData: staticData
    };
  },
  props: ["record"],
  created() { },
  mounted() {
    this.model = this.record;
    this.errors = {};
  },
  methods: {
    save() {
      this.$refs.form.validate(error => {
        if(!error){
          http.post(user_post, this.model, data => {
            console.log(0)
          })
        }
      });
    },
    getError(name) {
      return this.errors[name] && this.errors[name].length
        ? this.errors[name][0]
        : null;
    },
    cancel() {
      this.$emit("cancelEdit");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>
