<template>
    <a-form
        :label-col="conf.labelCol" 
        :wrapper-col="conf.wrapperCol"
        :form="form1"
        >
        <a-row type="flex" :gutter="24">
            <a-col :span="12">
                <a-form-item label="用户名:">
                    <a-input v-decorator="['user.userName', rules.userName]" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="用户编码:">
                    <a-input v-decorator="['user.userCode', rules.userCode]"  />
                </a-form-item>
            </a-col>
        </a-row>
        
        <a-row type="flex" :gutter="24">
            <a-col :span="12">
                <a-form-item label="登录账号:">
                    <a-input v-decorator="['user.loginAccount', rules.loginAccount]"  />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="手机号">
                    <a-input v-decorator="['user.phone', rules.phone]" />
                </a-form-item>
            </a-col>
        </a-row>

        <a-row type="flex" :gutter="24">
            <a-col :span="12">
                <a-form-item label="身份证号">
                    <a-input v-decorator="['user.idCard', rules.idCard]" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="性别">
                    <a-radio-group default-value="1" v-model="user.sex">
                        <a-radio-button value="1">
                            男
                        </a-radio-button>
                        <a-radio-button value="0">
                            女
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </a-col>
        </a-row>
        
        <a-row type="flex" :gutter="24">
            <a-col :span="12">
                <a-form-item label="生日">
                    <a-date-picker :format="conf.dateFormat" placeholder="请选择" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="是否系统用户">
                    <a-radio-group default-value="1" v-model="user.isSysUser">
                        <a-radio-button value="1">
                            是
                        </a-radio-button>
                        <a-radio-button value="0">
                            否
                        </a-radio-button>
                    </a-radio-group>
                </a-form-item>
            </a-col>
        </a-row>
        
        <p class="t-toolbar">
             <a-button type="primary" @click="handleSubmit">
                提交
            </a-button>
            <a-button @click="handleCancel">
                取消
            </a-button>
        </p>
       
        
    </a-form>
 


  
      
 
</template>

<script>
import http from "@/utils/http";
import { user_add_post } from "@/utils/urls";
export default {
  name: "UserEdit",
  components: {
    
  }, 
  data(){
    return {
        conf: {
            labelCol: { span: 6 },
            wrapperCol: { span: 12 },
            dateFormat: 'YYYY-MM-DD'
        },
        form1: this.$form.createForm(this),
        rules: {
            userCode: { rules: [{required: true, message: "用户编码不能为空"}, {max: 18, message: "最多允许输入18个字符"}]},
            userName: { rules: [{required: true, message: "用户名不能为空"}, {max: 18, message: "最多允许输入18个字符"}]},
            loginAccount: { rules: [{required: true, message: "登录账号不能为空"}, {max: 18, message: "最多允许输入18个字符"}]},
            phone: { rules: [{max: 11, message: "最多允许输入11个字符"}]},
            idCard: { rules: [{max: 18, message: "最多允许输入18个字符"}]},
        },
        user: this.record
    }
  },
  props: ["record"],
  created(){

  },
  mounted(){
      console.log(this.user);
  },
  methods: {
    handleSubmit(){
        console.log(this);
        
        this.form1.validateFields((err, values) => {
            if (!err) {
                http.post(user_add_post, user);
            }
        });
    },
    handleCancel(){
        this.$emit("closeEdit");
    }
  }
};
</script>
<style lang="scss" scoped>


  

</style>
