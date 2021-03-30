import '../css/components.css';
import v1 from '../img/demo/6.png';
import v2 from '../img/demo/7.png';
import v3 from '../img/demo/8.png';
import v4 from '../img/demo/9.png'; 

import defaultMgs from '../translations/DefaultMessage';
import {FormattedMessage} from 'react-intl';

export default function LiveAnyWhere() {
    return (

        <>

            {/* desktop version  */}
            <div className="containerM">
                <div className="heading">
                <FormattedMessage 
                    id="LiveAnyWhere"
                    defaultMessage={defaultMgs.Mgs.LiveAnyWhere}
                />
                </div>

                <div className="LiveAnyWhereCont">

                    {/* map iterator here */}
                    <div className="LiveAnyWhereSin">
                        <img src={v1} alt="" />
                        <p>
                        <FormattedMessage 
                            id="entireHome"
                            defaultMessage={defaultMgs.Mgs.entireHome}
                        />
                        </p>
                    </div>
                    <div className="LiveAnyWhereSin">
                        <img src={v2} alt="" />
                        <p>
                        <FormattedMessage 
                            id="cabinAndCottage"
                            defaultMessage={defaultMgs.Mgs.cabinAndCottage}
                        />
                        </p>
                    </div>
                    <div className="LiveAnyWhereSin">
                        <img src={v3} alt="" />
                        <p>
                        <FormattedMessage 
                            id="petsWelome"
                            defaultMessage={defaultMgs.Mgs.petsWelome}
                        />
                        </p>
                    </div>
                    <div className="LiveAnyWhereSin">
                        <img src={v4} alt="" />
                        <p>
                        <FormattedMessage 
                            id="UniquesStay"
                            defaultMessage={defaultMgs.Mgs.UniquesStay}
                        />
                        </p>
                    </div>

                </div>

            </div>

        </>

    );
}