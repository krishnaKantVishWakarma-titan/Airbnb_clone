import { useState } from 'react';
import '../css/components.css';
import varimg1 from '../img/demo/22.png';
import varimg2 from '../img/demo/23.png';
import varimg3 from '../img/demo/24.png';

import starIcon from '../img/icons/star.svg';
import usFilledStarIcon from '../img/icons/unFilledStar.svg';
import thumbLike from '../img/icons/thumbLike.svg';

export default function Review() {

    const [rating, setRating] = useState(null);
    const [val1, setVal1] = useState(false);
    const [val2, setVal2] = useState(false);
    const [val3, setVal3] = useState(false);
    const [val4, setVal4] = useState(false);
    const [val5, setVal5] = useState(false);
    const handleReview = (e, val) => {
        setVal1(false);
        setVal2(false);
        setVal3(false);
        setVal4(false);
        setVal5(false);
        for (var i=1; i<=val; i++) {
            if (i === 1) {
                setVal1(!val1);
            } else if (i === 2) {
                setVal2(!val2);
            } else if (i === 3) {
                setVal3(!val3);
            } else if (i === 4) {
                setVal4(!val4);
            } else if (i === 5) {
                setVal5(!val5);
            }
        }
        if(rating) {
            ratingOnClickHandle(null, rating);
        }
    }
    const ratingOnClickHandle = (e, val) => {
        setRating(val);
        setVal1(false);
        setVal2(false);
        setVal3(false);
        setVal4(false);
        setVal5(false);
        for (var i=1; i<=val; i++) {
            if (i === 1) {
                setVal1(true);
            } else if (i === 2) {
                setVal2(true);
            } else if (i === 3) {
                setVal3(true);
            } else if (i === 4) {
                setVal4(true);
            } else if (i === 5) {
                setVal5(true);
            }
        }
    }

    return (

        <>
        
            <div className="container">
                <div className="ReviewW0">
                    <div className="ReviewW01">Write your review</div>
                    <textarea placeholder="Krishna" />
                    <div className="ReviewW02">
                        <div className="ReviewW021" onClick={e => ratingOnClickHandle(e, 1)} onMouseOver={e => handleReview(e, 1)} onMouseLeave={e => handleReview(e, 1)}>
                            {val1 ? <img src={starIcon} alt="" /> : <img src={usFilledStarIcon} alt="" />}
                        </div>
                        <div className="ReviewW021" onClick={e => ratingOnClickHandle(e, 2)} onMouseOver={e => handleReview(e, 2)} onMouseLeave={e => handleReview(e, 2)}>
                            {val2 ? <img src={starIcon} alt="" /> : <img src={usFilledStarIcon} alt="" />}
                        </div>
                        <div className="ReviewW021" onClick={e => ratingOnClickHandle(e, 3)} onMouseOver={e => handleReview(e, 3)} onMouseLeave={e => handleReview(e, 3)}>
                            {val3 ? <img src={starIcon} alt="" /> : <img src={usFilledStarIcon} alt="" />}
                        </div>
                        <div className="ReviewW021" onClick={e => ratingOnClickHandle(e, 4)} onMouseOver={e => handleReview(e, 4)} onMouseLeave={e => handleReview(e, 4)}>
                            {val4 ? <img src={starIcon} alt="" /> : <img src={usFilledStarIcon} alt="" />}
                        </div>
                        <div className="ReviewW021" onClick={e => ratingOnClickHandle(e, 5)} onMouseOver={e => handleReview(e, 5)} onMouseLeave={e => handleReview(e, 5)}>
                            {val5 ? <img src={starIcon} alt="" /> : <img src={usFilledStarIcon} alt="" />}
                        </div>
                        {rating && (
                            <div>{rating}</div>
                        )}
                    </div>
                    <div className="ReviewW03">Post</div>
                </div>
                <div className="ReviewCont0">
                    <div className="ReviewCont01">
                        <div className="ReviewCont011"><img src={varimg1} alt="" /></div>
                        <div className="ReviewCont012">
                            <div className="ReviewCont0121">Alexia Jane</div>
                            <div className="ReviewCont0122">Booked 21 May, 2019</div>
                            <div className="ReviewCont013">
                            This is location in a great spot to close to shops and  bars, very quiet location.
                            </div>
                            <div className="ReviewCont014">
                                <div className="ReviewCont0141">Posted : 01/11/2020</div>
                                <div className="ReviewCont0142"><img src={thumbLike} alt="" /></div>
                            </div>
                        </div>
                    </div>

                    <div className="ReviewCont014V">View All</div>

                </div>

            </div>
        
        </>

    );
}