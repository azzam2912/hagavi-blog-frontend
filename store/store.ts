import { PopUpParams } from '@/types/popUp'
import { Status, ToastParams } from '@/types/toast'
import { create } from 'zustand'

type ToastState = {
    toast: ToastParams
}

type PopUpCardState = {
    popUp: PopUpParams
}

type ToastAction = {
    updateToast: (toast: ToastState['toast']) => void
}

type PopUpCardAction = {
    updatePopUpCard: (popUp: PopUpCardState['popUp']) => void
}

export const useToastStore = create<ToastState & ToastAction>((set) => ({
    toast: {
        show: false, 
        message: "", 
        status: Status.ERROR, 
        duration: 10000
    },
    updateToast: (toast) => {
        set(() => ({toast: toast}))
    },
}));

export const usePopUpCardStore = create<PopUpCardState & PopUpCardAction>((set) => ({
  popUp: {
        show: false, 
        message: "", 
        status: Status.ERROR, 
        duration: 10000,
        action: "",
        onClickFunction: () => {}
    },
  updatePopUpCard: (popUp) => set(() => ({ popUp: popUp })),
}));