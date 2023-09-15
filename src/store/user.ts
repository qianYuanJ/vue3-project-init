import { defineStore } from "pinia";
import type { User } from "@type/userType";

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            name: '',
            userList: [] as User[]
        }
    },
    getters: {
        getName(): string {
            return this.name
        },
    },
    actions: {
        setName(name: string) {
            this.name = name
        },
        initUserList() {
            return this.userList = [
                {
                    userName: '张三',
                    age: 18
                },
                {
                    userName: '李四',
                    age: 20
                },
            ]
        }
    }
})

