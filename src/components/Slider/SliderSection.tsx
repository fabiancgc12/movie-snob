import {SliderProps, Slider} from "@/components/Slider/Slider";
import { Section } from "../Section/Section";

type props = SliderProps & {
    title:string
}

export function SliderSection({title,children,...sliderProps}:props){
    return (
        <Section title={title}>
            <Slider {...sliderProps}>
                {children}
            </Slider>
        </Section>
    )
}