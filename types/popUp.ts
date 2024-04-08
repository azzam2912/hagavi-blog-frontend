import { ToastParams } from "./toast"

export type PopUpParams = ToastParams & {
    action?: string,
    onClickFunction?: any
}