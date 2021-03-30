import '../css/components.css';
import v1 from '../img/demo/2.png';
import v2 from '../img/demo/3.png';
import v3 from '../img/demo/4.png';

import defaultMgs from '../translations/DefaultMessage';
import {FormattedMessage} from 'react-intl';
import { useHistory } from 'react-router-dom';

export default function PopularDestination() {

    const history = useHistory();

    return (

        <>

            {/* desktop version  */}
            <div className="containerM">
                <div className="heading">
                    <FormattedMessage 
                        id="popularDestination"
                        defaultMessage={defaultMgs.Mgs.popularDestination}
                    />
                </div>

                <div className="PopularDestCont">

                    {/* map iterator here */}
                    <div className="PopularDestSin" onClick={() => history.push("/homes", {
                        searchKey: "London",
                        noAdult: 0,
                        noChild: 0,
                        noInfant: 0
                    })}>
                        <img src={v1} alt="" />
                        <p>
                        <FormattedMessage 
                            id="London"
                            defaultMessage={defaultMgs.Mgs.London}
                        />
                        </p>
                    </div>
                    <div  className="PopularDestSin" onClick={() => history.push("/homes", {
                        searchKey: "Italy",
                        noAdult: 0,
                        noChild: 0,
                        noInfant: 0
                    })}>
                        <img src={v2} alt="" />
                        <p><FormattedMessage 
                            id="Italy"
                            defaultMessage={defaultMgs.Mgs.Italy}
                        /></p>
                    </div>
                    <div  className="PopularDestSin" onClick={() => history.push("/homes", {
                        searchKey: "Maldives",
                        noAdult: 0,
                        noChild: 0,
                        noInfant: 0
                    })}>
                        <img src={v3} alt="" />
                        <p><FormattedMessage 
                            id="Maldives"
                            defaultMessage={defaultMgs.Mgs.Maldives}
                        /></p>
                    </div>

                </div>

            </div>

        </>

    );
}