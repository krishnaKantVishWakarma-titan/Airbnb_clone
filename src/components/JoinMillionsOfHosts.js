import '../css/components.css';
import v1 from '../img/demo/10.png';
import v2 from '../img/demo/11.png';
import v3 from '../img/demo/12.png';

import defaultMgs from '../translations/DefaultMessage';
import {FormattedMessage} from 'react-intl';

export default function JoinMillionsOfHosts() {
    return (

        <>

            {/* desktop version  */}
            <div className="containerM">
                <div className="heading">
                <FormattedMessage 
                    id="joinMillionsOfHosts"
                    defaultMessage={defaultMgs.Mgs.joinMillionsOfHosts}
                />
                </div>

                <div className="JoinMillionsOfHostsCont">

                    {/* map iterator here */}
                    <div className="JoinMillionsOfHostsSin">
                        <img src={v1} alt="" />
                        <p>
                        <FormattedMessage 
                            id="hostYourHome"
                            defaultMessage={defaultMgs.Mgs.hostYourHome}
                        />
                        </p>
                    </div>
                    <div className="JoinMillionsOfHostsSin">
                        <img src={v2} alt="" />
                        <p>
                        <FormattedMessage 
                            id="hostYourOnlineExperience"
                            defaultMessage={defaultMgs.Mgs.hostYourOnlineExperience}
                        />
                        </p>
                    </div>
                    <div className="JoinMillionsOfHostsSin">
                        <img src={v3} alt="" />
                        <p>
                        <FormattedMessage 
                            id="hostYourOnlineExperience"
                            defaultMessage={defaultMgs.Mgs.hostYourOnlineExperience}
                        />
                        </p>
                    </div>

                </div>

            </div>

        </>

    );
}