// ts 进行类型限制 提供语法提示 config:UserConfig
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// npm i vite-plugin-checker -D
import checker from 'vite-plugin-checker'
// npm i path
// npm install @types/node --save-dev
import path from 'path'


export default defineConfig({
	resolve: {
		alias: {
			'@': path.resolve('./src'), // 根目录
			'@api': path.resolve('./src/api'), // 接口
			'@assets': path.resolve('./src/assets'), // 资源
			'@components': path.resolve('./src/components'), // 组件
			'@views': path.resolve('./src/views'), // 页面
			'@utils': path.resolve('./src/utils'), // 工具
			'@router': path.resolve('./src/router'), // 路由
			'@store': path.resolve('./src/store'), // 状态管理
			'@config': path.resolve('./src/config'), // 配置
			'@type': path.resolve('./src/type'), // 类型
		}
	},
	plugins: [
		vue(),
		checker({
			typescript: true,
		})
	],
	optimizeDeps: {
		exclude: ['node_modules'],// 指定数组中的依赖不进行依赖预构建
	},
	build: {
		minify: 'terser',
		terserOptions: {
			compress: {
				//生产环境时移除console
				drop_console: true,
				drop_debugger: true,
			},
		},
	},
})


