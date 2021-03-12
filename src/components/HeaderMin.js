import '../css/header.css';
import headerBackBtn from '../img/icons/headerMinBack.png';

export default function HeaderMin(props) {
    return (

        <>
            <div className="headerMinCont">
                <div className="headerMinArrow">
                    <img src={headerBackBtn} alt="" />
                </div>
                <div className="headerMinTitle">{props.title}</div>
            </div>
        </>

    );

}