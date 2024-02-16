import {useDialogState} from "@/composables/useDialogState.js";

export const useFormDialog=(formInstance)=>{
    const { visible, mode, updateMode } = useDialogState();

    const closeDialog = () => {
        formInstance.value?.resetFields();
        visible.value = false;
    };
    const openDialog = (target) => {
        updateMode(target);
        visible.value = true;
        formInstance.value?.resetFields();
    };

    const modeText = () => {
        if (mode.value === 'add') return '添加';
        if (mode.value === 'edit') return '编辑';
        if (mode.value === 'readonly') return '详情';
    }

    return{
        visible, mode, openDialog, closeDialog, modeText
    }
}
