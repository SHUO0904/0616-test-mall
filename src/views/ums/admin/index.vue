<template>
  <div class="app-container">
    <el-card class:"filter-container" shadow = "never">
    <div>
    <i class="el-icon-search"></i>
      <span> 筛选搜索</span>
      <el-button
        style="float:right"
        type="primary"
        @click="handleSearchList()"
        size="small">
        查询搜索
      </el-button>
      <el-button
        style="float:right;margin-right: 15px"
        @click="handleResetSearch()"
        size="samll">
        重置
      </el-button>
    </div>
    <div style="margin-top: 15px">
      <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
        <el-form-item label="输入搜索：">
            <el-input v-model="listQuery.keyword" class="input-width" placheholder="账号/姓名" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>


    </el-card>
  </div>

</template>

<script>
export default {
    name: ''
}
</script>

<style scoped>

</style>
