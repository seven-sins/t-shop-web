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
          <Label for="shopName">店铺名称:</Label>
          <TextBox
            inputId="shopName"
            name="shopName"
            v-model="model.shopName"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("shopName") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="shopCode">店铺编码:</Label>
          <TextBox
            inputId="shopCode"
            name="shopCode"
            v-model="model.shopCode"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("shopCode") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="manager">掌柜:</Label>
          <TextBox
            inputId="manager"
            name="manager"
            v-model="model.manager"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("manager") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="managerQrcode">二维码:</Label>
          <TextBox
            inputId="managerQrcode"
            name="managerQrcode"
            v-model="model.managerQrcode"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("managerQrcode") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="customerService">客服:</Label>
          <TextBox
            inputId="customerService"
            name="customerService"
            v-model="model.customerService"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("customerService") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="customerServiceQrcode">客服二维码:</Label>
          <TextBox
            inputId="customerServiceQrcode"
            name="customerServiceQrcode"
            v-model="model.customerServiceQrcode"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("customerServiceQrcode") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="themeId">店铺主题:</Label>
          <ComboBox
            inputId="themeId"
            name="themeId"
            valueField="id"
            textField="themeName"
            v-model="model.themeId"
            :data="themeList"
            :editable="false"
            >
            <Addon>
              <span v-if="model.themeId!=null" class="textbox-icon icon-clear" title="清除" @click="model.themeId=null"></span>
            </Addon>
          </ComboBox>
          <div class="error">{{ getError("themeId") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="logoImg">LOGO:</Label>
          <TextBox
            inputId="logoImg"
            name="logoImg"
            v-model="model.logoImg"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("logoImg") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="address">店铺地址:</Label>
          <TextBox
            inputId="address"
            name="address"
            v-model="model.address"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("address") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="phone">联系电话:</Label>
          <TextBox
            inputId="phone"
            name="phone"
            v-model="model.phone"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("phone") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="fax">传真:</Label>
          <TextBox
            inputId="fax"
            name="fax"
            v-model="model.fax"
            placeholder="请输入"
          ></TextBox>
          <div class="error">{{ getError("fax") }}</div>
        </div>

        <div class="t-form-item">
          <Label for="provinceId">省份:</Label>
          <ComboBox
            inputId="provinceId"
            name="provinceId"
            valueField="regionId"
            textField="regionName"
            v-model="model.provinceId"
            :data="provinceList"
            @selectionChange="selectProvince($event)"
            :editable="false"
            >
            <Addon>
              <span v-if="model.provinceId!=null" class="textbox-icon icon-clear" title="清除" @click="model.provinceId=null"></span>
            </Addon>
          </ComboBox>
          <div class="error">{{ getError("provinceId") }}</div>
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
          <Label for="cityId">城市:</Label>
          <ComboBox
            inputId="cityId"
            name="cityId"
            valueField="regionId"
            textField="regionName"
            v-model="model.cityId"
            :data="cityList"
            :editable="false"
            >
            <Addon>
              <span v-if="model.cityId!=null" class="textbox-icon icon-clear" title="清除" @click="model.cityId=null"></span>
            </Addon>
          </ComboBox>
          <div class="error">{{ getError("cityId") }}</div>
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
import { shop_put, shop_post, region_get, theme_get } from "@/utils/urls";

export default {
  name: "Edit",
  components: {},
  data() {
    return {
      rules: {
        shopName: valid({ required: true, max: 30, message: "输入不能超过30个字符" }),
        shopCode: valid({ required: true, max: 30, message: "输入不能超过30个字符" }),
        manager: valid({ required: true, max: 30, message: "输入不能超过30个字符" }),
        managerQrcode: valid({ required: true, max: 100, message: "输入不能超过100个字符" }),
        customerService: valid({ required: true, max: 30, message: "输入不能超过30个字符" }),
        customerServiceQrcode: valid({ required: true, max: 100, message: "输入不能超过100个字符" }),
        themeId: valid({ required: true, max: 32, message: "32" }),
        isDisabled: valid({ required: true })
      },
      model: {},
      errors: {},
      staticData: staticData,
      provinceList: [],
      cityList: [],
      themeList: []
    };
  },
  props: ["record"],
  created() { },
  mounted() {
    this.model = this.record;
    this.errors = {};
    this.loadTheme();
    this.loadProvince();
  },
  methods: {
    save() {
      this.$refs.form.validate(error => {
        if (!error) {
          if (this.model.id) {
            http.put(shop_put + "/" + this.model.id, this.model, data => {
              this.$emit("load");
              this.$emit("cancelEdit");
            })
          } else {
            http.post(shop_post, this.model, data => {
              this.$emit("load");
              this.$emit("cancelEdit");
            })
          }
        }
      });
    },
    loadProvince() {
      http.get(region_get, { parentId: "1" }, response => {
        this.provinceList = response.data;
      })
    },
    loadCity(provinceId) {
      if(!provinceId){
        this.cityList = [];
        return;
      }
      http.get(region_get, { parentId: provinceId }, response => {
        this.cityList = response.data;
      })
    },
    loadTheme() {
      http.get(theme_get, {}, response => {
        this.themeList = response.data;
      })
    },
    selectProvince(item){
      this.model.provinceId = item ? item.regionId : null;
      if(this.model.provinceId){
        this.loadCity(item.regionId);
      } else{
        this.model.cityId = null;
      }
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
