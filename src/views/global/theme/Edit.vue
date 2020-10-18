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
          <Label for="themeName">主题名称:</Label>
          <TextBox
            inputId="themeName"
            name="themeName"
            v-model="model.themeName"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("themeName") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="themeImg">封面图:</Label>
          <TextBox
            inputId="themeImg"
            name="themeImg"
            v-model="model.themeImg"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("themeImg") }}</div>
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
import { theme_post, theme_put } from "@/utils/urls";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      rules: {
        themeName: valid({ required: true, max: 30, message: "输入不能超过30个字符" }),
        themeImg: valid({ max: 500, message: "输入不能超过18个字符" }),
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
          if(this.model.id){
            http.put(theme_post + "/" + this.model.id, this.model, data => {
              this.$emit("load");
              this.$emit("cancelEdit");
            })
          } else{
            http.post(theme_post, this.model, data => {
              this.$emit("load");
              this.$emit("cancelEdit");
            })
          }
          
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
