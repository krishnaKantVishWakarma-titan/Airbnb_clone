/* eslint-disable jsx-a11y/anchor-is-valid */
import { useHistory } from 'react-router-dom';
import f from '../css/Footer.module.css';

// import defaultMgs from '../translations/DefaultMessage';
// import {FormattedMessage} from 'react-intl';

export default function Footer() {
    const history = useHistory();
    return(
        <div className={f.footerContainerMain}>
            <div className={f.f0}>
                <div className={f.f01}>
                    <div className={f.f011}>ABOUT</div>
                    <div className={f.f012}><a>Investors</a></div>
                    <div className={f.f012}><a>How this work</a></div>
                    <div className={f.f012}><a>Made possible by hosts</a></div>
                    <div className={f.f012}><a>Careers</a></div>
                    <div className={f.f012}><a>Newsroom</a></div>
                </div>
                <div className={f.f01}>
                    <div className={f.f011}>COMMUNITY</div>
                    <div className={f.f012}><a>Diversity & Belonging</a></div>
                    <div className={f.f012}><a>Accessibility</a></div>
                    <div className={f.f012}><a>Frontline Stays</a></div>
                    <div className={f.f012}><a>Guest Referrals</a></div>
                </div>
                <div className={f.f01}>
                    <div className={f.f011}>HOST</div>
                    <div className={f.f012}><a>Host your home</a></div>
                    <div className={f.f012}><a>Host an experience</a></div>
                    <div className={f.f012}><a>Host your car</a></div>
                    <div className={f.f012}><a>Responsible hosting</a></div>
                </div>
                <div className={f.f01}>
                    <div className={f.f011}>SUPPORT</div>
                    <div className={f.f012}><a>Help center</a></div>
                    <div className={f.f012}><a>Cancellation options</a></div>
                    <div className={f.f012}><a>Neighbourhood Support</a></div>
                    <div className={f.f012}><a>Trust & Safety</a></div>
		            <div className={f.f012} onClick={() => history.push('/AdminLogin')}><a>Admin Login </a></div>
                </div>
            </div>
            <div className={f.f1}>
                <div className={f.f11}>
                    &#169; 2021, Inc. All rights reserved . <a>Privacy</a> . <a>Terms</a> . <a>Sitemap</a> . <a>Company details</a>
                </div>

            </div>
        </div>
    );
}