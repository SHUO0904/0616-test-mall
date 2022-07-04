<template>
  <el-tabs :tab-position="tabPosition">
    <div class="app-container">
      <div class="statistics-layout">
        <div class="layout-title">随机数生成</div>
        <el-alert
          type="success"
          title="随机生成数据，若无指定，则随机生成字符+数字组成的数据。"
          description=" "
          >
        </el-alert>
        <el-row>
          <el-col :span="8">
            <div style="margin-top: 20px;">
              <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="cdata-ruleForm">
                <el-form-item label="随机数个数" prop="dataNumber">
                  <el-input style="width: 80%;margin-left: 1px" v-model="ruleForm.dataNumber" clearable placeholder="请输入生成随机数的个数"></el-input>
                </el-form-item>
                <el-form-item label="随机数长度" prop="dataLength">
                  <el-input style="width: 80%;margin-left: 1px" v-model="ruleForm.dataLength" clearable placeholder="请输入生成随机数的长度"></el-input>
                </el-form-item>
                <el-form-item label="随机数要求" prop="dataResource">
                  <el-radio-group style="width: 80%;margin-left: 1px" v-model="ruleForm.dataResource">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">包含字段值</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="字段值" prop="dataName" v-if="ruleForm.dataResource ==1 ">
                  <el-input style="width: 80%;margin-left: 1px" v-model="ruleForm.dataName" clearable placeholder="请输入生成随机数中含有字段值"></el-input>
                </el-form-item>
              <el-button style="width: 30%;margin-left: 10px" type="primary" @click="submitForm('ruleForm')">
                确定
              </el-button>
              <el-button style="width: 30%;margin-left: 10px" type="info" @click="copyData()">
                复制
              </el-button>
              <el-button style="width: 30%;margin-left: 10px" type="danger" @click="clearConfirm()">
                清空
              </el-button>
              </el-form>
            </div>
          </el-col>
          <el-col :span="16">
            <div style=" padding: 10px;border-left:1px solid #DCDFE6">
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
    name: 'CrateData',
    data() {
        return {
            tabPosition: 'left',
            message: '',
            ruleForm: {
                dataNumber: '',
                dataLength:'',
                dataResource:'',
                dataName:''
            },
            rules: {
                dataNumber: [
                    {required: true,message: '请输入随机数个数', trigger: 'blur'},
                    {pattern:/^(1|[1-9]\d?|1000)$/,message: '范围在1-1000', trigger: 'blur'}
                ],
                dataLength: [
                    {required: true, message: '请输入随机数长度', trigger: 'blur'},
                    {pattern:/^(2|[2-9]\d?|17)$/, message: '范围在2-17', trigger: 'blur'}
                ],
                dataResource: [
                    { required: true, message: '请选择随机数要求', trigger: 'change' }
                ],
                dataName: [
                    {required: false, message: '请输入包含的字段值', trigger: 'blur'},
                    {pattern: /([a-zA-Z]|[0-9])/, message: '只支持数字或字母', trigger: 'blur'},
                    {min:2,max:5, message: '长度范围在2-5', trigger: 'blur'}

                ],
            }
        }
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
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    console.log(formName);
                    alert('submit!');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
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
