# 基于Vue3+Ts的初始化项目
---
## 依赖
- [Vue](https://cn.vuejs.org/guide/introduction.html)
- [TypeScript](https://www.typescriptlang.org/zh/docs/)
- [Vue-Router](https://router.vuejs.org/zh/installation.html) 

- [Pinia](https://pinia.web3doc.top/introduction.html)
- [Axios](https://www.axios-http.cn/docs/intro)
- [Less](https://less.bootcss.com/)
- [Lodash](https://www.lodashjs.com/)

## 组件库
#### [Vant](https://vant-contrib.gitee.io/vant/#/zh-CN/home)
###### 安装依赖  按需自动导入
```bash
npm i vant
npm i @vant/auto-import-resolver unplugin-vue-components -D
```
###### 配置 vite.config.ts
```ts
// vite.config.ts
import { VantResolver } from '@vant/auto-import-resolver';
import Components from 'unplugin-vue-components/vite';
export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};
```
###### 注意事项
- 函数形式的组件无法自动导入，需手动导入，样式也一样
```ts
// Toast
import { showToast } from 'vant';
import 'vant/es/toast/style';

// Dialog
import { showDialog } from 'vant';
import 'vant/es/dialog/style';

// Notify
import { showNotify } from 'vant';
import 'vant/es/notify/style';

// ImagePreview
import { showImagePreview } from 'vant';
import 'vant/es/image-preview/style';
```

#### [Element-Plus](https://element-plus.org/zh-CN/)
###### 安装依赖  按需自动导入
```bash
npm install element-plus --save
npm install -D unplugin-vue-components unplugin-auto-import
```
###### 配置 vite.config.ts
```ts
// vite.config.ts
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default {
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
};
```
###### 配置tsconfig.json （如果使用volar）
```json
// tsconfig.json
{
  "compilerOptions": {
    // ...
    "types": ["element-plus/global"]
  }
}
```
## 环境变量
git 会忽略环境变量文件，这里提供一个示例文件 *.env.example* 
命名规定：环境变量文件必须以`.env`开头
开发环境文件名：`.env.development`
测试环境文件名：`.env.test`
生产环境文件名：`.env.production`
## 终端命令
```bash
npm run dev # 启动项目

npm run build # 打包项目 开发环境

npm run build:dev # 打包项目 开发环境

npm run build:test # 打包项目 测试环境

npm run build:prod # 打包项目 生产环境
```
注意：如果没有对应的环境变量文件，运行打包命令会报错
## 本地打包、部署
```bash
npm run build

docker-compose up
```
运行后会在本地80端口看到项目已启动