/* Imports */
import React, { Component } from 'react';
import {View, Text, Picker, TextInput} from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import {Container, Content, Form, Item, Label} from 'native-base';
import moment from 'moment';
import { AntDesign } from '@app/utils/Icons';
import { Button, Alert, NFC } from '@app/components/config';
import validator from '@app/validation/validator';
import { withTheme} from '@app/theme/themeProvider';
import {responsives} from '@app/styles/config';
import {styles} from '@app/styles/config';
import db from "@app/utils/Database";
/* /Imports/ */

class createSchedule extends Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const date_pick = navigation.getParam('date_pick');
        const hour_from = navigation.getParam('hour_from');
        const date_to = navigation.getParam('date_to');
        const hour_to = navigation.getParam('hour_to');

        this.state = {
            pickedName: {
                worker_id: '',
                worker_fname: '',
                worker_sname: '',
                worker_lname: '',
                worker_tiw: '',
                worker_pincode: '',
                worker_fnameError: null,
                worker_snameError: null,
                worker_lnameError: null
            },
            isDateTimePickerVisible: false,
            isDateTimePickerVisibleTwo: false,
            isDateTimePickerVisibleThree: false,
            isDateTimePickerVisibleFour: false,
            date_from: date_pick,
            date_fromError: null,
            hour_from: hour_from,
            hour_fromError: '',
            date_to: date_to,
            date_toError: null,
            hour_to: hour_to,
            hour_toError: '',
            data: [],
            selectedDateFrom: new Date(date_pick),
            selectedDateTo: new Date(date_to),
            selectedHourFrom: new Date(),
            selectedHourTo: new Date(),
            isNfcSupported: true,
            nfcTagValue: null,
            dialogVisible: false,
            dialogError: false,
            disabled: false
        };

        this.arrayholder = [];

        this._getAllWorkers();
        this._onButtonPress = this._onButtonPress.bind(this);
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* On Button Press Method - Reset Actions */
    _onButtonPress = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'createSchedule', params: { date_pick: this.state.date_from, hour_from: this.state.hour_from, date_to: this.state.date_to, hour_to: this.state.hour_to } })]
        });

        const goToSchedule = NavigationActions.navigate({
            routeName: 'Schedule',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(goToSchedule);
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

    /* Show Date Picker Method - Show Picker Where You Can Select Date */
    _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
    /* /Show Date Picker Method - Show Picker Where You Can Select Date/ */

    /* Hide Date Picker Method - Hide Picker */
    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
    /* /Hide Date Picker Method - Hide Picker/ */

    /* Handle Date Picker - Date Picked */
    _handleDatePickedOne = (date) => {
        this.setState({ isDateTimePickerVisible: false, date_from: moment(date).format('YYYY-MM-DD'), selectedDateFrom: date });

        if (this.state.date_from) {
            this.setState({ isDateTimePickerVisible: false, date_to: this.state.date_from, selectedDateTo: this.state.selectedDateFrom });
        }
    };
    /* /Handle Date Picker - Date Picked/ */

    /* Show Date Picker Two Method - Show Picker Where You Can Select Date */
    _showDateTimePickerTwo = () => this.setState({ isDateTimePickerVisibleTwo: true });
    /* /Show Date Picker Two Method - Show Picker Where You Can Select Date/ */

    /* Hide Date Picker Two Method - Hide Picker */
    _hideDateTimePickerTwo = () => this.setState({ isDateTimePickerVisibleTwo: false });
    /* /Hide Date Picker Two Method - Hide Picker/ */

    /* Handle Date Picker Two - Date Picked */
    _handleDatePickedTwo = (date) => {
        this.setState({ isDateTimePickerVisibleTwo: false, date_to: moment(date).format('YYYY-MM-DD'), selectedDateTo: date });

        if (this.state.date_from < this.state.date_to) {
            this.setState({ isDateTimePickerVisibleTwo: false, date_to: this.state.date_to, selectedDateTo: this.state.selectedDateTo });
        }

        else {
            this.setState({ isDateTimePickerVisibleTwo: false, date_to: this.state.date_from, selectedDateTo: this.state.selectedDateFrom, hour_to: this.state.hour_from, selectedHourTo: this.state.selectedHourFrom });
        }
    };
    /* /Handle Date Picker Two - Date Picked/ */

    /* Show Time Picker Three Method - Show Picker Where You Can Select Time */
    _showDateTimePickerThree = () => this.setState({ isDateTimePickerVisibleThree: true });
    /* /Show Time Picker Three Method - Show Picker Where You Can Select Time/ */

    /* Hide Time Picker Three Method - Hide Picker */
    _hideDateTimePickerThree = () => this.setState({ isDateTimePickerVisibleThree: false });
    /* /Hide Time Picker Three Method - Hide Picker/ */

    /* Handle Time Picker Three - Time Picked */
    _handleDatePickedThree = (time) => {
        this.setState({ isDateTimePickerVisibleThree: false, hour_from: moment(time).format('HH:mm'), selectedHourFrom: time });

        if (this.state.hour_from) {
            this.setState({ isDateTimePickerVisibleTwo: false, hour_to: this.state.hour_from, selectedHourTo: this.state.selectedHourFrom });
        }
    };
    /* /Handle Time Picker Three - Time Picked/ */

    /* Show Time Picker Four Method - Show Picker Where You Can Select Time */
    _showDateTimePickerFour = () => this.setState({ isDateTimePickerVisibleFour: true });
    /* /Show Time Picker Four Method - Show Picker Where You Can Select Time/ */

    /* /Hide Time Picker Four Method - Hide Picker/ */
    _hideDateTimePickerFour = () => this.setState({ isDateTimePickerVisibleFour: false });
    /* /Hide Time Picker Four Method - Hide Picker/ */

    /* Handle Time Picker Four - Time Picked */
    _handleDatePickedFour = (time) => {
        this.setState({ isDateTimePickerVisibleFour: false, hour_to: moment(time).format('HH:mm'), selectedHourTo: time });

        if (this.state.hour_from < this.state.hour_to) {
            this.setState({ isDateTimePickerVisibleFour: false, hour_to: this.state.hour_to, selectedHourTo: this.state.selectedHourTo });
        }

        else if (this.state.date_to > this.state.date_from) {
            this.setState({ isDateTimePickerVisibleFour: false, hour_to: this.state.hour_to, selectedHourTo: this.state.selectedHourTo });
        }

        else {
            this.setState({ isDateTimePickerVisibleFour: false, hour_to: this.state.hour_from, selectedHourTo: this.state.selectedHourFrom });
        }
    };
    /* /Handle Time Picker Four - Time Picked/ */

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
                    console.log("Updating state");
                    this.setState({ pickedName: worker});
                    this.setState({ nfcTagValue: tag.id });
                }

                // console.log(worker.worker_fname);
                // let rows = results.rows.first();
                // this.setState({ worker: rows });
                // this.arrayholder = rows;
            })
        });
    }

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

    getWorkerFromId(id){
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_worker WHERE worker_id = ?', [id], (tx, results) => {
                let worker = results.rows.item(0);

                if(worker){
                    this.setState({ pickedName: worker });
                    this.setState({ nfcTagValue: tag.id });
                }
            })
        });
    }

    _handleCreate = () => {
        let that = this;

        const { date_from, hour_from, date_to, hour_to, nfcTagValue } = this.state;

        const worker_id = this.state.pickedName.worker_id;
        const worker_fname = this.state.pickedName.worker_fname;
        const worker_sname = this.state.pickedName.worker_sname;
        const worker_lname = this.state.pickedName.worker_lname;
        const worker_pincode = this.state.pickedName.worker_pincode;

        let worker_fnameError = validator('worker_fname', worker_fname);
        let worker_snameError = validator('worker_sname', worker_sname);
        let worker_lnameError = validator('worker_lname', worker_lname);
        let worker_pincodeError = validator('worker_pincode', worker_pincode);
        let nfcTagValueError = validator('nfcTagValue', nfcTagValue);
        let date_fromError = validator('date_from', date_from);
        let hour_fromError = validator('hour_from', hour_from);
        let date_toError = validator('date_to', date_to);
        let hour_toError = validator('hour_to', hour_to);

        this.setState({worker_fnameError: worker_fnameError, worker_snameError: worker_snameError, worker_lnameError: worker_lnameError, worker_pincodeError: worker_pincodeError, nfcTagValueError: nfcTagValueError, date_fromError: date_fromError, date_toError: date_toError, hour_fromError: hour_fromError, hour_toError: hour_toError});

        if (!worker_fnameError) {
        if (!worker_snameError) {
        if (!worker_lnameError) {
        if (!worker_pincodeError) {
        if (!nfcTagValueError) {
        if (!date_fromError) {
        if (!hour_fromError) {
        if (!date_toError) {
        if (!hour_toError) {
            let nfcTagValue = this.state.nfcTagValue;

            if (this.state.worker_pincode === worker_pincode || nfcTagValue === worker_pincode) {
                db.transaction(function (tx) {
                    tx.executeSql(
                        'INSERT INTO table_schedule_workers (worker_id, date_from, hour_from, date_to, hour_to) VALUES (?, ?, ?, ?, ?)', [worker_id, date_from, hour_from, date_to, hour_to], (tx, results) => {
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
            }

            else {
                this.setState(() => ({ worker_pincodeError: "Въведете парола на работника!" }));
            }

        }}}}}}}}}

        else if (!nfcTagValue) {
            this.setState(() => ({ nfcTagValueError: "Сканирайте вашата карта!" }));
        }
    };

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        const custom = styles(screenProps);

        return {
            title: "Добавяне на график на работник",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { params.handleRemove() }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { pickedName, worker_fnameError, worker_snameError, worker_lnameError, worker_pincodeError, nfcTagValueError, date_fromError, hour_fromError, date_toError, hour_toError, dialogVisible, dialogError } = this.state;
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
                <Content style={responsive.scheduleForm}>
                    <View style={responsive.scheduleFormBox}>
                        <Form>
                            <View style={responsive.scheduleFormBoxView}>
                                <View>
                                    <Label style={custom.FormLabel}>Име на работник:</Label>
                                </View>
                                <View>
                                    <Picker selectedValue={pickedName.worker_id} onValueChange={(itemValue) => this.getWorkerFromId(itemValue)} mode={"dialog"}>
                                        <Picker.Item key={0} label={'Изберете име на работника'} value={''}/>
                                        {this.state.data.map((item, key) => ( <Picker.Item label={item.worker_fname} value={item.worker_id} key={key}/> ))}
                                    </Picker>
                                </View>
                                <View>
                                    <Text style={custom.errorMessages}>{worker_fnameError ? worker_fnameError : null} </Text>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.scheduleFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Презиме на работник:</Label>
                                    </View>
                                    <View>
                                        <Picker selectedValue={pickedName.worker_id} onValueChange={(itemValue) => this.getWorkerFromId(itemValue)} mode={"dialog"}>
                                            <Picker.Item key={0} label={'Изберете презиме на работника'} value={''}/>
                                            {this.state.data.map((item, key) => ( <Picker.Item label={item.worker_sname} value={item.worker_id} key={key}/> ))}
                                        </Picker>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_snameError ? worker_snameError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.scheduleFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Фамилия на работник:</Label>
                                    </View>
                                    <View>
                                        <Picker selectedValue={pickedName.worker_id} onValueChange={(itemValue) => this.getWorkerFromId(itemValue)} mode={"dialog"}>
                                            <Picker.Item key={0} label={'Изберете фамилия на работника'} value={''}/>
                                            {this.state.data.map((item, key) => ( <Picker.Item label={item.worker_lname} value={item.worker_id} key={key}/> ))}
                                        </Picker>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_lnameError ? worker_lnameError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.scheduleFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Дата на започване:</Label>
                                    </View>
                                    <View>
                                        <Text style={custom.PartCalendarPicker} onPress={this._showDateTimePicker}>{this.state.date_from}</Text>
                                        <DateTimePicker date={this.state.selectedDateFrom} mode={'date'} isVisible={this.state.isDateTimePickerVisible} onConfirm={this._handleDatePickedOne} onCancel={this._hideDateTimePicker}/>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{date_fromError ? date_fromError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.scheduleFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Час на започване:</Label>
                                    </View>
                                    <View>
                                        <Text style={custom.PartCalendarPicker} onPress={this._showDateTimePickerThree}>{this.state.hour_from}</Text>
                                        <DateTimePicker date={this.state.selectedHourFrom} mode={'time'} isVisible={this.state.isDateTimePickerVisibleThree} onConfirm={this._handleDatePickedThree} onCancel={this._hideDateTimePickerThree}/>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{hour_fromError ? hour_fromError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.scheduleFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Дата на приключване:</Label>
                                    </View>
                                    <View>
                                        <Text style={custom.PartCalendarPicker} onPress={this._showDateTimePickerTwo}>{this.state.date_to}</Text>
                                        <DateTimePicker date={this.state.selectedDateTo} mode={'date'} isVisible={this.state.isDateTimePickerVisibleTwo} onConfirm={this._handleDatePickedTwo} onCancel={this._hideDateTimePickerTwo}/>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{date_toError ? date_toError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.scheduleFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Час на приключване:</Label>
                                    </View>
                                    <View>
                                        <Text style={custom.PartCalendarPicker} onPress={this._showDateTimePickerFour}>{this.state.hour_to}</Text>
                                        <DateTimePicker date={this.state.selectedHourTo} mode={'time'} isVisible={this.state.isDateTimePickerVisibleFour} onConfirm={this._handleDatePickedFour} onCancel={this._hideDateTimePickerFour}/>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{hour_toError ? hour_toError : null} </Text>
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
                        <Alert title={'Успешно'} body={'Вие добавихте графика на работника успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"OK"} second={""}/>
                    </View>
                    <View>
                        <Alert title={'Грешка'} body={'При добавянето на графика на работника нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                </Content>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(createSchedule);
