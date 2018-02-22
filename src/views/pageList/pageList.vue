<template>
  <section class="overh">
    <div class="warp-container">
      <div class="warp-operation warp-top overh" id="searchBox">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="点击打开搜索" name="1">
            <el-form :inline="true" :model="form" ref="searchForm">
              <div class="warp-operation warp-top">
                <el-form-item label="姓 名">
                  <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="手 机">
                  <el-input v-model="form.phoneNum"></el-input>
                </el-form-item>
                <el-form-item label="预逾期天数">
                  <el-input v-model="form.overDay"></el-input>
                </el-form-item>
              </div>
              <div class="warp-operation warp-top">
                <el-form-item label="放款时间">
                  <el-date-picker
                    v-model="form.beginOut"
                    type="date"
                    placeholder="开始日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <el-date-picker
                    v-model="form.endOut"
                    type="date"
                    placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="最迟还款时间">
                  <el-date-picker
                    v-model="form.beginIn"
                    type="date"
                    placeholder="开始日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                  <el-date-picker
                    v-model="form.endIn"
                    type="date"
                    placeholder="结束日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd">
                  </el-date-picker>
                </el-form-item>
              </div>
              <div class="warp-operation warp-top">
                <el-form-item label="放款状态">
                  <el-select v-model="form.outState" clearable placeholder="请选择">
                    <el-option label="未放款" value="1"></el-option>
                    <el-option label="已放款" value="2"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="还款状态">
                  <el-select v-model="form.inState" clearable placeholder="请选择">
                    <el-option label="已还款" value="1"></el-option>
                    <el-option label="未还款" value="2"></el-option>
                    <el-option label="未还清" value="3"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="逾期状态">
                  <el-select v-model="form.overState" clearable placeholder="请选择">
                    <el-option label="正常" value="2"></el-option>
                    <el-option label="已逾期" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </div>
              <div class="warp-operation warp-top">
                <el-form-item>
                  <el-date-picker
                    v-model="datetime1"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                  <el-button type="primary" @click="dayBorrowing">今日借款概况</el-button>
                </el-form-item>
                <el-form-item>
                  <el-date-picker
                    v-model="datetime2"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                  <el-button type="primary" @click="dayReimbursement">今日还款概况</el-button>
                </el-form-item>
                <el-form-item>
                  <el-date-picker
                    v-model="datetime3"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                  <el-button type="primary" @click="totalOf">放款总计</el-button>
                </el-form-item>
                <el-form-item>
                  <el-date-picker
                    v-model="datetime4"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                  <el-button type="primary" @click="principalOf">已还本金总计</el-button>
                </el-form-item>
                <el-form-item>
                  <el-date-picker
                    v-model="datetime5"
                    type="date"
                    placeholder="选择日期"
                    format="yyyy 年 MM 月 dd 日"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                  <el-button type="primary" @click="interestOf">已还利息总计</el-button>
                </el-form-item>
              </div>
              <div class="warp-operation warp-top overh">
                <el-button type="primary" icon="el-icon-search" @click="searchSub">搜 索</el-button>
              </div>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="warp-operation warp-top overh">
        <el-button type="primary" icon="el-icon-circle-plus-outline" @click="modify()">新 增</el-button>
        <el-button type="primary" icon="el-icon-tickets" @click="exports('/user/export')">导 出</el-button>
      </div>
    </div>
    <el-col class="warp-container">
      <el-table ref="multipleTable" stripe border class="qhz-table" :data="tableData" v-loading="listLoading" element-loading-text="拼命加载中..." tooltip-effect="dark" style="width: 100%">
        <el-table-column prop="id" label="ID" width="60">
        </el-table-column>
        <el-table-column prop="name" label="姓名" fixed="left" width="90">
          <template slot-scope="scope">
            <el-tag
              close-transition
              :type="scope.row.outState === '1'&& scope.row.inState !== '1'|| scope.row.inState == null?'info':scope.row.outState  === '2' && scope.row.inState === '1'? 'success':'danger'"
            >
              {{scope.row.name}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="phoneNum" label="手机号" width="120">
        </el-table-column>
        <el-table-column prop="bankuser" label="银行卡号" width="160">
        </el-table-column>
        <el-table-column prop="bankname" label="开户行" width="200">
        </el-table-column>
        <el-table-column prop="outMoney" label="借款金额" width="90">
        </el-table-column>
        <el-table-column prop="outMoneyTime" label="借款时间" width="110">
        </el-table-column>
        <el-table-column prop="outState" label="借款状态" width="90">
          <template slot-scope="scope">
            <el-tag
              close-transition
              :type="scope.row.outState==='1'?'info':'danger'"
              >
              {{scope.row.outState === '1' ? '未放款' : '已放款'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="inMoney" label="应还金额" width="90">
        </el-table-column>
        <el-table-column prop="alinmoney" label="已还金额" width="90">
        </el-table-column>
        <el-table-column prop="notinmoney" label="未还金额" width="90">
        </el-table-column>
        <el-table-column prop="accrual" label="已还利息" width="90">
        </el-table-column>
        <el-table-column prop="inMoneyTime" label="最迟还款时间" width="120">
        </el-table-column>
        <el-table-column prop="inMoneyTime2" label="实际还款时间" width="120">
        </el-table-column>
        <el-table-column prop="inState" label="还款状态" width="90">
          <template slot-scope="scope">
            <el-tag
              close-transition
              :type="scope.row.inState  === '2'?'info':scope.row.inState  === '1'?'success':'danger'"
              v-if="scope.row.inState !== null">
              {{scope.row.inState === '2'?'未还':scope.row.inState === '1'?'已还清':scope.row.inState === null?'':'未还清'}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="overstate" label="逾期状态" width="90">
          <template slot-scope="scope">
            <el-tag
              close-transition
              :type="scope.row.overstate  === '1'?'danger':scope.row.overstate  === '2'?'info':''"
              v-if="scope.row.overstate  !== null">
              {{scope.row.overstate  === '1'?'逾期':scope.row.overstate  === '2'?'正常':''}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="overday" label="逾期天数" width="90">
        </el-table-column>
        <el-table-column prop="overRemark" label="逾期备注" width="90">
          <template slot-scope="scope" v-if="scope.row.overRemark !== null">
            <el-popover trigger="hover" placement="top">
              {{scope.row.overRemark}}
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">逾期备注</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="tag" fixed="right" label="操作" width="310" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="modify(scope.$index, scope.row, scope.column)">修 改</el-button>
            <el-button type="primary" size="mini" icon="el-icon-menu" @click="handleEdit(scope.$index, scope.row)">操 作</el-button>
            <el-button type="primary" size="mini" icon="el-icon-edit-outline" @click="note(scope.$index, scope.row)">逾期备注</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[30, 100, 300, 400]"
        :page-size="30"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-col>
    <el-dialog :title="dialogTitle" :visible.sync="modifyVisible" :before-close="closeDialog" size="tiny">
      <el-form ref="modifyForm" :model="modifyForm" :rules="rules" label-width="90px">
        <el-form-item label="用户姓名" prop="name">
          <el-input v-model="modifyForm.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phoneNum">
          <el-input v-model="modifyForm.phoneNum"></el-input>
        </el-form-item>
        <el-form-item label="银行卡号" prop="bankuser">
          <el-input v-model="modifyForm.bankuser"></el-input>
        </el-form-item>
        <el-form-item label="开户行" prop="bankname">
          <el-input v-model="modifyForm.bankname"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="modifySub(tab)" :loading="editLoading">提 交</el-button>
          <el-button @click="cancel('modifyForm')">取 消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="操 作" :visible.sync="operationVisible" :before-close="closeDialog" size="tiny">
        <el-form ref="operationForm" :model="operationForm" :rules="rules" label-width="90px">
          <el-form ref="modifyForm" :model="modifyForm" label-width="90px">
            <el-form-item label="用户姓名" prop="name">
              <el-input v-model="modifyForm.name" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phoneNum">
              <el-input v-model="modifyForm.phoneNum" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="银行卡号" prop="bankuser">
              <el-input v-model="modifyForm.bankuser" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="开户行" prop="bankname">
              <el-input v-model="modifyForm.bankname" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
          <div class="warp-operation warp-top">
            <el-button type="primary" @click="installment">分期</el-button>
            <el-button type="primary" @click="confirmLoan">确认放款</el-button>
            <el-button type="primary" @click="ConfirmReceipt">确认收款</el-button>
            <el-button type="primary" @click="renew">续借</el-button>
          </div>
          <el-dialog
            width="30%"
            title="确认分期"
            :visible.sync="innerVisible1"
            :before-close="closeDialog"
            append-to-body>
            <el-form-item label="分 期" prop="installment">
              <el-input v-model="operationForm.installment"></el-input>
            </el-form-item>
            <div slot="footer" class="dialog-footer">
              <el-button @click="innerCancel">取 消</el-button>
              <el-button type="primary" @click="installmentSub">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog
            width="30%"
            title="确认续借"
            :visible.sync="innerVisible2"
            :before-close="closeDialog"
            append-to-body>
            <el-form-item label="续 借" prop="renew">
              <el-input v-model="operationForm.renew"></el-input>
            </el-form-item>
            <div slot="footer" class="dialog-footer">
              <el-button @click="renewCancel">取 消</el-button>
              <el-button type="primary" @click="renewSub">确 定</el-button>
            </div>
          </el-dialog>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="cancel('operationForm')">取 消</el-button>
        </div>
    </el-dialog>
    <el-dialog
      width="30%"
      title="逾期备注"
      :visible.sync="noteDialog"
      :before-close="closeDialog"
      append-to-body>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="逾期备注"
          v-model="noteNum">
        </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="noteCancel">取 消</el-button>
        <el-button type="primary" @click="noteSub">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    data () {
      var nameRules = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('用户名不能为空'));
        }
      };
      var phoneNumRules = (rule, value, callback) => {
        let gg = /^1[345678]\d{9}$/;
        if(value === ''){
          callback(new Error('用户名不能为空'));
        } else if(!gg.test(value)) {
          callback(new Error('请输入11位手机号码！'));
        }
      };
      var bankuserRules = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('银行卡号不能为空！'));
        }
      };
      var banknameRules = (rule, value, callback) => {
        if(value === ''){
          callback(new Error('开户行不能为空！'));
        }
      };
      return {
        rules: {
          name: [
            {validator:nameRules, trigger: 'blur'}
          ],
          phoneNum: [
            {validator:phoneNumRules}
          ],
          bankuser: [
            {validator:bankuserRules, trigger: 'blur'}
          ],
          bankname: [
            {validator:banknameRules, trigger: 'blur'}
          ]
        },
        listLoading: true, // 列表loading
        editLoading: false, // 按钮loading
        operationVisible: false, // 操作弹出层
        pickerOptions1: {
          disabledDate(time) {
            return time.getTime() > Date.now();
          },
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        }, // 选择日期 包含快捷选择
        tableData: [], // 列表数据
        datetime1: '', // 今日借款概况
        datetime2: '', // 今日还款概况
        datetime3: '', // 放款总计
        datetime4: '', // 已还本金总计
        datetime5: '', // 已还利息总计
        currentPage: 1, // 当前页
        total: 500, // 总条数
        handleSize: 30, // 多少条一页
        modifyVisible: false, // 修改、新增，弹窗
        innerVisible1: false, // 确认分期弹窗
        innerVisible2: false, // 续借弹窗
        noteDialog: false, // 逾期备注弹窗
        noteNum: '',
        operationTitle: '', // 内层弹出框标题
        dialogTitle: '',  // 弹出层标题
        tab: false,  // 修改新建判断
        activeName: '',
        modifyForm: {  // 用户信息数据
          name:'',
          phoneNum: '',
          bankuser: '',
          bankname: ''
        },
        operationForm: {
          id: '',
          installment: '',
          renew: ''
        },
        form: {
          id: '',
          name: '',
          phoneNum: '',
          bankuser:'',
          bankname: '',
          beginOut: '',
          endOut: '',
          outState: '',
          beginIn: '',
          endIn: '',
          overDay: '',
          overState:'',
          inState:'',
          code:1,
          page: this.currentPage,
          rows: this.handleSize
        },
      }
    },
    mounted (){
      this.rqList(1,30)
    },
    methods: {
      handleSizeChange (val) {
        this.handleSize = val
        this.handleCurrentChange(1)
        this.search(this.currentPage, val)
      }, // 分页
      handleCurrentChange (val) {
        this.currentPage = val
        this.search(val, this.handleSize)
      }, // 分页
      search (page, rows) {
        this.listLoading = true
        let parameter = {
          name: this.form.name,
          phoneNum: this.form.phoneNum,
          beginOut: this.form.beginOut,
          endOut: this.form.endOut,
          outState: this.form.outState,
          beginIn: this.form.beginIn,
          endIn: this.form.endIn,
          overDay: this.form.overDay,
          overState:this.form.overState,
          inState: this.form.inState,
          code:1,
          page: page,
          rows: rows
        }
        this.$fetch('/user/findBySelf800', parameter)
          .then(res => {
            this.total = res.total
            this.tableData = res.rows
            this.listLoading = false
          })
      },
      searchSub () {
        this.search(this.currentPage, this.handleSize)
      }, // 搜索
      rqList (page, rows) {
        this.listLoading = false
        this.$fetch('/account800/list',{page:page, rows:rows})
          .then(res => {
            this.total = res.total
            this.tableData = res.rows
            this.listLoading = false
          })

      }, // 列表渲染
      dayBorrowing () {
        this.$fetch('/user/searchOutCount', {datetime: this.datetime1})
          .then(res => {
            if(res.status === 200){
              this.$alert(res.msg, '今日借款概况', {
                dangerouslyUseHTMLString: true
              })
            }
          })

      }, // 今日借款概况
      dayReimbursement () {
        this.$fetch('/user/searchInCoun', {datetime: this.datetime2})
          .then(res => {
            if(res.status === 200){
              this.$alert(res.msg, '今日还款概况', {
                dangerouslyUseHTMLString: true
              })
            }
          })
      }, // 今日还款概况
      totalOf () {
        this.$fetch('/user/accountMoney', {datetime: this.datetime3})
          .then(res => {
            if(res.status === 200){
              this.$alert(res.msg, '放款总计', {
                dangerouslyUseHTMLString: true
              })
            }
          })
      }, // 放款总计
      principalOf () {
        this.$fetch('/user/totalInMoney', {datetime: this.datetime4})
          .then(res => {
            if(res.status === 200){
              this.$alert(res.msg, '已还本金总计', {
                dangerouslyUseHTMLString: true
              })
            }
          })
      }, // 已还本金总计
      interestOf () {
        console.log(this.datetime5)
        this.$fetch('/user/totalAccrual', {datetime: this.datetime5})
          .then(res => {
            if(res.status === 200){
              this.$alert(res.msg, '已还利息总计', {
                dangerouslyUseHTMLString: true
              })
            }
          })
      }, // 已还利息总计
      modifySub (tab) {
        this.editLoading = true
        if(tab){
          let parameter = {
            name: this.modifyForm.name,
            phoneNum: this.modifyForm.phoneNum,
            bankuser: this.modifyForm.bankuser,
            bankname: this.modifyForm.bankname,
          }
          this.editLoading = true
          this.$fetch('/user/save/page',parameter)
            .then(res=>{
              if (res.status === 200){
                this.rqList(1,30)
                this.$message({
                  message: '添加成功！',
                  type: 'success'
                })
                this.modifyVisible = false
                this.editLoading = false
                this.resetStu()
              } else {
                this.$message({
                  message: res.msg,
                  type: 'success'
                })
              }
            })
        }else{
          let parameter = {
            id: this.modifyForm.id,
            name: this.modifyForm.name,
            phoneNum: this.modifyForm.phoneNum,
            bankuser: this.modifyForm.bankuser,
            bankname: this.modifyForm.bankname,
          }
          this.editLoading = true
          this.$fetch('/user/upDate',parameter)
            .then(res=>{
              if(res.status === 200){
                this.tableData.splice(this.table_index, 1, this.modifyForm)
                this.editLoading = false
                this.modifyVisible = false
                this.$message({
                  message: '修改成功！',
                  type: 'success'
                })
                this.resetStu()
              } else {
                this.$message({
                  message: res.msg,
                  type: 'danger'
                })
              }
            })
        }
      }, // 添加修改
      handleEdit (index, row) {
        this.$fetch('/user/findPermission')
          .then(res => {
            if(res.status === 200){
              this.modifyForm = Object.assign({}, row)
              this.operationVisible = true
              this.table_index = index
              this.operationForm.id = row.id
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          })
      }, //  操作
      modify (index, row, column) {
        this.$fetch('/user/findAddAdnEditUserPermission')
          .then(res=>{
            if(res.status === 200) {
              if(index === undefined && row === undefined && column === undefined){
                this.dialogTitle = '新 增'
                this.modifyVisible = true
                this.tab = true
              } else {
                this.modifyVisible = true
                this.modifyForm = Object.assign({}, row)
                this.table_index = index
                this.dialogTitle = '修 改'
                this.tab = false
              }
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          })
      },
      cancel (formName) {
        this.operationVisible = false
        this.modifyVisible = false
        this.resetStu()
        this.$refs[formName].resetFields();
      }, // 取消按钮
      resetStu () {
        this.noteNum = ''
        this.modifyForm = {
          name:'',
          phoneNum: '',
          bankuser: '',
          bankname: ''
        }
        this.operationForm = {
            id: '',
            installment: '',
            renew: ''
        }
      }, // 取消重置表单
      closeDialog (don) {
        this.resetStu()
        don()
      }, // 关闭重置表单
      renew () {
        this.$fetch('/user/findInstateById', {ids: this.operationForm.id})
          .then(res => {
            if (res.status === 200) {
              this.innerVisible2 = true
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          })
      }, // 续借
      renewSub () {
        this.$fetch('/user/accrualEdit', {ids: this.operationForm.id, accrual: this.operationForm.renew})
          .then(res => {
            if (res.status === 200) {
              this.$message({
                message: '续借成功！',
                type: 'success'
              })
              this.renewCancel()
              this.rqList(1,30)
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          })
      }, // 确认续借
      confirmLoan () {
        this.$fetch('/user/findOut/page',{ids: this.operationForm.id})
          .then(res => {
            if(res.status === 200){
              this.$confirm('是否确认给【 '+this.modifyForm.name+' 】用户放款', '确认放款', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$fetch('/user/outMoney/page' ,{ids: this.operationForm.id})
                  .then(res=>{
                    if(res.status === 200){
                      this.$message({
                        message: '放款成功！',
                        type: 'warning'
                      })
                      this.operationVisible = false
                      this.rqList(1,30)
                    }else{
                      this.$message({
                        message: res.msg,
                        type: 'warning'
                      })
                    }
                  })
              }).catch(() => {
                this.$message({
                  message: '已取消放款！',
                  type: 'info'
                })
              })
            } else {
              this.$message({
                message: '该用户已放款',
                type: 'warning'
              })
            }
          })
      }, // 确认放款
      ConfirmReceipt () {
        this.$fetch('/user/findStatus/page', {ids: this.operationForm.id})
          .then(res => {
            if (res.status === 200) {
              this.$confirm('是否确认给【 '+this.modifyForm.name+' 】用户收款', '确认收款', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.$fetch('/user/findIn/page' ,{ids: this.operationForm.id})
                  .then(res=>{
                    if(res.status === 200){
                      this.$fetch('/user/inMoney/page', {ids: this.operationForm.id})
                        .then(res => {
                          if (res.status === 200) {
                            this.$message({
                              type: 'success',
                              message: '收款成功！'
                            })
                            this.operationVisible = false
                            this.rqList(1,30)
                          } else {
                            this.$message({
                              type: 'warning',
                              message: res.msg
                            })
                          }
                        })
                    }else{
                      this.$message({
                        type: 'warning',
                        message: res.msg
                      })
                    }
                  })
              }).catch(() => {
                this.$message({
                  type: 'info',
                  message: '已取消收款！'
                })
              })
            } else {
              this.$message({
                type: 'info',
                message: res.msg
              })
            }
          })
      }, // 确认收款
      installment () {
        this.$fetch('/user/findStatus/page',{ids: this.operationForm.id})
          .then(res => {
            if (res.status !== 200) {
              this.$message({
                message: '该用户未放款！',
                type: 'success'
              })
            } else {
              this.$fetch('/user/findIn/page', {ids: this.operationForm.id})
                .then(res => {
                  if (res.status !== 200) {
                    this.$message({
                      message: '该用户已完成交易！',
                      type: 'warning'
                    })
                  } else {
                    this.innerVisible1 = true
                  }
                })
            }
          })
      }, // 分期
      installmentSub () {
        this.$fetch('/user/upDate/page', {
          ids: this.operationForm.id,
          alinmoney: this.operationForm.installment
        })
          .then(res => {
            if (res.status === 200) {
              this.$message({
                message: '分期成功！',
                type: 'success'
              })
              this.innerCancel()
              this.rqList(1,30)
            } else {
              this.$message({
                message: '分期失败!',
                type: 'warning'
              })
            }
          })
      }, // 分期提交
      note (index, row) {
        this.$fetch('/user/findRemarkPermission')
          .then(res => {
            if(res.status === 200){
              this.noteDialog = true
              this.operationForm = row.id
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          })
      }, // 逾期备注
      noteSub () {
        this.$fetch('/user/findOverStateById',{ids: this.operationForm.id, overRemark: this.noteNum})
          .then(res => {
            if( res.status === 200){
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.noteCancel()
              this.rqList(1,30)
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          })
      }, // 逾期备注提交
      renewCancel () {
        this.innerVisible2 = false
        this.operationForm = {
          renew: ''
        }
      }, // 续借取消按钮
      noteCancel () {
        this.noteDialog = false
        this.noteNum = ''
        this.operationForm = {
          id: ''
        }
      }, // 逾期备注取消
      innerCancel () {
        this.innerVisible1 = false
        this.operationForm = {
          installment: '',
        }
      }, // 分期取消按钮
      exports (e) {
        window.location.href = e
        this.$fetch('/user/findExportPermission')
          .then(res => {
            if(res.status === 200){
              this.$fetch('/user/findExportPermission')
                .then(res => {
                  if (res.status === 200) {
                    window.location.href = e
                  }
                })
            } else {
              this.$message({
                message: res.msg,
                type: 'warning'
              })
            }
          })
      } // 导出
    }
  }
</script>
<style>
</style>
