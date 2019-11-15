/* Imports */
import React from 'react';
import { View, Text } from 'react-native';
import Dialog from "react-native-dialog";
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import VideoPlayer from 'react-native-video-controls';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
/* /Imports/ */

class NFC extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            isNfcSupported: true,
            nfcTagValue: null,
            dialogVisible: false,
        };
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* Show Dialog Method - Here We Display Our Custom Alert */
    _showDialog = () => {
        this.setState({ dialogVisible: true });
    };
    /* /Show Dialog Method - Here We Display Our Custom Alert/ */

    /* Hande Cancel Method - Here We Cancel Our Custom Alert */
    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };
    /* /Hande Cancel Method - Here We Cancel Our Custom Alert/ */

    /* Component Did Mount Method -  Here We Mount Component - Data */
    componentDidMount() {
        NfcManager.start().catch(error => this.setState({isNfcSupported: false}));
        NfcManager.registerTagEvent();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => { this.setState({ nfcTagValue: tag.id})});
    }
    /* /Component Did Mount Method -  Here We Mount Component - Data/ */

    /* Component Will Unmount Method - Here We Unmount Component - Data */
    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }
    /* /Component Will Unmount Method - Here We Unmount Component - Data/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        let status;
        let NFCDescription = 'За да сканираме картата си ние трябва да вземем картата и да я поставим на NFC-четеца на нашия телефон.';

        const responsive = responsives(this.props);

        if(this.props.isScanned) {
            status = "Статус: Успешно сканирахте картата си.";

            return (
                <View>
                    <Text style={responsive.NFCText}>{ status }</Text>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title style={responsive.NFCTitle}>Как да сканираме картата си?</Dialog.Title>
                        <Dialog.Description style={responsive.NFCDescription}>{NFCDescription}</Dialog.Description>
                        <Dialog.Description style={responsive.NFCStatus}>{status}</Dialog.Description>
                        <VideoPlayer source={require('@app/components/NFC/NFC.mp4')} toggleResizeModeOnFullscreen={false} disableBack={true} disablePlayPause={true} disableTimer={true} disableVolume={true} disableSeekbar={true} disableFullscreen={true} style={responsive.NFCAnimation} repeat={true}/>
                        <Dialog.Button label="OK" style={responsive.NFCButton} onPress={this.handleCancel}/>
                    </Dialog.Container>
                </View>
            );
        } else {
            status = "Статус: Сканирайте вашата карта.";

            return (
                <View>
                    <Text style={responsive.NFCText} onPress={this._showDialog}>Как да сканираме картата си?</Text>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title style={responsive.NFCTitle}>Как да сканираме картата си?</Dialog.Title>
                        <Dialog.Description style={responsive.NFCDescription}>{NFCDescription}</Dialog.Description>
                        <Dialog.Description style={responsive.NFCStatus}>{status}</Dialog.Description>
                        <VideoPlayer source={require('@app/components/NFC/NFC.mp4')} toggleResizeModeOnFullscreen={false} disableBack={true} disablePlayPause={true} disableTimer={true} disableVolume={true} disableSeekbar={true} disableFullscreen={true} style={responsive.NFCAnimation} repeat={true}/>
                        <Dialog.Button label="OK" style={responsive.NFCButton} onPress={this.handleCancel}/>
                    </Dialog.Container>
                </View>
            );
        }
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(NFC);
/* /Exports/ */
