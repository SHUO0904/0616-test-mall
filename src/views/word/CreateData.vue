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
                  <el-input style="width: 80%;margin-left: 1px" v-model="ruleForm.dataNumber" clearable
                            placeholder="请输入生成随机数的个数"></el-input>
                </el-form-item>
                <el-form-item label="随机数长度" prop="dataLength">
                  <el-input style="width: 80%;margin-left: 1px" v-model="ruleForm.dataLength" clearable
                            placeholder="请输入生成随机数的长度"></el-input>
                </el-form-item>
                <el-form-item label="随机数要求" prop="dataResource">
                  <el-radio-group style="width: 80%;margin-left: 1px" v-model="ruleForm.dataResource">
                    <el-radio label="0">无</el-radio>
                    <el-radio label="1">包含字段值</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item label="字段值" prop="dataName" v-if="ruleForm.dataResource ==1 ">
                  <el-input style="width: 80%;margin-left: 1px" v-model="ruleForm.dataName" clearable
                            placeholder="请输入字段值"></el-input>
                </el-form-item>
                <el-button style="width: 30%;margin-left: 5px" type="primary" @click="submitForm('ruleForm')">
                  确定
                </el-button>
                <el-button style="width: 30%;margin-left: 5px" type="info" @click="copyData()">
                  复制
                </el-button>
                <el-button style="width: 30%;margin-left: 5px" type="danger" @click="clearConfirm()">
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
                    dataLength: '',
                    dataResource: '',
                    dataName: ''
                },
                rules: {
                    dataNumber: [
                        {required: true, message: '请输入随机数个数', trigger: 'blur'},
                        {pattern: /^(1|[1-9]\d?|1000)$/, message: '范围在1-1000', trigger: 'blur'}
                    ],
                    dataLength: [
                        {required: true, message: '请输入随机数长度', trigger: 'blur'},
                        {pattern: /^([2-9]|1[0-7]|17)$/, message: '范围在2-17', trigger: 'blur'}
                    ],
                    dataResource: [
                        {required: true, message: '请选择随机数要求', trigger: 'change'}
                    ],
                    dataName: [
                        {required: false, message: '请输入包含的字段值', trigger: 'blur'},
                        {pattern: /([a-zA-Z]|[0-9])/, message: '只支持数字或字母', trigger: 'blur'},
                        {min: 2, max: 5, message: '长度范围在2-5', trigger: 'blur'}

                    ]
                }
            }
        },

        created() {
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        try {
                            let res = []
                            let dataNumber = this.ruleForm.dataNumber
                            let dataLength = this.ruleForm.dataLength
                            // alert('submit!'+this.ruleForm.dataNumber);
                            for (let i = 0; i < dataNumber; i++) {
                                let num = this.getRandomNumbers(dataLength)
                                res = res + num + '\n'
                            }
                            this.message = res
                            this.$notify({
                                title: '成功',
                                message: '生成随机数成功',
                                type: 'success'
                            })
                        } catch (e) {
                            console.log(e);
                            // this.$notify({
                            //     title: '错误',
                            //     message: '生成随机数失败' + e,
                            //     type: 'error'
                            // })
                        }

                    } else {
                        console.log('error submit!!')
                        return false
                    }
                })
            },
            //生成随机数的个数，最小值，最大值，是否包含特定的值在内
            getRandomNumbers(length) {
                let chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
                    'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p',
                    'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
                let res = ''
                let leng = ''
                if (this.ruleForm.dataResource == 1) {
                    let w = this.ruleForm.dataName.length
                    if (w < length) {
                        leng = length - w
                    } else {
                        this.$notify({
                            title: '错误',
                            message: '包含字段值长度必须要小于随机数长度，请核对！',
                            type: 'error'
                        });
                        throw SyntaxError();
                    }
                } else {
                    leng = length
                }
                console.log('字符长度为', leng)
                for (let ii = 0; ii < leng; ii++) {
                    let id = Math.floor(Math.random() * 48)
                    res += chars[id]
                }
                if (this.ruleForm.dataResource == 1) {
                    res = this.ruleForm.dataName + res
                }
                return res

            },
            //复制
            copyData() {
                this.copyBoard(this.message)
            },
            copyString(string) {
                if (!string) {
                    this.$notify({
                        title: '错误',
                        message: '请先点击生成随机数',
                        type: 'error'
                    })
                    // throw new Error('随机数为空')
                } else {
                    let dom = document.createElement('input')
                    dom.value = string
                    document.body.appendChild(dom)
                    dom.select() // 选择对象
                    document.execCommand('Copy') // 执行浏览器复制命令
                    document.body.removeChild(dom)
                    this.$notify({
                        title: '成功',
                        message: '内容已复制到剪切板',
                        type: 'success'
                    })
                }
            },
            copyBoard(string){
                this.$copyText(string).then(
                    res => {
                        this.$notify({
                            title: '成功',
                            message: '复制成功',
                            type: 'success'
                        })
                    },
                    err => {
                        this.$notify({
                            title: '成功',
                            message: '复制失败，请手动复制！',
                            type: 'error'
                        })
                    }
                );
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
