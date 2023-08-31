<template>
  <el-dialog
    title="详细信息"
    :visible.sync="dialogVisible"
    width="50%"
    top="10vh"
    @close="close">
    <div class="box">
      <div v-for="item in columns" :key="item.key" class="item">
        <div class="label">{{ item.label }} :</div>
        <div class="content">
          <json-viewer
            v-if="useJsonViewer(item.key)"
            :value="data[item.key] | jsonParse"
            :expand-depth="5"
            copyable
            boxed></json-viewer>
          <span v-else>{{ data[item.key] }}</span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'LogDetail',
  filters: {
    jsonParse(val) {
      return JSON.parse(val)
    },
  },
  data() {
    return {
      dialogVisible: false,
      columns: [],
      data: {},
    }
  },
  methods: {
    show(data, columns) {
      this.dialogVisible = true
      this.data = data
      columns.splice(0, 1)
      this.columns = columns
    },
    useJsonViewer(key) {
      return key == 'result' || key == 'query' || key == 'body'
    },
    close() {
      this.data = {}
      this.columns = []
    },
  },
}
</script>
<style scoped lang="less">
.box {
  max-height: 60vh;
  overflow: scroll;
  padding: 0 16px 0 0;
}
.item {
  display: flex;
  flex-direction: row;
  padding: 16px 0;
}
.label {
  width: 85px;
  text-align: right;
  margin-right: 8px;
}
.content {
  flex: 1;
}
</style>
