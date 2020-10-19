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
          <Label for="menuName">菜单名称:</Label>
          <TextBox
            inputId="menuName"
            name="menuName"
            v-model="model.menuName"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("menuName") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="parentId">上级菜单:</Label>
          <ComboTree 
            :data="menuData" 
            v-model="model.parentId"
            valueField="id"
            textField="text"
            placeholder="请选择"
            :editable="false"
            >
            <Tree slot="tree"></Tree>
            <Addon>
              <span v-if="model.parentId!=null" class="textbox-icon icon-clear" title="清除" @click="model.parentId=null"></span>
            </Addon>
          </ComboTree>
          <div class="error">{{ getError("parentId") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="url">URL:</Label>
          <TextBox
            inputId="url"
            name="url"
            v-model="model.url"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("url") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="icon">图标:</Label>
          <TextBox
            inputId="icon"
            name="icon"
            v-model="model.icon"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("icon") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="sort">排序:</Label>
          <NumberBox
            inputId="sort"
            name="sort"
            :precision="0"
            :min="-999999"
            :max="999999"
            v-model="model.sort"
            placeholder="请输入"
          ></NumberBox>
          <div class="error">{{ getError("sort") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="authCode">权限编码:</Label>
          <TextBox
            inputId="authCode"
            name="authCode"
            :precision="1"
            v-model="model.authCode"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("authCode") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="isMenu">是否菜单:</Label>
          <ComboBox
            inputId="isMenu"
            name="isMenu"
            valueField="id"
            textField="text"
            v-model="model.isMenu"
            :data="staticData.boolData"
            :editable="false"
            >
            <Addon>
              <span v-if="model.isMenu!=null" class="textbox-icon icon-clear" title="清除" @click="model.isMenu=null"></span>
            </Addon>
          </ComboBox>
          <div class="error">{{ getError("isMenu") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="isBtn">是否功能:</Label>
          <ComboBox
            inputId="isBtn"
            name="isBtn"
            valueField="id"
            textField="text"
            v-model="model.isBtn"
            :data="staticData.boolData"
            :editable="false"
            >
            <Addon>
              <span v-if="model.isBtn!=null" class="textbox-icon icon-clear" title="清除" @click="model.isBtn=null"></span>
            </Addon>
          </ComboBox>
          <div class="error">{{ getError("isBtn") }}</div>
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
            :editable="false"
            >
            <Addon>
              <span v-if="model.isDisabled!=null" class="textbox-icon icon-clear" title="清除" @click="model.isDisabled=null"></span>
            </Addon>
          </ComboBox>
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
import { menu_post, menu_put } from "@/utils/urls";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      rules: {
        menuName: valid({ required: true, max: 18, message: "输入不能超过18个字符" }),
        url: valid({ max: 50, message: "输入不能超过50个字符" }),
        icon: valid({ max: 30, message: "输入不能超过30个字符" }),
        isMenu: valid({ required: true }),
        isBtn: valid({ required: true }),
        authCode: valid({ max: 30, message: "输入不能超过30个字符" }),
        isDisabled: valid({ required: true })
      },
      model: {},
      errors: {},
      staticData: staticData
    };
  },
  props: ["record", "menuData"],
  created() { },
  mounted() {
    this.model = this.record;
    this.errors = {};
  },
  methods: {
    save() {
      this.$refs.form.validate(error => {
        if(!error){
          this.model.parent = null;
          this.model.children = null;
          if(this.model.id){
            http.put(menu_put + "/" + this.model.id, this.model, response => {
              this.$emit("load");
              this.$emit("cancelEdit");
            })
          } else{
            http.post(menu_post, this.model, response => {
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
