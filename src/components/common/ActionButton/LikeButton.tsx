import {ActionButton} from "@/components/common/ActionButton/ActionButton";
import styles from "./LikeButton.module.css";
import {useCheckedButton} from "@/components/common/ActionButton/useCheckedButton";
import {props} from "./chechMarkButton"
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";

export function LikeButton(props:props){
    return <Button key={`${props.mediaType}-${props.media.id}`} {...props}/>
}

export function Button({mediaType,media,size,className = ""}:props){
    const [checked,onClick] = useCheckedButton("liked",mediaType,media)

    return (
        <ActionButton className={`${styles.like} secondary ${className}`} size={size} onClick={onClick}>
            {checked ? <AiFillHeart size={24}/> : <AiOutlineHeart size={24}/>}
        </ActionButton>
    )
}