import {Video} from "@/components/Video/Video";
import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {ImageMediaInterface} from "@/utils/models/Movies/ImageMedia.interface";
import styles from "./Media.module.css"

type props = {

    trailer:VideoTrailerInterface | undefined,
    images:ImageMediaInterface
}
export function Media({trailer,images}:props){
    const backdrops = images.backdrops.slice(0,9)
    return (
        <div className={styles.wrapper}>
            <h2>Media</h2>
            <figure>
                {trailer && <Video video={trailer}/>}
                {backdrops
                    .map((b,i) => (
                        <div
                            className={styles.backdrop}
                            key={`backdrop-${i}`}
                        >
                            <Image
                                src={generateImageUrl(b.file_path)}
                                alt={`movie backdrop ${i}`}
                                fill
                            />
                        </div>
                    )
                    )}
            </figure>
        </div>
    )
}