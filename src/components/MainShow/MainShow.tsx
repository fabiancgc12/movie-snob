import styles from "@/styles/Home.module.css";
import Image, {StaticImageData} from "next/image";
import Link from "next/link";

type props = {
    data:{
        image:string | StaticImageData,
        title:string,
        description:string,
    }
}

export function MainShow({data}:props) {
    return <div className={styles.mainShow}>
        <div className={styles.info}>
            <h2>{data.title}</h2>
            <p>
                <small>{data.description}</small>
            </p>
            <div className={styles.actions}>
                <Link href={"#"} role="button" className={"contrast"}>More Info</Link>
            </div>
        </div>
        <Image src={data.image} alt={"main show poster"}/>
    </div>;
}
