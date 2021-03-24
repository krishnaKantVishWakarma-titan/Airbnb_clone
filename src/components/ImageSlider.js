/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SliderCss from '../css/ImageSlider.module.css';
// import v1 from '../img/demo/1.png';
// import v2 from '../img/demo/2.png';
// import v3 from '../img/demo/3.png';

export default function Examples({images}) {

    const [index, setIndex] = useState(0);
    // let images = ["https://images.unsplash.com/photo-1533929736458-ca588d08c8be?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bG9uZG9ufGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80", "https://london.ac.uk/sites/default/files/styles/max_1300x1300/public/2018-10/london-aerial-cityscape-river-thames_1.jpg?itok=6LenFxuz", "https://evanevanstours.com/blog/wp-content/uploads/2019/05/london-night-skyline-scaled.jpg"];
    useEffect(() => {
        console.log("from imageSlider.js")
        console.log(images);
    }, []);

    const slideRight = () => {
        setIndex((index + 1) % images.length);
    }

    const slideLeft = () => {
        const nextIndex = index - 1;
        if (nextIndex < 0) {
            setIndex(images.length - 1);
        } else {
            setIndex(nextIndex);
        }
    }

    return (
        images.length > 0 && (
            <div className={SliderCss.container}>
                <button className={SliderCss.slideLeftBtn} onClick={slideLeft}>{"<"}</button>
                <img className={SliderCss.mainImage} src={images[index]} alt="" />
                <button className={SliderCss.slideRightBtn} onClick={slideRight}>{">"}</button>
            </div>
        )
    );
}