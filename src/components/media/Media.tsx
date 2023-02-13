import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {VideoTrailerInterface} from "@/utils/models/Movies/VideoMedia.interface";
import {ImageMediaInterface} from "@/utils/models/Movies/ImageMedia.interface";
import styles from "./Media.module.css"
import {VideoThumbnail} from "@/components/Video/VideoThumbnail";
import {Section} from "@/components/common/Section/Section";
import {Slider} from "@/components/Slider/Slider";

type props = {
    videos:VideoTrailerInterface[],
    images:ImageMediaInterface
}
export function Media({videos,images}:props){
    const backdrops = images.backdrops.slice(0,9)
    return (
        <>
            <Section title={"trailer"}>
                {videos && videos.map(v => <VideoThumbnail video={v} key={`video-${v.key}`}/>)}
            </Section>
            <Section className={styles.wrapper} title={"Images"}>
                <Slider arrowsInContent={true}>
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
                </Slider>
            </Section>
        </>
    )
}