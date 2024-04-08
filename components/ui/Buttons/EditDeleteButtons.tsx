import { deletePostByIdAsync } from "@/app/api/golang/api_golang";
import { ButtonPrimary } from "./Button";
import Image from "next/image";
import { useRouter, redirect } from "next/navigation";
import { usePopUpCardStore, useToastStore } from "@/store/store";
import PopUpCard from "../Toast/PopUpCard";
import { Status } from "@/types/toast";

const EditDeleteButtons = ({postId}:{postId: number}) => {
    const router = useRouter();
    const {updatePopUpCard, popUp} = usePopUpCardStore((state) => ({
        updatePopUpCard: state.updatePopUpCard,
        popUp: state.popUp
    }))
    const {updateToast, toast} = useToastStore((state) => ({
        updateToast: state.updateToast,
        toast: state.toast
    }))
    const handleDeletePostAsync = async() => {
        try {
            const response = await deletePostByIdAsync(postId);
            if((response).ok) {
                updateToast({...toast, show: true, message: "Success deleting file", status: Status.SUCCESS})
                router.refresh();
                return
            } else {
                updateToast({...toast, show: true, message: "Unexpected Error", status: Status.ERROR})
            }
            // if(!popUp.show) {
            //     router.refresh();
            // } else {
            //     setTimeout(() => {
            //         router.refresh();
            //     }, 5000)
            // }
            
        } catch(error) {
            updateToast({...toast, show: true, message: "Failed to delete post. Error: " + error, status: Status.ERROR})
        }
    }
    const handleDeletePost = () => {
        updatePopUpCard({
            ...popUp,
            show: true,
            message: "Are you sure you want to delete this post?",
            action: "Delete",
            onClickFunction: handleDeletePostAsync()
        });
    };
    return (
        <div className="flex justify-start w-full px-2 pt-2 gap-x-3">
            <ButtonPrimary type="submit" onClick={() => {router.push(`/post/${postId}/edit`)}}>
                <Image alt="Edit" className="dark:invert" width={20} height={20} src='/edit_FILL0_wght400_GRAD0_opsz24.svg' />
                Edit
            </ButtonPrimary>
            <ButtonPrimary className="border-red-500 text-red-500" onClick={handleDeletePost} type="submit">
                <Image alt="Edit" className="text-red-500" width={20} height={20} src='/delete_FILL0_wght400_GRAD0_opsz24.svg' />
                Delete
            </ButtonPrimary>
            <ButtonPrimary onClick={()=>{}}>REFRESH</ButtonPrimary>
        </div>
        )
}
export default EditDeleteButtons;