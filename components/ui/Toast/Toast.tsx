import { Status } from "@/types/toast";
import { SuccessSymbol, ErrorSymbol, WarningSymbol } from "./StatusSymbol";
import { useToastStore } from "@/store/store";
import { useEffect } from "react";


const Toast = () => {
    const {updateToast, toast } = useToastStore((state) => ({
        updateToast: state.updateToast,
        toast: state.toast,
    }));
    useEffect(() => {
        setTimeout(() => {
            updateToast({...toast, show: false});
        }, toast.duration)
    }, [toast, updateToast])
    return (
        <div className={"fixed top-20 left-50 w-80 h-24 flex justify-center items-center space-x-4 p-2 m-2 bg-white text-gray-800 dark:text-gray-400 dark:bg-gray-800 border-indigo-400 dark:border-gray-700 border-2 rounded-lg transition-max-height duration-500 " + (toast.show ? 'opacity-100 visible': 'opacity-0 invisible')}>
            <div className="flex-0 p-x-4">
                {toast.status == Status.SUCCESS && <SuccessSymbol />}
                {toast.status == Status.ERROR && <ErrorSymbol />}
                {toast.status == Status.WARNING && <WarningSymbol />}
            </div>
            <h3>
                {toast.message}
            </h3>
            <button type="button" onClick={()=>updateToast({...toast, show: false})} className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-default" aria-label="Close">
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
            </button>
        </div>
    )
}

export default Toast;