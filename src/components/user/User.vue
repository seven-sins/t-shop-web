<template>
  <a-table :columns="columns" :data-source="data" :pagination="page" @change="changePage" bordered>
    <template
      v-for="col in ['name', 'age', 'address']"
      :slot="col"
      slot-scope="text, record, index"
    >
      <div :key="col">
        <a-input
          v-if="record.editable"
          style="margin: -5px 0"
          :value="text"
          @change="e => handleChange(e.target.value, record.key, col)"
        />
        <template v-else>
          {{ text }}
        </template>
      </div>
    </template>
    <template slot="operation" slot-scope="text, record, index">
      <div class="editable-row-operations">
        <span v-if="record.editable">
          <a @click="() => save(record.key)">Save</a>
          <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
            <a>Cancel</a>
          </a-popconfirm>
        </span>
        <span v-else>
          <a>Edit</a>
        </span>
      </div>
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
            name: `James ${i}`,
            age: 32,
            address: `London Park no. ${i}`,
        });
    }
    console.log(data);

    const test = () => {
      http.post("/rest/admin/gbShop");
    }
    const handleOpen = () => {

    }
    const handleClose = () => {

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
      handleOpen,
      handleClose,
      handleChange,
      changePage
    }
  }
};
</script>
<style lang="scss" scoped>


  

</style>
