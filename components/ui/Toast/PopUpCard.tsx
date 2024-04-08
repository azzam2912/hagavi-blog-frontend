import { Status} from "@/types/toast";
import { ButtonPrimary } from "../Buttons/Button";
import { usePopUpCardStore, useToastStore } from "@/store/store";

const PopUpCard = () => {
    const {updatePopUpCard, popUp} = usePopUpCardStore((state) => ({
        updatePopUpCard: state.updatePopUpCard,
        popUp: state.popUp
    }))
    const {updateToast, toast} = useToastStore((state) => ({
        updateToast: state.updateToast,
        toast: state.toast
    }))
    const handleClickButton = async () => {
        try{
            popUp.onClickFunction();
            updatePopUpCard({...popUp, show: false})
        } catch(error) {
            updateToast({...toast, show: true, message: "Failed to delete post. Error: " + error, status: Status.ERROR})
        }
    }
    var actionButtonClass = ""
    if(popUp.status == Status.SUCCESS){
        actionButtonClass = "border border-green-500 text-green-500";
    } else if(popUp.status == Status.ERROR) {
        actionButtonClass = "border border-red-500 text-red-500";
    } else {
        actionButtonClass = "border border-yellow-500 text-yellow-500";
    }
    return (
        <div className={"fixed top-[40%] left-50 lg:w-[380px] h-40 flex flex-col justify-center items-center p-2 m-2 bg-white text-gray-800 dark:text-gray-400 dark:bg-gray-800 border-indigo-400 dark:border-gray-700 border-2 rounded-lg transition-max-height duration-500 " + (popUp.show ? 'opacity-100 visible': 'opacity-0 invisible')}>
            <div className="flex items-center justify-center p-4">
                <h3>
                    {popUp.message}
                </h3>
            </div>
            <div className="flex justify-center items-center space-x-4 p-4">
                <ButtonPrimary type="button" onClick={() => handleClickButton()}className={actionButtonClass}>{popUp.action}</ButtonPrimary>
                <ButtonPrimary type="reset" onClick={()=>updatePopUpCard({...popUp, show: false})}>Cancel</ButtonPrimary>
            </div>
        </div>
    )
}

export default PopUpCard;