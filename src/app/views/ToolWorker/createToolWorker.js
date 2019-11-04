/* Imports */
import React from 'react';
import {View, Text, Picker, TextInput } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import NfcManager, { NfcEvents } from 'react-native-nfc-manager';
import { Container, Content, Form, Label, Item } from 'native-base';
import moment from 'moment';
import validator from '@app/validation/validator';
import { AntDesign } from '@app/utils/Icons';
import { Button, Alert, NFC } from '@app/components/config';
import { withTheme } from '@app/theme/themeProvider';
import {responsives} from '@app/styles/config';
import {styles} from '@app/styles/config';
import db from "@app/utils/Database";
/* /Imports/ */

class createToolWorker extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const date_take = navigation.getParam('date_take');
        const hour_take = navigation.getParam('hour_take');

        this.state = {
            pickedName: {
                worker_id: '',
                worker_fname: '',
                worker_sname: '',
                worker_lname: '',
                worker_email: '',
                worker_pincode: '',
                worker_tiw: '',
                schedule_id: '',
                worker_fnameError: null,
                worker_snameError: null,
                worker_lnameError: null,
            },
            pickedTool: {
                tool_name: '',
                tool_nameError: null,
                tool_count: '',
                tool_countError: '',
            },
            data: [],
            dataTwo: [],
            isLoading: true,
            isLoadingTwo: true,
            isDateTimePickerVisible: false,
            isDateTimePickerVisibleTwo: false,
            date_take: date_take,
            date_takeError: null,
            hour_take: hour_take,
            hour_takeError: null,
            selectedDateTake: new Date(date_take),
            selectedHourTake: new Date(),
            isNfcSupported: true,
            nfcTagValue: null,
            dialogVisible: false,
            dialogError: false,
            disabled: false
        };

        this.arrayholder = [];

        this._getAllWorkers();
        this._getAllTools();
        this._onButtonPress = this._onButtonPress.bind(this);
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* On Button Press Method - Reset Actions */
    _onButtonPress = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'createToolWorker', params: { date_take: this.state.date_take, hour_take: this.state.hour_take } })],
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

    /* Component Did Mount Method - Here We Apply On Button Press With Navigation */
    componentDidMount() {
        this.props.navigation.setParams({ handleRemove: this._onButtonPress });

        NfcManager.start().catch(error => this.setState({isNfcSupported: false}));
        NfcManager.registerTagEvent();
        NfcManager.setEventListener(NfcEvents.DiscoverTag, tag => {
            this.tagTouched(tag);
        });
    };
    /* /Component Did Mount Method - Here We Apply On Button Press With Navigation/ */

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

    /* Get All Tools Method - Data For All Tools */
    _getAllTools = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_tools', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({ dataTwo: rows });
                this.arrayholder = rows;
            })
        });
    };
    /* /Get All Tools Method - Data For All Tools/ */

    /* Show Date Picker Method - Show Picker Where You Can Select Date */
    _showDatePicker = () => this.setState({ isDateTimePickerVisible: true });
    /* /Show Date Picker Method - Show Picker Where You Can Select Date/ */

    /* Hide Date Picker Method - Hide Picker */
    _hideDatePicker = () => this.setState({ isDateTimePickerVisible: false });
    /* /Hide Date Picker Method - Hide Picker/ */

    /* Handle Date Picker - Date Picked */
    _handleDatePicker = (date) => {
        this.setState({ isDateTimePickerVisible: false, date_take: moment(date).format('YYYY-MM-DD'), selectedDateTake: date });
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
        this.setState({ isDateTimePickerVisibleTwo: false, hour_take: moment(time).format('HH:mm'), selectedHourTake: time });
    };
    /* /Handle Date Picker Second - Date Picked/ */

    /* Handle Create ToolWorker - Create New ToolWorker */
    _handleCreate = () => {
        let that = this;

        const { nfcTagValue } = this.state;

        const worker_id = this.state.pickedName.worker_id;
        const worker_fname  = this.state.pickedName.worker_fname;
        const worker_sname  = this.state.pickedName.worker_sname;
        const worker_lname = this.state.pickedName.worker_lname;
        const worker_pincode = this.state.pickedName.worker_pincode;
        const worker_tiw = this.state.pickedName.worker_tiw;

        const tool_id = this.state.pickedTool.tool_id;
        const tool_name = this.state.pickedTool.tool_name;
        const tool_count = this.state.pickedTool.tool_count;

        const date_take = this.state.date_take;
        const hour_take = this.state.hour_take;

        let worker_fnameError = validator('worker_fname', worker_fname);
        let worker_snameError = validator('worker_sname', worker_sname);
        let worker_lnameError = validator('worker_lname', worker_lname);
        let tool_nameError = validator('tool_name', tool_name);
        let date_takeError = validator('date_take', date_take);
        let hour_takeError = validator('hour_take', hour_take);
        let worker_pincodeError = validator('worker_pincode', worker_pincode);
        let nfcTagValueError = validator('nfcTagValue', nfcTagValue);

        this.setState({
            tool_nameError: tool_nameError,
            date_takeError: date_takeError,
            hour_takeError: hour_takeError,
            worker_fnameError:worker_fnameError,
            worker_snameError: worker_snameError,
            worker_lnameError: worker_lnameError,
            worker_pincodeError: worker_pincodeError,
            nfcTagValueError: nfcTagValueError
        });

        if (!worker_fnameError) {
        if (!worker_snameError) {
        if (!worker_lnameError) {
        if (!nfcTagValueError) {
        if (!tool_nameError) {
        if (!date_takeError) {
        if (!hour_takeError) {
            let nfcTagValue = this.state.nfcTagValue;

            if (tool_count < 1) {
                this.setState(() => ({ tool_nameError: "Няма брой от този инструмент!" }));
            }

            else if(tool_count >= 1 && this.state.worker_pincode === worker_pincode || nfcTagValue === worker_pincode) {
                db.transaction(function (tx) {
                    tx.executeSql(
                        'INSERT INTO table_tools_workers (worker_id, tool_id, date_take, hour_take) VALUES (?, ?, ?, ?)',
                        [worker_id, tool_id, date_take, hour_take],
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
                    tx.executeSql('UPDATE table_tools SET tool_count = ? - 1 WHERE tool_id = ?', [tool_count, tool_id]);
                    tx.executeSql('UPDATE table_worker SET worker_tiw = ? + 1 WHERE worker_id = ?', [worker_tiw, worker_id]);
                });
            }
            else {
                this.setState(() => ({ worker_pincodeError: "Въведете парола на работника!" }));
            }
        }}}}}}}

        else if (!nfcTagValue) {
            this.setState(() => ({ nfcTagValueError: "Сканирайте вашата карта!" }));
        }
    };
    /* /Handle Create ToolWorker - Create New ToolWorker/ */

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

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        const custom = styles(screenProps);

        return {
            title: "Вземане на инструмент",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { params.handleRemove() }} style={custom.headerLeft} />
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { pickedName, worker_fnameError, worker_snameError, worker_lnameError, nfcTagValueError, pickedTool, tool_nameError, date_takeError, hour_takeError, worker_pincodeError, dialogVisible, dialogError } = this.state;
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
                <Content style={responsive.toolWorkerForm}>
                    <View style={responsive.toolWorkerFormBox}>
                        <Form>
                            <View style={responsive.toolWorkerFormBoxView}>
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
                                <View style={responsive.toolWorkerFormBoxView}>
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
                                <View style={responsive.toolWorkerFormBoxView}>
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
                                <View style={responsive.toolWorkerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Име на инструмент:</Label>
                                    </View>
                                    <View>
                                        <Picker selectedValue={pickedTool} onValueChange={(itemValue) => this.setState({ pickedTool: itemValue })} mode={"dialog"}>
                                            <Picker.Item key={0} label={'Изберете име на инструмента'} value={''}/>
                                            {this.state.dataTwo.map((item, key) => ( <Picker.Item label={item.tool_name} value={item} key={key}/> ))}
                                        </Picker>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{tool_nameError ? tool_nameError : null} </Text>
                                        {!!this.state.tool_countError && (
                                            <Text style={custom.errorMessages}>{this.state.tool_countError}</Text>
                                        )}
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.scheduleFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Дата на вземане:</Label>
                                    </View>
                                    <View>
                                        <Text onPress={this._showDatePicker} style={custom.PartCalendarPicker}>{this.state.date_take}</Text>
                                        <DateTimePicker date={this.state.selectedDateTake} mode={'date'} isVisible={this.state.isDateTimePickerVisible} onConfirm={this._handleDatePicker} onCancel={this._hideDatePicker}/>
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
                                        <Text onPress={this._showDatePickerSecond} style={custom.PartCalendarPicker}>{this.state.hour_take}</Text>
                                        <DateTimePicker date={this.state.selectedHourTake} mode={'time'} isVisible={this.state.isDateTimePickerVisibleTwo} onConfirm={this._handleDatePickerSecond} onCancel={this._hideDatePickerSecond}/>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{hour_takeError ? hour_takeError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            {passwordField}
                            <View style={custom.FormButtonSpacing}>
                                <Button title="Вземете" customClick={this._handleCreate.bind(this)} disabled={this.state.disabled}/>
                            </View>
                        </Form>
                    </View>
                    <View>
                        <Alert title={'Успешно'} body={'Вие взехте инструмента успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"OK"} second={""}/>
                    </View>
                    <View>
                        <Alert title={'Грешка'} body={'При вземането на инструмент нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                </Content>
            </Container>

        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(createToolWorker);
