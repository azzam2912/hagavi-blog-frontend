export enum Status {
    SUCCESS,
    ERROR,
    WARNING
}

export type ToastParams = {
    show: boolean, 
    message: string, 
    status: Status,
    duration: number
}