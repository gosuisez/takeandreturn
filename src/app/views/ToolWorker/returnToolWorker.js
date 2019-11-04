/* Imports */
import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { Container, Content, Form, Item, Label } from 'native-base';
import moment from 'moment';
import validator from '@app/validation/validator';
import { AntDesign } from '@app/utils/Icons';
import { Button, Alert, NFC } from '@app/components/config';
import { withTheme} from '@app/theme/themeProvider';
import {responsives} from '@app/styles/config';
import {styles} from '@app/styles/config';
import db from "@app/utils/Database";
/* /Imports/ */

class returnToolWorker extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        const { navigation } = this.props;

        const worker_fname = navigation.getParam('worker_fname');
        const worker_sname = navigation.getParam('worker_sname');
        const worker_lname = navigation.getParam('worker_lname');
        const worker_email = navigation.getParam('worker_email');
        const tool_name = navigation.getParam('tool_name');
        const date_take = navigation.getParam('date_take');
        const hour_take = navigation.getParam('hour_take');
        const date_return = navigation.getParam('date_return');
        const hour_return = navigation.getParam('hour_return');

        this.state = {
            worker_fname: worker_fname,
            worker_sname: worker_sname,
            worker_lname: worker_lname,
            worker_email: worker_email,
            tool_name: tool_name,
            date_take: date_take,
            hour_take: hour_take,
            date_return: date_take,
            hour_return: hour_take,
            worker_pincode: '',
            worker_pincodeError: '',
            worker_fnameError: null,
            worker_snameError: null,
            worker_lnameError: null,
            worker_emailError: null,
            tool_nameError: null,
            date_takeError: null,
            hour_takeError: null,
            date_returnError: null,
            hour_returnError: null,
            isDateTimePickerVisibleOne: false,
            isDateTimePickerVisibleTwo: false,
            selectedDateTake: new Date(date_take),
            selectedDateReturn: new Date(date_take),
            selectedHourTake: new Date(),
            selectedHourReturn: new Date(),
            data: [],
            isNfcSupported: true,
            nfcTagValue: null,
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
            actions: [NavigationActions.navigate({ routeName: 'returnToolWorker', params: { worker_fname: this.state.worker_fname, worker_sname: this.state.worker_sname, worker_lname: this.state.worker_lname, worker_email: this.state.worker_email, tool_name: this.state.tool_name, date_take: this.state.date_take, hour_take: this.state.hour_take, date_return: this.state.date_return, hour_return: this.state.hour_return } })],
        });

        const goToToolsWorkers = NavigationActions.navigate({
            routeName: 'ToolsWorkersView',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(goToToolsWorkers);
    };
    /* /On Button Press Method - Reset Actions/ */

    /* Show Dialog Method - Here We Display Our Custom Alert */
    _showDialog = () => {
        this.setState({ dialogVisible: true });
    };
    /* /Show Dialog Method - Here We Display Our Custom Alert/ */

    /* Show Error Method - Here We Display Our Error Alert */
    _showError = () => {
        this.setState({ dialogError: true });
    };
    /* /Show Error Method - Here We Display Our Error Alert/ */

    componentDidMount() {
        this.props.navigation.setParams({ handleRemove: this._onButtonPress });

        NfcManager.start().catch(error => this.setState({isNfcSupported: false}));
        NfcManager.registerTagEvent();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            this.tagTouched(tag);
        });
    }

    componentWillUnmount() {
        NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
        NfcManager.unregisterTagEvent().catch(() => 0);
    }

    tagTouched(tag){
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_worker WHERE worker_pincode = ?', [tag.id], (tx, results) => {
                let worker = results.rows.item(0);

                if(worker) {
                    this.setState({ nfcTagValue: tag.id });
                }

                // console.log(worker.worker_fname);
                // let rows = results.rows.first();
                // this.setState({ worker: rows });
                // this.arrayholder = rows;
            })
        });
    }

    /* Show Date Picker Method - Show Picker Where You Can Select Date */
    _showDatePicker = () => this.setState({ isDateTimePickerVisibleOne: true });
    /* /Show Date Picker Method - Show Picker Where You Can Select Date/ */

    /* Hide Date Picker Method - Hide Picker */
    _hideDatePicker = () => this.setState({ isDateTimePickerVisibleOne: false });
    /* /Hide Date Picker Method - Hide Picker/ */

    /* Handle Date Picker - Date Picked */
    _handleDatePicker = (date) => {
        this.setState({ isDateTimePickerVisibleOne: false, date_return: moment(date).format('YYYY-MM-DD'), selectedDateReturn: date });

        if (this.state.date_take < this.state.date_return) {
            this.setState({ isDateTimePickerVisibleOne: false, date_return: this.state.date_return, selectedDateReturn: this.state.selectedDateReturn });
        }

        else {
            this.setState({ isDateTimePickerVisibleOne: false, date_return: this.state.date_take, selectedDateReturn: this.state.selectedDateTake, hour_return: this.state.hour_take, selectedHourReturn: this.state.selectedHourTake })
        }
    };
    /* /Handle Date Picker - Date Picked/ */

    /* Show Date Picker Second Method - Show Picker Where You Can Select Date */
    _showDatePickerSecond = () => this.setState({ isDateTimePickerVisibleTwo: true });
    /* /Show Date Picker Second Method - Show Picker Where You Can Select Date/ */

    /* Hide Date Picker Second Method - Hide Picker */
    _hideDatePickerSecond = () => this.setState({ isDateTimePickerVisibleTwo: false });
    /* /Hide Date Picker Second Method - Hide Picker/ */

    /* Handle Date Picker Second - Date Picked */
    _handleDatePickerSecond = (time) => {
        this.setState({ isDateTimePickerVisibleTwo: false, hour_return: moment(time).format('HH:mm'), selectedHourReturn: time });

        if (this.state.hour_take < this.state.hour_return) {
            this.setState({ isDateTimePickerVisibleTwo: false, hour_return: this.state.hour_return, selectedHourReturn: this.state.selectedHourReturn });
        }

        else if (this.state.date_return > this.state.date_take) {
            this.setState({ isDateTimePickerVisibleTwo: false, hour_return: this.state.hour_return, selectedHourReturn: this.state.selectedHourReturn });
        }

        else {
            this.setState({ isDateTimePickerVisibleTwo: false, hour_return: this.state.hour_take, selectedHourReturn: this.state.selectedHourTake });
        }
    };
    /* /Handle Date Picker Second - Date Picked/ */

    /* Get All Workers Method - Data For All Workers */
    _getAllWorkers = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_worker', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({ data: rows });
                this.arrayholder = rows;
            })
        });
    };
    /* /Get All Workers Method - Data For All Workers/ */

    /* Handle Return ToolWorker - Return ToolWorker */
    _handleReturn = () => {
        let that = this;

        const {tool_name, date_take, hour_take, date_return, hour_return, nfcTagValue } = this.state;
        const { navigation } = this.props;
        const worker_pincode = navigation.getParam('worker_pincode');

        let tool_nameError = validator('tool_name', tool_name);
        let date_takeError = validator('date_take', date_take);
        let hour_takeError = validator('hour_take', hour_take);
        let date_returnError = validator('date_return', date_return);
        let hour_returnError = validator('hour_return', hour_return);
        let worker_pincodeError = validator('worker_pincode', worker_pincode);
        let nfcTagValueError = validator('nfcTagValue', nfcTagValue);

        this.setState({
            tool_nameError: tool_nameError,
            date_takeError: date_takeError,
            hour_takeError: hour_takeError,
            date_returnError: date_returnError,
            hour_returnError: hour_returnError,
            worker_pincodeError: worker_pincodeError,
            nfcTagValueError: nfcTagValueError
        });

        if (!nfcTagValueError) {
        if (!tool_nameError) {
        if (!date_takeError) {
        if (!hour_takeError) {
        if (!date_returnError) {
        if (!hour_returnError) {
            let nfcTagValue = this.state.nfcTagValue;

            if (this.state.hour_take < this.state.hour_return)
            {
                this.setState({ hour_return: hour_take });
            }

            if (this.state.worker_pincode === worker_pincode || nfcTagValue === worker_pincode)
            {
                this.setState(() => ({ worker_pincodeError: null }));
                const { navigation } = this.props;
                const tool_worker_id = navigation.getParam('tool_worker_id');
                const tool_count = navigation.getParam('tool_count');
                const tool_id = navigation.getParam('tool_id');
                const worker_tiw = navigation.getParam('worker_tiw');
                const worker_riw = navigation.getParam('worker_riw');
                const worker_id = navigation.getParam('tool_id');

                db.transaction((tx) => {
                    tx.executeSql(
                        'UPDATE table_tools_workers SET checked = 1 WHERE tool_worker_id = ?', [tool_worker_id], (tx, results) => {
                            if (results.rowsAffected > 0) {
                                that._showDialog();
                                that.setState({disabled: true});
                                setTimeout(()=> { that.setState({disabled: false}); }, 5000);
                            } else {
                                that._showError();
                            }
                        }
                    );
                    tx.executeSql('UPDATE table_tools SET tool_count = ? + 1 WHERE tool_id = ?', [tool_count, tool_id]);
                    tx.executeSql('UPDATE table_worker SET worker_tiw = ? - 1 WHERE worker_id = ?', [worker_tiw, worker_id]);
                    tx.executeSql('UPDATE table_worker SET worker_riw = ? + 1 WHERE worker_id = ?', [worker_riw, worker_id]);
                });
            }

            else
            {
                this.setState(() => ({ worker_pincodeError: "Въведете парола на работника!" }));
                this.setState(() => ({ nfcTagValueError: "Сканирайте вашата карта!" }));
            }

            }}}}}}
    };
    /* /Handle Return ToolWorker - Return ToolWorker/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        const custom = styles(screenProps);

        return {
            title: "Връщане на инструмент",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { params.handleRemove() }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { worker_fnameError, worker_snameError, worker_lnameError, worker_emailError, nfcTagValueError,tool_nameError, date_takeError, hour_takeError, date_returnError, hour_returnError, dialogVisible, dialogError } = this.state;
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
                    <View style={responsive.toolWorkerFormBoxView}>
                        <View>
                            <Label style={custom.FormLabel}>Парола на работника:</Label>
                        </View>
                        <View>
                            <Item stackedLabel style={custom.FormItem}>
                                <TextInput style={custom.FormInput} keyboardType='default' maxLength={15} onChangeText={worker_pincode => this.setState({ worker_pincode })} secureTextEntry={true}/>
                            </Item>
                        </View>
                        <View>
                            {!!this.state.worker_pincodeError && (
                                <Text style={custom.errorMessages}>{this.state.worker_pincodeError}</Text>
                            )}
                        </View>
                    </View>
                </View>
            );
        }

        return (
            <Container>
                <Content style={responsive.toolWorkerFormReturn}>
                    <View style={responsive.toolWorkerFormReturnBox}>
                        <Form>
                            <View style={responsive.toolWorkerFormReturnBoxView}>
                                <View>
                                    <Label style={custom.FormLabel}>Име на работника:</Label>
                                </View>
                                <View>
                                    <Item stackedLabel style={custom.FormItem}>
                                        <TextInput style={custom.FormInput} keyboardType='default' maxLength={30} value={this.state.worker_fname} onChangeText={worker_fname => this.setState({ worker_fname })} editable={false}/>
                                    </Item>
                                </View>
                                <View>
                                    <Text style={custom.errorMessages}>{worker_fnameError ? worker_fnameError : null} </Text>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.toolWorkerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Презиме на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={30} value={this.state.worker_sname} onChangeText={worker_sname => this.setState({ worker_sname })} editable={false}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_snameError ? worker_snameError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.toolWorkerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Фамилия на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={30} value={this.state.worker_lname} onChangeText={worker_lname => this.setState({ worker_lname })} editable={false}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_lnameError ? worker_lnameError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.toolWorkerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Име на инструмента:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={30} value={this.state.tool_name} onChangeText={tool_name => this.setState({ tool_name })} editable={false}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{tool_nameError ? tool_nameError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.toolWorkerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Имейл на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='email-address' maxLength={255} value={this.state.worker_email} onChangeText={worker_email => this.setState({ worker_email })} editable={false}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_emailError ? worker_emailError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.toolWorkerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Дата на вземане:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={255} value={this.state.date_take} onChangeText={date_take => this.setState({ date_take })} editable={false}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{date_takeError ? date_takeError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.toolWorkerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Час на вземане:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={255} value={this.state.hour_take} onChangeText={hour_take => this.setState({ hour_take })} editable={false}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{hour_takeError ? hour_takeError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.scheduleFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Дата на връщане:</Label>
                                    </View>
                                    <View>
                                        <Text onPress={this._showDatePicker} style={custom.PartCalendarPicker}>{this.state.date_return}</Text>
                                        <DateTimePicker date={this.state.selectedDateReturn} mode={'date'} isVisible={this.state.isDateTimePickerVisibleOne} onConfirm={this._handleDatePicker} onCancel={this._hideDatePicker}/>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{date_returnError ? date_returnError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.scheduleFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Час на връщане:</Label>
                                    </View>
                                    <View>
                                        <Text onPress={this._showDatePickerSecond} style={custom.PartCalendarPicker}>{this.state.hour_return}</Text>
                                        <DateTimePicker date={this.state.selectedHourReturn} mode={'time'} isVisible={this.state.isDateTimePickerVisibleTwo} onConfirm={this._handleDatePickerSecond} onCancel={this._hideDatePickerSecond}/>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{hour_returnError ? hour_returnError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            {passwordField}
                            <View style={custom.FormButtonSpacing}>
                                <Button title="Върнете" customClick={this._handleReturn.bind(this)} disabled={this.state.disabled}/>
                            </View>
                        </Form>
                    </View>
                    <View>
                        <Alert title={'Успешно'} body={'Вие върнахте инструмента успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"OK"} second={""}/>
                    </View>
                    <View>
                        <Alert title={'Грешка'} body={'При връщането на инструмент нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                </Content>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(returnToolWorker);
