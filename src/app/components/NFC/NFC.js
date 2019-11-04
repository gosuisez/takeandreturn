import React from 'react';
import { Text, View } from 'react-native';
import Dialog from "react-native-dialog";
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import VideoPlayer from 'react-native-video-controls';
import { withTheme} from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';

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

    showDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    componentDidMount() {
        NfcManager.start().catch(error => this.setState({isNfcSupported: false}));
        NfcManager.registerTagEvent();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => { this.setState({ nfcTagValue: tag.id})});
    }

    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }

    render() {
        let text;

        const custom = styles(this.props);

        if(this.props.isScanned){
            text = "Успешно сканирахте картата си.";

            return (
                <View>
                    <Text style={custom.NFCText}>{ text }</Text>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title style={custom.NFCTitle}>Как да сканираме картата си?</Dialog.Title>
                        <Dialog.Description style={custom.NFCDescription}>За да сканираме картата си ние трябва да вземем картата и да я поставим на NFC-четеца на нашия телефон.</Dialog.Description>
                        <Dialog.Description style={custom.NFCStatus}>Статус: {text}</Dialog.Description>
                        <VideoPlayer source={require('@app/components/NFC/NFC.mp4')} toggleResizeModeOnFullscreen={false} disableBack={true} disablePlayPause={true} disableTimer={true} disableVolume={true} disableSeekbar={true} disableFullscreen={true} style={custom.NFCAnimation} repeat={true}/>
                        <Dialog.Button label="OK" style={custom.NFCButton} onPress={this.handleCancel}/>
                    </Dialog.Container>
                </View>
            );
        } else{
            text = "Сканирайте вашата карта.";

            return (
                <View>
                    <Text style={custom.NFCText} onPress={this.showDialog}>Как да сканираме картата си?</Text>
                    <Dialog.Container visible={this.state.dialogVisible}>
                        <Dialog.Title style={custom.NFCTitle}>Как да сканираме картата си?</Dialog.Title>
                        <Dialog.Description style={custom.NFCDescription}>За да сканираме картата си ние трябва да вземем картата и да я поставим на NFC-четеца на нашия телефон.</Dialog.Description>
                        <Dialog.Description style={custom.NFCStatus}>Статус: {text}</Dialog.Description>
                        <VideoPlayer source={require('@app/components/NFC/NFC.mp4')} toggleResizeModeOnFullscreen={false} disableBack={true} disablePlayPause={true} disableTimer={true} disableVolume={true} disableSeekbar={true} disableFullscreen={true} style={custom.NFCAnimation} repeat={true}/>
                        <Dialog.Button label="OK" style={custom.NFCButton} onPress={this.handleCancel}/>
                    </Dialog.Container>
                </View>
            );
        }
    }
}

export default withTheme(NFC);
