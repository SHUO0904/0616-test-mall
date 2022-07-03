<template>
  <el-tabs :tab-position="tabPosition">
    <el-tab-pane label="在线字数统计">
      <WordStatistics/>
    </el-tab-pane>
    <el-tab-pane label="JSON格式化">
      <JsonFormat/>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import WordStatistics from './WordStatistics'
import JsonFormat from './JsonFormat'

export default {
    name: 'home',
    components: {
        WordStatistics,
        JsonFormat
    },
    data() {
        return {
            tabPosition: 'left'
        }
    },
    created() {
        this.initOrderCountDate()
        this.getData()
    },
    methods: {
        handleDateChange() {
            this.getData()
        },
        getData() {

        }
    }
}
</script>

<style scoped>

</style>
