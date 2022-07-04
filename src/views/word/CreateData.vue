<template>
  <el-tabs :tab-position="tabPosition">
    <div class="app-container">
      <div class="statistics-layout">
        <div class="layout-title">随机数生成</div>
        <el-alert
          type="success"
          title="成功提示的文案"
          description="这是一句绕口令：黑灰化肥会挥发发灰黑化肥挥发；灰黑化肥会挥发发黑灰化肥发挥。 黑灰化肥会挥发发灰黑化肥黑灰挥发化为灰……"
          show-icon>
        </el-alert>
        <el-row>
          <el-col :span="10">
            <div style="margin-top: 20px;">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="cdata-ruleForm">
                <el-form-item label="随机数个数" prop="name">
                  <el-input style="width: 80%;margin-left: 20px" v-model="ruleForm.name" clearable placeholder="请输入生成随机数的个数"></el-input>
                </el-form-item>
                <el-form-item label="随机数长度" prop="name">
                  <el-input style="width: 80%;margin-left: 20px" v-model="ruleForm.numLength" clearable placeholder="请输入生成随机数的长度"></el-input>
                </el-form-item>
                <el-form-item label="随机数要求" prop="resource">
                  <el-radio-group style="width: 80%;margin-left: 20px" v-model="ruleForm.resource">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">指定要求</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="包含字段值" prop="name" v-if="ruleForm.resource ==1 ">
                  <el-input style="width: 80%;margin-left: 20px" v-model="ruleForm.numName" clearable placeholder="请输入生成随机数中含有字段值"></el-input>
                </el-form-item>
              </el-form>
              <el-button style="width: 30%;margin-left: 10px" type="primary" @click="checkJson()">
                确定
              </el-button>
              <el-button style="width: 30%;margin-left: 10px" type="info" @click="checkJson()">
                复制
              </el-button>
              <el-button style="width: 30%;margin-left: 10px" type="danger" @click="clearConfirm()">
                清空
              </el-button>
            </div>
          </el-col>
          <el-col :span="10">
            <div style="padding: 10px;border-left:1px solid #DCDFE6; width: 600px">
              <el-input
                type="textarea"
                :rows="20"
                placeholder="输出内容"
                v-model="message">
              </el-input>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </el-tabs>
</template>

<script>

export default {
    name: 'JsonFormat',
    data() {
        return {
            tabPosition: 'left',
            message: '',
            ruleForm: {
                name: ''
            }
        }
    },
    rules: {
        name: [
            {required: true, message: '请输入活动名称', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ]
    },
    created() {
    },
    methods: {
        checkJson() {
            if (this.message === '') {
                this.$message.warning('请输入内容')
            } else {
                try {
                    let jsonString = this.message.replace(/\\\\/g, '\\').replace(/\\\"/g, '\"')
                    let jsonObj = JSON.parse(jsonString)
                    this.message = JSON.stringify(jsonObj, null, 6)
                    this.$message.success('JSON格式正确！')
                } catch (error) {
                    console.log('error ->>>>' + error)
                    let errorCode = error.toString().split(' ')
                    console.log('errorCode ->>>>' + errorCode)
                    let errorCodeNum = errorCode[errorCode.length - 1]
                    console.log('errorCodeNum ->>>>' + errorCodeNum)
                    console.log(parseInt(errorCodeNum) + 1)
                    if (errorCodeNum === 'input') {
                        this.$message.error('JSON格式错误！' + '  ' + error.toString())
                    } else {
                        this.$message.error('JSON格式错误,请检查！' + '  ' + this.message.substring(parseInt(errorCodeNum) - 15, parseInt(errorCodeNum) + 30))
                    }
                    //+ error.toString()
                }
            }
        },
        clearConfirm() {
            Object.assign(this.$data, this.$options.data())
        }
    }
}
</script>

<style scoped>
  .app-container {
    margin-top: 10px;
    margin-left: 70px;
    margin-right: 120px;
  }

  .layout-title {
    color: #606266;
    padding: 15px 20px;
    background: #F2F6FC;
    font-weight: bold;
  }

  .statistics-layout {
    margin-top: 20px;
    border: 1px solid #DCDFE6;
  }

</style>
