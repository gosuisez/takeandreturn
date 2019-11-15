/* Imports */
import React from 'react';
import Dialog from "react-native-dialog";
import { styles } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
/* /Imports/ */

const Alert = props => {
    const custom = styles(props);

    return (
        <Dialog.Container visible={props.visible} contentStyle={custom.Alert}>
                <Dialog.Title style={custom.AlertTitle}>{props.title}</Dialog.Title>
                <Dialog.Description style={custom.AlertBody}>
                    {props.body}
                </Dialog.Description>
                <Dialog.Button label={props.first} color={'#F5F5F5'} onPress={props.onSubmit} />
                <Dialog.Button label={props.second} color={'#F5F5F5'} onPress={props.onCancel} />
        </Dialog.Container>
    );
};

/* Exports */
export default withTheme(Alert);
/* /Exports/ */
