import { Status, ToastParams } from "@/types/toast";
import { SuccessSymbol, ErrorSymbol, WarningSymbol } from "./StatusSymbol";
import { ButtonPrimary } from "../Buttons/Button";
import { usePopUpCardStore } from "@/store/store";

const PopUpCard = () => {
    const {updatePopUpCard, popUp} = usePopUpCardStore((state) => ({
        updatePopUpCard: state.updatePopUpCard,
        popUp: state.popUp
    }))
    var actionButtonClass = ""
    if(popUp.status == Status.SUCCESS){
        actionButtonClass = "border border-green-500 text-green-500"
    } else if(popUp.status == Status.ERROR) {
        actionButtonClass = "border border-red-500 text-red-500"
    } else {
        actionButtonClass = "border border-yellow-500 text-yellow-500"
    }
    return (
        <div className={"fixed top-50 left-50 w-80 h-24 flex justify-center items-center space-x-4 p-2 m-2 bg-white text-gray-800 dark:text-gray-400 dark:bg-gray-800 border-indigo-400 dark:border-gray-700 border-2 rounded-lg transition-max-height duration-500 " + (popUp.show ? 'opacity-100 visible': 'opacity-0 invisible')}>
            <div className="flex-0 p-x-4">
                {popUp.status == Status.SUCCESS && <SuccessSymbol />}
                {popUp.status == Status.ERROR && <ErrorSymbol />}
                {popUp.status == Status.WARNING && <WarningSymbol />}
            </div>
            <h3>
                {popUp.message}
            </h3>
            <div className="flex items-center">
                <ButtonPrimary type="button" className={actionButtonClass} onClick={popUp.onClickFunction}>{popUp.action}</ButtonPrimary>
                <ButtonPrimary type="reset" onClick={updatePopUpCard({...popUp, show: false})}>Cancel</ButtonPrimary>
            </div>
        </div>
    )
}

export default PopUpCard;