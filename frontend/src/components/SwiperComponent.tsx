import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import "../styles/SwiperComponent.scss";
import { ReactElement, JSXElementConstructor, ReactFragment } from "react";
import { JSX } from "react/jsx-runtime";

interface ComponentProps {
    elements: JSX.Element[];
}

const SwiperComponent: React.FC<ComponentProps> = (props) =>  {

    const { elements } = props;

    let charts: JSX.Element[] = []

    elements.forEach(element => {
        charts.push(<SwiperSlide>{element}</SwiperSlide>)
    });

    var swiper = (
        <div className='swiper_wrapper'>
            <Swiper
                slidesPerView={1}
                spaceBetween={20}
                slidesPerGroup={1}
                loop={true}
                pagination={{
                clickable: false,
                }}
                navigation={true}
                modules={[Pagination, Navigation]}
                className="mySwiper">

                {charts}
            </Swiper>
        </div>
    )
    return (
        swiper
    )
}

export default SwiperComponent;