import React from 'react';
import {FormattedMessage} from 'react-intl';

export default function Convertor({id, mgs}) {
    return(
            <FormattedMessage 
                id={id}
                defaultMessage={mgs}
            />
    );
}