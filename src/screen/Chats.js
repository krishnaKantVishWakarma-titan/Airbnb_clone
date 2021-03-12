/* eslint-disable react-hooks/exhaustive-deps */
import { useHistory } from 'react-router-dom';
import '../css/components.css';
import varimg from '../img/banners/ad.jpg';
import headerStyle from '../css/headerMain.module.css';
import rightArrowIcon from '../img/icons/headerMinBack.png';

export default function Chats () {

    // const location = useLocation();
    // const {text, num} = location.state;
    // useEffect(() => {
    //     console.log(text);
    //     if (num === "") {
    //         alert("null");
    //         console.log(num);
    //     }
    //     console.log(num);

    // }, []);
    const history = useHistory();

    return (

        <>
            <div className="headerMinCont">
                    
                    <div className={headerStyle.headUpNavMain1} onClick={() => history.goBack()}><img src={rightArrowIcon} alt="" /></div>
                
                <div className="headerMinTitle">Chats</div>
            </div>

            <div className="noti">

                <div className="noti0">
                    <div className="noti01"><img src={varimg} alt="" /></div>
                    <div className="noti02">
                        <div className="noti021">
                            <div className="noti0211"><span className="noti02111">John</span><span className="noti02112">(host)</span> </div>
                            <div className="noti0212">Aug 19, 9:25 PM</div>
                        </div>
                        <div className="noti022">Hii</div>
                    </div>
                </div>

                <div className="noti0">
                    <div className="noti01"><img src={varimg} alt="" /></div>
                    <div className="noti02">
                        <div className="noti021">
                            <div className="noti0211"><span className="noti02111">John</span></div>
                            <div className="noti0212">Aug 19, 9:25 PM</div>
                        </div>
                        <div className="noti022">Hii</div>
                    </div>
                </div>

            </div>

        </>

    );
}