<template>
    <div class="index-container">
    <a-table 
        :columns="columns" 
        :dataSource="dataSource" 
        :pagination="page" 
        :scroll="{ x: 1500 }"
        @change="changePage" bordered>

        <template slot="operation" slot-scope="text, record">
            <span class="row-operation-btn" @click="() => edit(record)">编辑</span>
            <span class="row-operation-btn" @click="() => del(record)">删除</span>
        </template>
    </a-table>
    
    <a-modal 
        :title="modalConf.title" 
        v-model="modalConf.visible" 
        :width="800" 
        :height="600"
        :maskClosable="false" 
        destroyOnClose 
        @ok="handleOk" centered :footer="null">
      <Edit ref="userEdit" :record="record" @closeEdit="closeEdit"/>
    </a-modal>

  </div>
</template>

<script>
import http from "@/utils/http";
import Edit from "./Edit";

export default {
    name: "Home",
    components: {
        Edit
    }, 
    data(){
      return {
        modalConf: {
            visible: false,
            title: "编辑"
        },
        record: {},
        columns: [
            {
                title: '用户名',
                dataIndex: 'userName',
                width: 150
            },
            {
                title: '用户编码',
                dataIndex: 'userCode',
                width: 150
            },
            {
                title: '登录账号',
                dataIndex: 'loginAccount',
                width: 150
            },
            {
                title: '手机号',
                dataIndex: 'phone',
                width: 150
            },
            {
                title: '生日',
                dataIndex: 'birthday',
                width: 150
            },
            {
                title: '性别',
                dataIndex: 'sex',
                width: 100
            },
            {
                title: '是否系统用户',
                dataIndex: 'isSysUser'
            }
        ],
        dataSource: [],
        page: {
            total: 0,
            pageSize: 20,
            current: 1,
            size: 'big',
            showSizeChanger: false,
            showQuickJumper: false,
            pageSizeOptions: ['5', '10', '20'],
            showTotal: (tot, i) => {
                let pageSize = this.page.pageSize
                let nowPage = tot
                return `共 ${nowPage} 条记录 第${this.page.current}/${Math.ceil(tot / pageSize)}页`
            }
        },
      }
    },
    props: {

    },
    created(){

    },
    mounted(){
        let _this = this;
        for (let i = 0; i < 100; i++) {
            _this.dataSource.push({
                key: i.toString(),
                userName: `James ${i}`,
                age: 32,
                address: `London Park no. ${i}`,
            });
        }
    },
    methods: {
        closeEdit(args){
            this.modalConf.visible = false;
        },
        edit(record){
            this.record = record;
            this.modalConf.visible = true;
        },
        del(record){
            console.log(record)
        },
        handleChange(){

        },
        changePage(pageParam){
            this.page.current = pageParam.current;
        },
        handleOk(){

        }
    }
};
</script>
<style lang="scss" scoped>


  

</style>
