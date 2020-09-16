<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="(item, index) in menuTab"
          :key="index"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >{{ item.txt }}</li>
      </ul>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
        class="demo-ruleForm"
      >
        <el-form-item label="邮箱" prop="username" class="form-item">
          <el-input type="text" v-model="ruleForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="form-item">
          <el-input type="password" v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="repassword" class="form-item" v-show="model==='register'">
          <el-input type="password" v-model="ruleForm.repassword"></el-input>
        </el-form-item>
        <el-row>
          <el-form-item label="验证码" prop="code" class="form-item codes">
            <el-col :span="12">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="2">
              <span style="opacity: 0;">1</span>
            </el-col>
            <el-col :span="10">
              <el-button class="block" type="success" @click="getSms()" :disabled="codeBtn.codeStatus">{{ codeBtn.codetxt }}</el-button>
            </el-col>
          </el-form-item>
        </el-row>
        <el-form-item class="btn-item">
          <el-button type="primary" @click="submitForm('ruleForm')" class="block" :disabled="btnStatus">{{ model === 'login' ? '登录' : '注册'}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
// 引入vue3.0需要的
import { reactive, ref, isRef, toRefs, onMounted } from "@vue/composition-api";
// 引入自定义的校验规则
import {
  stripscript,
  emailValidate,
  passValidate,
  codeValidate
} from "@/utils/validate";
// 引入api接口
import { GetSms, Login, Register } from "@/api/login";
import sha1 from "sha1";

export default {
  name: "login",
  // setup(props, context) {
  setup(props, { refs, root }) {
    /**
     * props 是父子组件传值的问题 context是vue2中的一些东西 context.refs
     */
    // 1表单数据对象
    const ruleForm = reactive({
      username: "",
      password: "",
      repassword: "",
      code: ""
    });
    // 滑动tab数据
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    // 声明login类型
    const model = ref("login");
    // 按钮状态
    const btnStatus = ref(true);
    // 验证码按钮
    const codeBtn = reactive({
      codeStatus: false,
      codetxt: '获取验证码'
    })
    // 存储倒计时变量
    const timer = ref(null);
    /**
     * 2验证规则
     */
    // 验证用户名
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("用户名不能为空"));
      } else if (!emailValidate(value)) {
        callback(new Error("用户名格式有误"));
      } else {
        callback();
      }
    };
    // 验证密码
    const validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("密码不能为空"));
      } else if (!passValidate(value)) {
        callback(new Error("密码为6到16位数字字母组合"));
      } else {
        callback();
      }
    };
    // 验证验证码
    const validateCode = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("验证码不能为空"));
      } else if (!codeValidate(value)) {
        callback(new Error("验证码必须是满足6位字符"));
      } else {
        callback();
      }
    };
    // 验证确认密码
    const validateRepassword = (rule, value, callback) => {
      if(model.value === 'login') {
        callback();
      }
      // 过滤后的数据
      ruleForm.repassword = stripscript(value);
      value = ruleForm.repassword;
      if (value === "") {
        callback(new Error("确认密码不能为空"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    // 点击切换事件
    const toggleMenu = (data => {
      // console.log(data)
      // 置为false作用是点击时第一个true当点第二个时第一个不会保持高亮
      menuTab.forEach(elem => {
        elem.current = false
      })
      data.current = true
      model.value = data.type
      // 重置表单
      refs.ruleForm.resetFields();
      // 清除倒计时
      codeBtn.codeStatus = false;
      codeBtn.codetxt = "获取验证码";
      clearInterval(timer.value);
      btnStatus.value = true;
    })
    
    // 3规则数据对象
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      repassword: [{ validator: validateRepassword, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });

    // 提交事件
    /**
     * refs的检验要成功 必须是每个if elseif else 有callback 自定义规则没毛病
     */
    const submitForm = (formName => {
      refs[formName].validate((valid) => {
        if(valid) {
          // console.log("OK")
          if(model.value === 'login') {
            login();
          } else {
            register();
          }
        }else {
          return false;
        }
      })
      // if(model.value === 'login') {
      //   console.log(111)
      // }else {
      //   console.log(222)
      // }
    })
    /**
     * 接口实现操作
     */
    // 获取验证码
    const getSms = () => {
      if(ruleForm.username === "") {
        root.$message.error("用户名不能为空哦！");
        return false;
      }
      if(!emailValidate(ruleForm.username)) {
        root.$message.error("用户名格式错误！");
        return false;
      }
      let data = {
        username: ruleForm.username,
        module: model.value
      }
      codeBtn.codeStatus = true;
      codeBtn.codetxt = "发送中"
      GetSms(data).then(response => {
        let data = response.data
        // console.log(data)
        root.$message({
          message: data.message,
          type: "success"
        })
        // 启用登录或注册按钮
        btnStatus.value = false;
        countDown(30);
      }).catch(error => {
        console.log(error)
      })
    };
    // 登录实现
    const login = () => {
      let data = {
        username: ruleForm.username,
        password: ruleForm.password,
        code: ruleForm.code
      }
      root.$store.dispatch("login/login",data).then(response => {
        // 页面跳转
        root.$router.push({
          name: "Console"
        })
      }).catch(error => {
        console.log(error)
      })
    }
    // 注册实现
    const register = () => {
      let data = {
        username: ruleForm.username,
        password: ruleForm.password,
        code: ruleForm.code
      }
      Register(data).then(response => {
        // console.log(response)
        let resData = response.data
        root.$message({
          message: resData.message,
          type: "success"
        })
        toggleMenu(menuTab[0]);
        codeBtn.codeStatus = false;
        codeBtn.codetxt = "获取验证码";
        clearInterval(timer.value);
      }).catch(error => {
        console.log(error);
      })
    }
    // 倒计时定时器
    const countDown = ((number) => {
      if(timer.value) {
        clearInterval(timer.value)
      }
      let time = number
      timer.value = setInterval(() => {
        time--;
        if(time === 0) {
          clearInterval(timer.value);
          codeBtn.codeStatus = false;
          codeBtn.codetxt = "再次获取"
        } else {
          codeBtn.codetxt = `倒计时(${time})秒`
        }
      },1000)
    });
    

    return {
      // 数据
      ruleForm,
      rules,
      menuTab,
      model,
      btnStatus,
      codeBtn,
      timer,
      // 方法(方法如果是函数内部之间的调用就不用return若是在模板里面调用的话就return)
      submitForm,
      toggleMenu,
      getSms
    };
  }
};
</script>
<style lang="scss" scoped>
#login {
  width: 420px;
  margin: 50px auto;
  border: 2px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 5px;
}
.login-wrap {
  width: 350px;
}
.demo-ruleForm {
  margin-top: 28px;
  text-align: center;
}
.form-item {
  margin-bottom: 18px;
}
.block {
  display: block;
  width: 100%;
}
.menu-tab {
  display: flex;
  justify-content: center;
  li {
    width: 88px;
    font-size: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    line-height: 48px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>
