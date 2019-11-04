/* Imports */
import React from 'react';
import { Button } from 'react-native-elements';
import { withTheme} from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
import withPreventDoubleClick from '@app/utils/Constants';
const DefaultButton = withPreventDoubleClick(Button);
/* /Imports/ */

const AppButton = props => {
    const custom = styles(props);

    return (
        <DefaultButton onPress={props.customClick} title={props.title} disabled={props.disabled} buttonStyle={custom.FormButton}/>
    );
};

export default withTheme(AppButton);
