import Image from "next/image";
import {generateImageUrl} from "@/utils/functions/generateImageUrl";
import {VideoTrailerInterface} from "@/models/Movies/VideoMedia.interface";
import {ImageMediaResponse} from "@/models/Movies/ImageMedia.interface";
import styles from "./Media.module.css"
import {VideoThumbnail} from "@/components/Video/VideoThumbnail";
import {Section} from "@/components/Section/Section";
import {Slider} from "@/components/Slider/Slider";
import {SliderSection} from "@/components/Slider/SliderSection";

type props = {
    videos:VideoTrailerInterface[],
    images:ImageMediaResponse
}
export function Media({videos,images}:props){
    const backdrops = images.backdrops.slice(0,9)
    return (
        <>
                <Section title={"Videos"}>
                    {videos.length > 0
                        ? <Slider speed={450}>
                            {videos && videos.map(v => <VideoThumbnail video={v} key={`video-${v.key}`}/>)}
                          </Slider>
                        : <p>Currently there are no videos related to this movie/tv show on our database.</p>
                    }
                </Section>
                <SliderSection className={styles.wrapper} title={"Images"} speed={450}>
                    {backdrops.length > 0 ? backdrops.map((b,i) => (
                                        <div className={styles.backdrop} key={`backdrop-${i}`}>
                                            <Image
                                                src={generateImageUrl(b.file_path)}
                                                alt={`movie backdrop ${i}`}
                                                fill
                                            />
                                        </div>
                                    )
                                )
                        : <p>Currently there are no images related to this movie/tv show on our database.</p>
                    }
                </SliderSection>

        </>
    )
}