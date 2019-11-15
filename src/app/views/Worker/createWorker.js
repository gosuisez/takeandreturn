/* Imports */
import React from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { View, Text, TextInput } from 'react-native';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { Container, Content, Form, Label, Item } from 'native-base';
import validator from '@app/validation/validator';
import { Button, Alert, NFC } from '@app/components/config';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
import db from "@app/utils/Database";
/* /Imports/ */

class createWorker extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            worker_fname: '',
            worker_sname: '',
            worker_lname: '',
            worker_email: '',
            worker_mobile: '',
            worker_address: '',
            worker_pincode: '',
            isNfcSupported: true,
            worker_fnameError: null,
            worker_snameError: null,
            worker_lnameError: null,
            worker_emailError: null,
            worker_mobileError: null,
            worker_addressError: null,
            worker_pincodeError: null,
            dialogVisible: false,
            dialogError: false,
            disabled: false
        };

        this._onButtonPress = this._onButtonPress.bind(this);
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* On Button Press Method - Reset Actions */
    _onButtonPress = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'createWorker' })]
        });

        const goToWorkers = NavigationActions.navigate({
            routeName: 'Workers',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(goToWorkers);
    };
    /* /On Button Press Method - Reset Actions/ */

    //* Show Dialog Method - Here We Display Our Custom Alert */
    _showDialog = () => {
        this.setState({ dialogVisible: true });
    };
    /* /Show Dialog Method - Here We Display Our Custom Alert/ */

    /* Show Error Method - Here We Display Our Error Alert */
    _showError = () => {
        this.setState({ dialogError: true });
    };
    /* /Show Error Method - Here We Display Our Error Alert/ */

    /* Component Did Mount Method - Here We Mount Component - Data */
    componentDidMount() {
        this.props.navigation.setParams({ handleRemove: this._onButtonPress });

        NfcManager.start().catch(error => this.setState({isNfcSupported: false}));
        NfcManager.registerTagEvent();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => { this.setState({ nfcTagValue: tag.id})});
    }
    /* /Component Did Mount Method - Here We Mount Component - Data/ */

    /* Component Will Unmount Method - Here We Unmount Component - Data */
    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }
    /* /Component Will Unmount Method - Here We Unmount Component - Data/ */

    /* Handle Create Worker - Create New Worker */
    _handleCreate = () => {
        let that = this;

        const { worker_fname, worker_sname, worker_lname, worker_email, worker_mobile, worker_address, worker_pincode, nfcTagValue } = this.state;

        let worker_fnameError = validator('worker_fname', worker_fname);
        let worker_snameError = validator('worker_sname', worker_sname);
        let worker_lnameError = validator('worker_lname', worker_lname);
        let worker_emailError = validator('worker_email', worker_email);
        let worker_mobileError = validator('worker_mobile', worker_mobile);
        let worker_addressError = validator('worker_address', worker_address);
        let worker_pincodeError = validator('worker_pincode', worker_pincode);
        let nfcTagValueError = validator('nfcTagValue', nfcTagValue);

        this.setState({
            worker_fnameError: worker_fnameError,
            worker_snameError: worker_snameError,
            worker_lnameError: worker_lnameError,
            worker_emailError: worker_emailError,
            worker_mobileError: worker_mobileError,
            worker_addressError: worker_addressError,
            worker_pincodeError: worker_pincodeError,
            nfcTagValueError: nfcTagValueError
        });

        if (!worker_fnameError) {
        if (!worker_snameError) {
        if (!worker_lnameError) {
        if (!worker_emailError) {
        if (!worker_mobileError) {
        if (!worker_addressError) {
        if (!worker_pincodeError || nfcTagValue) {
            db.transaction(function (tx) {
                tx.executeSql(
                    'INSERT INTO table_worker (worker_fname, worker_sname, worker_lname, worker_email, worker_mobile, worker_address, worker_pincode) VALUES (?,?,?,?,?,?,?)',
                    [worker_fname, worker_sname, worker_lname, worker_email, worker_mobile, worker_address, (nfcTagValue ? nfcTagValue : worker_pincode)],
                    (tx, results) => {
                        if (results.rowsAffected > 0) {
                            that._showDialog();
                            that.setState({disabled: true});
                            setTimeout(()=> { that.setState({disabled: false}); }, 5000);
                        } else {
                            that._showError();
                        }
                    }
                );
            });
        }}}}}}}

        else if (!nfcTagValue) {
            this.setState(() => ({ nfcTagValueError: "Сканирайте вашата карта!" }));
        }
    };

    /* /Handle Create Worker - Create New Worker/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Добавяне на работник",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: responsive.headerTitleStyle,
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { params.handleRemove() }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { worker_fnameError, worker_snameError, worker_lnameError, worker_emailError, worker_mobileError, worker_addressError, worker_pincodeError, nfcTagValueError, dialogVisible, dialogError} = this.state;

        const responsive = responsives(this.props);
        const custom = styles(this.props);

        let passwordField;

        if(this.state.isNfcSupported){
            passwordField = (
                <View>
                    <View style={custom.NFCView}>
                        <NFC isScanned={this.state.nfcTagValue != null}/>
                    </View>
                    <View>
                        <Text style={custom.NFCErrorText}>{nfcTagValueError ? nfcTagValueError : null} </Text>
                    </View>
                </View>
            );
        } else{
            passwordField = (
                <View style={custom.FormFieldSpacing}>
                    <View style={responsive.workerFormBoxView}>
                        <View>
                            <Label style={custom.FormLabel}>Парола на работника:</Label>
                        </View>
                        <View>
                            <Item stackedLabel style={custom.FormItem}>
                                <TextInput style={custom.FormInput} keyboardType='default' maxLength={15} onChangeText={worker_pincode => this.setState({ worker_pincode })} secureTextEntry={true}/>
                            </Item>
                        </View>
                        <View>
                            <Text style={custom.errorMessages}>{worker_pincodeError ? worker_pincodeError : null} </Text>
                        </View>
                    </View>
                </View>
            );
        }

        return (
            <Container>
                <Content style={responsive.workerForm}>
                    <View style={responsive.workerFormBox}>
                        <Form>
                            <View style={responsive.workerFormBoxView}>
                                <View>
                                    <Label style={custom.FormLabel}>Име на работника:</Label>
                                </View>
                                <View>
                                    <Item stackedLabel style={custom.FormItem}>
                                        <TextInput style={custom.FormInput} keyboardType='default' maxLength={30} onChangeText={worker_fname => this.setState({ worker_fname })}/>
                                    </Item>
                                </View>
                                <View>
                                    <Text style={custom.errorMessages}>{worker_fnameError ? worker_fnameError : null} </Text>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.workerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Презиме на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={30} onChangeText={worker_sname => this.setState({ worker_sname })}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_snameError ? worker_snameError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.workerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Фамилия на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={30} onChangeText={worker_lname => this.setState({ worker_lname })}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_lnameError ? worker_lnameError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.workerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Имейл на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='email-address' maxLength={255} onChangeText={worker_email => this.setState({ worker_email })}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_emailError ? worker_emailError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.workerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Телефон на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='numeric' maxLength={16} onChangeText={worker_mobile => this.setState({ worker_mobile })}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_mobileError ? worker_mobileError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.workerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Адрес на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormTextArea}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={200} multiline={true} numberOfLines={10} onChangeText={worker_address => this.setState({ worker_address })}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_addressError ? worker_addressError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            {passwordField}
                            <View style={custom.FormButtonSpacing}>
                                <Button title="Добавете" customClick={this._handleCreate.bind(this)} disabled={this.state.disabled}/>
                            </View>
                        </Form>
                    </View>
                    <View>
                        <Alert title={'Успешно'} body={'Вие добавихте работника успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"OK"} second={""}/>
                    </View>
                    <View>
                        <Alert title={'Грешка'} body={'При добавянето на работник нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                </Content>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(createWorker);
/* /Exports/ */
