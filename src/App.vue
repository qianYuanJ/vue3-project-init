<template>
	<div>
		<button @click="sendRequest">发送请求</button>
		<div>{{ userStore.name }}</div>
		<button @click="userStore.setName('李四')">修改张三</button>
		<div class="list">
			<div class="item" v-for="(user, userIndex) in userData.list" :key="userIndex">
				<span>{{ user.userName }}</span>
			</div>
		</div>
	</div>
	<HelloWorld msg="Vite + Vue" />

	<router-view />
</template>

<script setup lang="ts">
import HelloWorld from '@components/HelloWorld.vue'
import { testRequest } from "@api/test";
import { useStore } from "@store/index";
import { onMounted, reactive } from 'vue';
import { chunk } from "lodash";
const store = useStore();
const { userStore } = store
type UserDataType = {
	list: User[]
}
type User = {
	userName: string,
	age: number
}
const userData: UserDataType = reactive({
	list: []
})
function sendRequest() {
	const params = {
		test: 1
	}
	testRequest(params).then(res => {
		console.log(res)
	});
}

onMounted(() => {
	userData.list = userStore.initUserList()
	let list = chunk([1, 2, 3, 4], 2)
	console.log(list);

})
</script>

<style scoped lang="less">
@width: 10px;

.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
	width: @width;
	height: 100px;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
