import React, { useEffect, useState } from 'react';
import {IntlProvider} from 'react-intl';

import English from './en.json';
import Hindi from './hi.json';

export default function LanguageProvider(props) {

    const [locale, setLocale] = useState('en');
    const [lang, setLang] = useState(English);

    useEffect(() => {
        if (localStorage.getItem("locale") === null) {
            localStorage.setItem("locale", "en");
        } else {
            setLocale(localStorage.getItem("locale"));
            switch(localStorage.getItem("locale")) {
                case 'en':
                    setLang(English);
                    break;
                case 'hi':
                    setLang(Hindi);
                    break;
                default: 
                    setLang(English);
            }
        }
    }, []);

    return(
        <IntlProvider locale={locale} messages={lang}>
            {props.children}
        </IntlProvider>
    );
}