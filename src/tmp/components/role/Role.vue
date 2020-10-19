<template>
  <a-table :columns="columns" :dataSource="data" :pagination="page" @change="changePage" bordered>
    <template slot="operation" slot-scope="text, record, index">
        <span class="row-operation-btn" @click="() => edit(record)">编辑</span>
        <span class="row-operation-btn" @click="() => del(record)">删除</span>
    </template>
  </a-table>
</template>

<script>
import http from "@/utils/http";
import { onMounted, onUnmounted, reactive } from "@vue/composition-api";
export default {
  name: "Home",
  components: {
    
  }, 
  setup(props, context){
    const columns = reactive([
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
    ]);

    //分页数据
    const page = reactive({
        total: 0,
        pageSize: 20,
        current: 1,
        size: 'big',
        showSizeChanger: false,
        showQuickJumper: false,
        pageSizeOptions: ['5', '10', '20'],
        showTotal: (tot, i) => {
            let pageSize = page.pageSize
            let nowPage = tot
            return `共 ${nowPage} 条记录 第${page.current}/${Math.ceil(tot / pageSize)}页`
        }
    })

    const data = reactive([]);
    for (let i = 0; i < 100; i++) {
        data.push({
            key: i.toString(),
            name: `Alon ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        });
    }

    const test = () => {
      http.post("/rest/admin/gbShop");
    }
    const edit = (record) => {
        console.log(record)
    }
    const del = (record) => {
        console.log(record)
    }
    const handleChange = () => {

    }
    const changePage = (pageParam) => {
        page.current = pageParam.current;
    }

    onMounted(() => {

    })

    onUnmounted(() => {
      
    })

    return {
      columns,
      page,
      data,
      edit,
      del,
      handleChange,
      changePage
    }
  }
};
</script>
<style lang="scss" scoped>


  

</style>
