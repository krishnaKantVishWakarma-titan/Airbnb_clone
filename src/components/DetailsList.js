// import '../css/header.css';

import { Link } from 'react-router-dom';
import v1 from '../img/demo/16.png';
import v2 from '../img/demo/17.png';
import v3 from '../img/demo/18.png';

export default function DetailsList(props) {

    return (

        <>
            {/* main container */}
            <div className="DetailListCont">

                {/* single container */}
                <Link to="/hotelInfo" className="DetailList0">
                    <div className="DetailList01"><img src={v1} alt="" /></div>
                    <div className="DetailList02">
                        <div className="DetailList021">Car Name</div>
                        <div className="DetailList022">Vintage car</div>
                        <div className="DetailList023">2 guests . Studio . 2 beds . 1 bathroom</div>
                        <div className="DetailList024">$ 500</div>
                    </div>
                </Link>

                <Link to="/hotelInfo" className="DetailList0">
                    <div className="DetailList01"><img src={v2} alt="" /></div>
                    <div className="DetailList02">
                        <div className="DetailList021">Car Name</div>
                        <div className="DetailList022">Vintage car</div>
                        <div className="DetailList023">2 guests . Studio . 2 beds . 1 bathroom</div>
                        <div className="DetailList024">$ 500</div>
                    </div>
                </Link>

                <Link to="/hotelInfo" className="DetailList0">
                    <div className="DetailList01"><img src={v3} alt="" /></div>
                    <div className="DetailList02">
                        <div className="DetailList021">Car Name</div>
                        <div className="DetailList022">Vintage car</div>
                        <div className="DetailList023">2 guests . Studio . 2 beds . 1 bathroom</div>
                        <div className="DetailList024">$ 500</div>
                    </div>
                </Link>
                

            </div>

        </>

    );

}