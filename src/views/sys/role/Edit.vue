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
          <Label for="roleName">角色名称:</Label>
          <TextBox
            inputId="roleName"
            name="roleName"
            v-model="model.roleName"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("roleName") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="roleCode">角色编码:</Label>
          <TextBox
            inputId="roleCode"
            name="roleCode"
            v-model="model.roleCode"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("roleCode") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="shopId">店铺:</Label>
          <ComboBox
            inputId="shopId"
            name="shopId"
            valueField="id"
            textField="shopName"
            v-model="model.shopId"
            :data="shopList"
            :editable="false"
            >
            <Addon>
              <span v-if="model.shopId!=null" class="textbox-icon icon-clear" title="清除" @click="model.shopId=null"></span>
            </Addon>
          </ComboBox>
          <div class="error">{{ getError("shopId") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="remark">备注:</Label>
          <TextBox
            inputId="remark"
            name="remark"
            :precision="1"
            v-model="model.remark"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("remark") }}</div>
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
import { role_post, role_put, shop_get } from "@/utils/urls";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      rules: {
        roleCode: valid({ required: true, max: 18, message: "输入不能超过18个字符" }),
        roleName: valid({ required: true, max: 18, message: "输入不能超过18个字符" }),
        remark: valid({ max: 100, message: "输入不能超过100个字符" }),
        isDisabled: valid({ required: true }),
        shopId: valid({ required: true, max: 32 })
      },
      model: {},
      errors: {},
      staticData: staticData,
      shopList: []
    };
  },
  props: ["record"],
  created() { },
  mounted() {
    this.model = this.record;
    this.errors = {};
    this.loadShop();
  },
  methods: {
    loadShop(){
      http.get(shop_get, {}, response => {
        this.shopList = response.data;
      })
    },
    save() {
      this.$refs.form.validate(error => {
        if(!error){
          if(this.model.id){
            http.put(role_put + "/" + this.model.id, this.model, data => {
              this.$emit("load");
              this.$emit("cancelEdit");
            })
          } else{
            http.post(role_post, this.model, data => {
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
