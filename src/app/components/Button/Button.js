/* Imports */
import React from 'react';
import { Button } from 'react-native-elements';
import { styles } from '@app/styles/config';
import { withTheme} from '@app/theme/themeProvider';
import withPreventDoubleClick from '@app/utils/Constants';
/* /Imports/ */

const DefaultButton = withPreventDoubleClick(Button);

const AppButton = props => {
    const custom = styles(props);

    return (
        <DefaultButton onPress={props.customClick} title={props.title} disabled={props.disabled} buttonStyle={custom.FormButton}/>
    );
};

/* Exports */
export default withTheme(AppButton);
/* /Exports/ */
