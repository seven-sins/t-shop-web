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
          <Label for="categoryName">分类名称:</Label>
          <TextBox
            inputId="categoryName"
            name="categoryName"
            v-model="model.categoryName"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("categoryName") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="parentId">上级分类:</Label>
          <ComboTree 
            :data="categoryData" 
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
          <Label for="categoryCode">分类编码:</Label>
          <TextBox
            inputId="categoryCode"
            name="categoryCode"
            v-model="model.categoryCode"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("categoryCode") }}</div>
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

        <div class="t-form-item">
          <Label for="remark">备注:</Label>
          <TextBox
            inputId="remark"
            name="remark"
            v-model="model.remark"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("remark") }}</div>
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
import { category_post, category_put } from "@/utils/urls";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      rules: {
        categoryName: valid({ required: true, max: 18, message: "输入不能超过18个字符" }),
        categoryCode: valid({ required: true, max: 30, message: "输入不能超过30个字符" }),
        remark: valid({ max: 100, message: "输入不能超过100个字符" }),
        isDisabled: valid({ required: true })
      },
      model: {},
      errors: {},
      staticData: staticData
    };
  },
  props: ["record", "categoryData"],
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
            http.put(category_put + "/" + this.model.id, this.model, response => {
              this.$emit("load");
              this.$emit("cancelEdit");
            })
          } else{
            http.post(category_post, this.model, response => {
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
