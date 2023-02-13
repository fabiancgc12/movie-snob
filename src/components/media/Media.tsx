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
                <Slider arrowsInContent={true} speed={300}>
                    {videos && videos.map(v => <VideoThumbnail video={v} key={`video-${v.key}`}/>)}
                </Slider>
            </Section>
            <Section className={styles.wrapper} title={"Images"}>
                <Slider arrowsInContent={true} speed={400}>
                    {backdrops
                        .map((b,i) => (
                            <div key={`backdrop-${i}`}>
                                <div className={styles.backdrop} key={`backdrop-${i}`}>
                                    <Image
                                        src={generateImageUrl(b.file_path)}
                                        alt={`movie backdrop ${i}`}
                                        fill
                                    />
                                </div>
                            </div>

                            )
                        )}
                </Slider>
            </Section>
        </>
    )
}