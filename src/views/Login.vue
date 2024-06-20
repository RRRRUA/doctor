<template>
    <el-card style="max-width: 480px" class="mycard">
      <template #header>
        <div class="card-header">
          <span>体检报告管理系统</span>
        </div>
      </template>
      <el-form :model="form" label-width="auto" style="max-width: 600px">
        <el-form-item label="医生编号">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="医生密码">
          <el-input v-model="form.password" />
        </el-form-item>
  
        <el-form-item>
          <el-button type="primary" @click="onSubmit">Login</el-button>
        </el-form-item>
      </el-form>
      <template #footer>版权所有</template>
    </el-card>
  
  </template>
  
  <script setup>
  import { ref,reactive } from 'vue'
  
  // do not use same name with ref
  const form = reactive({
    name: '',
    password: ''
  })
  
  const onSubmit = () => {
    console.log('submit!')
  }
  </script>
  
  <style scoped>
  .mycard{
    /* 水平居中 */
    margin:0;
    padding: 0;
    margin-top:50px;
    height: 100%;
    width: 100%;
  }
  </style>
  