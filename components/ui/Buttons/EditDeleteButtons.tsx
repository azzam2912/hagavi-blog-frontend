import { deletePostByIdAsync } from "@/app/api/golang/api_golang";
import { ButtonPrimary } from "./Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePopUpCardStore } from "@/store/store";
import PopUpCard from "../Toast/PopUpCard";

const EditDeleteButtons = ({postId}:{postId: number}) => {
    const {updatePopUpCard, popUp} = usePopUpCardStore((state) => ({
        updatePopUpCard: state.updatePopUpCard,
        popUp: state.popUp
    }))
    const handleDeletePost = () => {
        updatePopUpCard({
            ...popUp,
            show: true,
            message: "Are you sure you want to delete this post?",
            action: "Delete",
            onClickFunction: () => deletePostByIdAsync(postId),
        });
    };
    const router = useRouter();
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
            <PopUpCard />
        </div>
        )
}
export default EditDeleteButtons;