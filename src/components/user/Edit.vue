<template>
    <a-form
        :model="user" 
        :label-col="conf.labelCol" 
        :wrapper-col="conf.wrapperCol"
        :form="form1"
        >
        <a-row type="flex" :gutter="24">
            <a-col :span="12">
                <a-form-item label="用户编码:">
                    <a-input v-decorator="['user.userCode', rules.userCode]"  />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="用户名:">
                    <a-input v-model="user.userName" />
                </a-form-item>
            </a-col>
        </a-row>
        
        <a-row type="flex" :gutter="24">
            <a-col :span="12">
                <a-form-item label="登录账号:">
                    <a-input v-model="user.loginAccount" />
                </a-form-item>
            </a-col>
            <a-col :span="12">
                <a-form-item label="手机号">
                    <a-input v-model="user.phone" />
                </a-form-item>
            </a-col>
        </a-row>

        <a-row type="flex" :gutter="24">
            <a-col :span="12">
                <a-form-item label="身份证号">
                    <a-input v-model="user.phone" />
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
        </a-row>

        
        
        <a-button type="primary" @click="handleSubmit">
            Primary
        </a-button>
        
    </a-form>
 


  
      
 
</template>

<script>

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
        user: {sex: "0"},
        form1: this.$form.createForm(this),
        rules: {
            userCode: { rules: [{required: true, message: "用户编码不能为空"}]}
        }
    }
  },
  props: {

  },
  created(){

  },
  mounted(){

  },
  methods: {
    edit(record){
        console.log(record);
    },
    handleSubmit(){
        this.$emit("closeEdit", 123);
        //
        this.form1.validateFields((err, values) => {
            if (err) {
                console.log(err);
            }
        });
    }
  }
};
</script>
<style lang="scss" scoped>


  

</style>
