<template>
  <div id="login">
    <el-card style="max-width: 480px" class="mycard">
      <template #header>
        <div class="card-header">
          <span>体检报告管理系统</span>
        </div>
      </template>
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <div v-if="formType === 'login'">
          <el-form-item label="账号">
            <el-input v-model="form.docIdOrCode" placeholder="请输入编号或手机号">
              <template #prefix>
                <i class="fa fa-user"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="loginType == 'password'" label="密码">
            <el-input type="password" v-model="form.password" placeholder="请输入密码">
              <template #prefix>
                <i class="fa fa-lock"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item v-if="loginType === 'code'" label="验证码">
            <div style="display: flex; align-items: center;">
              <el-input v-model="form.code" placeholder="请输入验证码"
                style="flex-grow: 1; margin-right: 8px;border: none;outline: none;">
                <template #prefix>
                  <i class="fa fa-lock"></i>
                </template>
                <template #suffix>

                  <span v-if="!isCountingDown" @click="sendCode" style="cursor: pointer;color: darkkhaki;">获取验证码</span>
                  <span v-else style="color:brown;">{{ countdown }} 秒后重新发送</span>
                </template>
              </el-input>
            </div>
          </el-form-item>

          <div style="display: flex; justify-content: space-between;">
            <el-form-item>
              <el-button type="primary" @click="changeLoginType">
                {{ loginType == 'password' ? '验证码登录' : '密码登录' }}
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSubmit">登录</el-button>
            </el-form-item>

          </div>
        </div>
        <div v-if="formType == 'forget'">
          <el-form-item label="账号">
            <el-input v-model="formForget.docId" placeholder="请输入手机号">
              <template #prefix>
                <i class="fa fa-user"></i>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <div style="display: flex; align-items: center;">
              <el-input v-model="formForget.code" placeholder="请输入验证码"
                style="flex-grow: 1; margin-right: 8px;border: none;outline: none;">
                <template #prefix>
                  <i class="fa fa-lock"></i>
                </template>
                <template #suffix>

                  <span v-if="!isCountingDown" @click="sendCodeInForget" style="cursor: pointer;color: darkkhaki;">获取验证码</span>
                  <span v-else style="color:brown;">{{ countdown }} 秒后重新发送</span>
                 
                </template>
              </el-input>
           
            </div>
      
          </el-form-item>
          <el-form-item label="新密码">
              <el-input type="password" v-model="formForget.password" placeholder="请输入新密码"></el-input>
             
             </el-form-item>
             <el-form-item label="确认密码">
              <el-input type="password" v-model="formForget.repeatPassword" placeholder="请确认密码"></el-input>
             
             </el-form-item>
             <el-form-item > 
              <el-button type="primary" @click="onForgetSubmit" style="position: absolute; right: 0;">提交</el-button>
             </el-form-item>
        </div>
        <div style="text-align: auto; ">
          <span v-if="formType == 'login'" @click="forgetPassword"
            style="color:darkorange; font-size: 12px; ">忘记密码？</span>
          <span v-else @click="returnLogin" style="color:darkorange; font-size: 12px; ">返回登录</span>
        </div>
      </el-form>
      <template #footer>熙康-版权所有</template>
    </el-card>
  </div>
</template>

<script setup>


import { ref, reactive } from 'vue'
import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router';
import { setLocalStorage, setSessionStorage } from '@/common';
const formType = ref('login') // 表单类型
const countdown = ref(60); // 验证码倒计时秒数
//是否在倒计时
const isCountingDown = ref(false);
const loginType = ref('password')
const form = reactive({
  docIdOrCode: '',
  password: '',
  code: ''
})

const formForget = reactive({
  docId: '',
  code: '',
  password: '',
  repeatPassword: ''
})
const forgetPassword = () => {
  formType.value = 'forget'
  form.docIdOrCode = ''
  form.code = ''
  form.password = ''
}
const returnLogin = () => {
  formType.value = 'login'
  formForget.docId = ''
  formForget.code = ''
  formForget.password = ''
}
//发送验证码的倒计时
const startCountdown = () => {
  if (isCountingDown.value) return; // 如果已经在倒计时中，则不做任何操作
  isCountingDown.value = true;
  countdown.value = '60'; // 重置倒计时秒数
  setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1;
    } else {
      isCountingDown.value = false; // 倒计时结束
      clearInterval(interval); // 清除定时器
    }
  }, 1000);
}
const changeLoginType = () => {
  loginType.value = loginType.value == 'password' ? 'code' : 'password'
}
const onForgetSubmit = () => {
  if (formForget.docId.trim() == '' || formForget.code.trim() == '' || formForget.password.trim() == '' || formForget.repeatPassword.trim() == '') {
    ElMessage(
      {
        message: "账号或验证码或密码不能为空",
        type: "error"
      }
    )
    return
  }
  if (formForget.password.trim() != formForget.repeatPassword.trim()) {
    ElMessage(
      {
        message: "两次密码输入不一致",
        type: "error"
      }
    )
    return
  }
  axios(
    {
      method: 'post',
      url: '/api/doctor/updatePassword',
      data: {
        docId: formForget.docId,
        code: formForget.code,
        password: formForget.password
      }
    }
  ).then(res => {
    if (res.data.code == 1) {
      ElMessage(
        {
          message: "密码修改成功，请重新登录",
          type: "success"
        }
      )
      formType.value = 'login'
    } else {
      ElMessage(
        {
          message: res.data.message,
          type: "error"
}
      )}
  }).catch(err => {
    ElMessage(
      {
        message: err.message,
        type: "error"
      }
    )
  })
}
const sendCode = () => {

  if (form.docIdOrCode.trim() == ''){
    ElMessage(
      {
        message: "账号不能为空",
        type: "error"
      })
    return
  }
  axios(
    {
      method: 'get',
      url: '/api/doctor/sendCode' ,
      params:{
       docId: form.docIdOrCode.trim(),
        type: 2
      }
    }
  ).then(res => {
    if (res.data.code == 1) {
      startCountdown();
      ElMessage(
        {
          message: "验证码发送成功",
          type: "success"
        }
      )
    } else {
      ElMessage(
        {
          message: res.data.message,
          type: "error"
        }
      )
    }
  }
  ).catch(err => {
    ElMessage(
      {
        message: err.message,
        type: "error"
      }
    )
  }
  )

}
const sendCodeInForget = () => {

if (formForget.docId.trim() == ''){
  ElMessage(
    {
      message: "账号不能为空",
      type: "error"
    })
  return
}
axios(
  {
    method: 'get',
    url: '/api/doctor/sendCode',
    params:{
        docId: formForget.docId.trim(),
        type: 1
      }
  }
).then(res => {
  if (res.data.code == 1) {
    startCountdown();
    ElMessage(
      {
        message: "验证码发送成功",
        type: "success"
      }
    )
  } else {
    ElMessage(
      {
        message: res.data.message,
        type: "error"
      }
    )
  }
}
).catch(err => {
  ElMessage(
    {
      message: err.message,
      type: "error"
    }
  )
}
)

}
const onSubmit = () => {
  if (loginType.value == 'password')
    loginByPassword()
  else
    loginByCode()
}
const loginByCode = () => {
  if (form.docIdOrCode.trim() == '' || form.code.trim() == '') {
    ElMessage(
      {
        message: "账号或验证码不能为空",
        type: "error"
      }
    )
    return
  }

  console.log('submit!')
  axios(
    {
      method: 'post',
      url: '/api/doctor/loginByCode',
      // url:'api/186812056',
      data: {
        docId: form.docIdOrCode,
        code: form.code
      }
    }).then(res => {
      if (res.data.code == 1) {
        ElMessage({
          message: "登录成功",
          type: "success"
        })
        setLocalStorage('token', res.data.data.token)
        setSessionStorage('doctor', res.data.data.doctor)
        router.push('/reportList')
      } else {
        ElMessage(
          {
            message: res.data.message,
            type: "error"
          }
        )
      }
    }
    ).catch(err => {
      ElMessage(
        {
          message: err.message,
          type: "error"
        }
      )
    })
}
const loginByPassword = () => {
  if (form.docIdOrCode.trim() == '' || form.password.trim() == '') {
    ElMessage(
      {
        message: "账号或密码不能为空",
        type: "error"
      }
    )
    return
  }

  console.log('submit!')
  axios(
    {
      method: 'post',
      url: '/api/doctor/login',
      // url:'api/186812056',
      data: {
        docIdOrCode: form.docIdOrCode,
        password: form.password
      }
    }).then(res => {
      if (res.data.code == 1) {
        ElMessage({
          message: "登录成功",
          type: "success"
        })
        setLocalStorage('token', res.data.data.token)
        setSessionStorage('doctor', res.data.data.doctor)
        router.push('/reportList')
      } else {
        ElMessage(
          {
            message: res.data.message,
            type: "error"
          }
        )
      }
    }
    ).catch(err => {
      ElMessage(
        {
          message: err.message,
          type: "error"
        }
      )
    })
}



</script>

<style scoped>
#login {
  /*布局垂直居中*/
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url(../assets/img/R-C.png);
  background-size: cover;
}

.mycard {
  /* 选择器，选取类名为'mycard'的所有元素 */

  margin: auto;
  /* 设置元素水平居中 */
  /* margin-top: 200px ; */
  padding: 0;
  /* 移除元素内容与边框间的所有内边距（padding），保持内容紧贴边框 */
  /*  margin-top: 200px; */
  /* 这一行被注释掉了，原本意图是设置顶部外边距为200px，如果取消注释，则会将元素向下推200px */
}
</style>