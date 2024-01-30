import {defineStore} from "pinia";
import {ref} from "vue";

export const useAppStore = defineStore('app', () => {
    const dialogVisible = ref(false);

    const showDialog = () => {
        dialogVisible.value = true
    }

    return { dialogVisible, showDialog }
})