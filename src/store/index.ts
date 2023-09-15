import { useUserStore } from "@store/user";

export function useStore() {
    return {
        userStore: useUserStore()
    }
}

