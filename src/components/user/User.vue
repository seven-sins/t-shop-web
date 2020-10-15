<template>
    <div class="index-container">
    <a-table 
        :columns="columns" 
        :dataSource="dataSource" 
        :pagination="page" 
        @change="changePage" bordered>

        <template slot="operation" slot-scope="text, record, index">
            <span class="row-operation-btn" @click="() => edit(record)">编辑</span>
            <span class="row-operation-btn" @click="() => del(record)">删除</span>
        </template>
    </a-table>
    
    <a-modal :title="modalConf.title" v-model="modalConf.visible" :width="800" :height="800" cancelText="取消" okText="确定"
             :maskClosable="false" destroyOnClose @ok="handleOk" style="top:20px;" :footer="null">
      <Edit ref="userEdit" @closeEdit="closeEdit"/>
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
        columns: [
            {
                title: 'name',
                dataIndex: 'name',
                width: '25%',
                scopedSlots: { customRender: 'name' },
            },
            {
                title: 'age',
                dataIndex: 'age',
                width: '15%',
                scopedSlots: { customRender: 'age' },
            },
            {
                title: 'address',
                dataIndex: 'address',
                width: '40%',
                scopedSlots: { customRender: 'address' },
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                scopedSlots: { customRender: 'operation' },
            },
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
                name: `James ${i}`,
                age: 32,
                address: `London Park no. ${i}`,
            });
        }
    },
    methods: {
        closeEdit(args){
            console.log(args);
        },
        edit(record){
            console.log(record);
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
