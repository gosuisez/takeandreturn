/* Imports */
import React, { Component } from 'react';
import { View, Text, TextInput, Picker } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Container, Content, Form, Item, Label } from 'native-base';
import moment from 'moment';
import { AntDesign } from '@app/utils/Icons';
import { Button, Alert } from '@app/components/config';
import validator from '@app/validation/validator';
import db from "@app/utils/Database";
import { withTheme} from '@app/theme/themeProvider';
import {responsives} from '@app/styles/config';
import {styles} from '@app/styles/config';
/* /Imports/ */

class createAbsence extends Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const date_absence = navigation.getParam('date_absence');

        this.state = {
            pickedName: {
                worker_id: '',
                worker_fname: '',
                worker_sname: '',
                worker_lname: '',
                worker_tiw: '',
                worker_fnameError: null,
                worker_snameError: null,
                worker_lnameError: null,
            },
            worker_reason: '',
            isDatePickerVisible: false,
            date_absence: date_absence,
            date_absenceError: null,
            data: [],
            selected: new Date(date_absence),
            dialogVisible: false,
            dialogError: false,
            disabled: false
        };

        this._getAllWorkers();
        this._onButtonPress = this._onButtonPress.bind(this);
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* On Button Press Method - Reset Actions */
    _onButtonPress = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'createAbsence', params: { date_absence: this.state.date_absence, selected: this.state.selected } })]
        });

        const goToSchedule = NavigationActions.navigate({
            routeName: 'Absences',
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

    /* Component Did Mount Method - Here We Apply On Button Press With Navigation */
    componentDidMount() {
        this.props.navigation.setParams({ handleRemove: this._onButtonPress });
    }
    /* Component Did Mount Method - Here We Apply On Button Press With Navigation */

    /* Get All Workers Method - Data Workers */
    _getAllWorkers = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_worker', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({ data: rows });
                this.arrayholder = rows;
            })
        });
    };
    /* /Get All Workers Method - Data Workers/ */

    /* Show Date Time Picker Method - Show Picker Where You Can Select Date And Time */
    _showDatePicker = () => this.setState({ isDatePickerVisible: true });
    /* /Show Date Time Picker Method - Show Picker Where You Can Select Date And Time/ */

    /* Hide Date Time Picker Method - Hide Picker */
    _hideDatePicker = () => this.setState({ isDatePickerVisible: false });
    /* /Hide Date Time Picker Method - Hide Picker/ */

    /* Handle Date Picker - Date Picked */
    _handleDatePicked = (date) => {
        this.setState({ isDatePickerVisible: false, date_absence: moment(date).format('YYYY-MM-DD'), selected: date });
    };
    /* /Handle Date Picker - Date Picked/ */

    /* Handle Create Absence - Create New Absence */
    _handleCreate = () => {
        let that = this;

        const { worker_reason, date_absence } = this.state;

        const worker_id = this.state.pickedName.worker_id;
        const worker_fname = this.state.pickedName.worker_fname;
        const worker_sname = this.state.pickedName.worker_sname;
        const worker_lname = this.state.pickedName.worker_lname;

        let worker_idError = validator('worker_id', worker_id);
        let worker_fnameError = validator('worker_fname', worker_fname);
        let worker_snameError = validator('worker_sname', worker_sname);
        let worker_lnameError = validator('worker_lname', worker_lname);
        let worker_reasonError = validator('worker_reason', worker_reason);
        let date_absenceError = validator('date_absence', date_absence);

        this.setState({
            worker_idError: worker_idError,
            worker_fnameError: worker_fnameError,
            worker_snameError: worker_snameError,
            worker_lnameError: worker_lnameError,
            worker_reasonError: worker_reasonError,
            date_absenceError: date_absenceError
        });

        if (worker_id, worker_reason, date_absence) {
        if (!worker_fnameError) {
        if (!worker_snameError) {
        if (!worker_lnameError) {
        if (!worker_idError) {
        if (!worker_reasonError) {
        if (!date_absenceError) {
            db.transaction(function (tx) {
                tx.executeSql(
                    'INSERT INTO table_absence_workers (worker_id, worker_reason, date_absence) VALUES (?, ?, ?)', [worker_id, worker_reason, date_absence], (tx, results) => {
                        if (results.rowsAffected > 0) {
                            that._showDialog();
                            that.setState({disabled: true});
                            setTimeout(()=> { that.setState({disabled: false}); }, 5000);
                        } else {
                            that._showError();
                        }
                });
            });
        }}}}}}}
    };
    /* /Handle Create Absence - Create New Absence/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        const custom = styles(screenProps);

        return {
            title: "Добавяне на отсъствие на работник",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { params.handleRemove() }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { pickedName, worker_fnameError, worker_snameError, worker_lnameError, worker_reasonError, date_absenceError, dialogVisible, dialogError } = this.state;

        const responsive = responsives(this.props);
        const custom = styles(this.props);

        return (
            <Container>
                <Content style={responsive.absenceForm}>
                    <View style={responsive.absenceFormBox}>
                        <Form>
                            <View style={responsive.absenceFormBoxView}>
                                <View>
                                    <Label style={custom.FormLabel}>Име на работник:</Label>
                                </View>
                                <View>
                                    <Picker selectedValue={pickedName} onValueChange={(itemValue) => this.setState({ pickedName: itemValue })} mode={"dropdown"}>
                                        <Picker.Item key={0} label={'Изберете име на работника'} value={''} />
                                        {this.state.data.map((item, key) => (<Picker.Item label={item.worker_fname} value={item} key={key} />))}
                                    </Picker>
                                </View>
                                <View>
                                    <Text style={custom.errorMessages}> {worker_fnameError ? worker_fnameError : null} </Text>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.absenceFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Презиме на работник:</Label>
                                    </View>
                                    <View>
                                        <Picker selectedValue={pickedName} onValueChange={(itemValue) => this.setState({ pickedName: itemValue })} mode={"dropdown"}>
                                            <Picker.Item key={0} label={'Изберете презиме на работника'} value={''} />
                                            {this.state.data.map((item, key) => (<Picker.Item label={item.worker_sname} value={item} key={key} />))}
                                        </Picker>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}> {worker_snameError ? worker_snameError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.absenceFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Фамилия на работник:</Label>
                                    </View>
                                    <View>
                                        <Picker selectedValue={pickedName} onValueChange={(itemValue) => this.setState({ pickedName: itemValue })} mode={"dropdown"}>
                                            <Picker.Item key={0} label={'Изберете фамилия на работника'} value={''} />
                                            {this.state.data.map((item, key) => (<Picker.Item label={item.worker_lname} value={item} key={key} />))}
                                        </Picker>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}> {worker_lnameError ? worker_lnameError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.absenceFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Причина за отсъствието на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormTextArea}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={255} onChangeText={worker_reason => this.setState({ worker_reason })} multiline={true} numberOfLines={10} />
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}> {worker_reasonError ? worker_reasonError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.absenceFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Дата на отсъствие:</Label>
                                    </View>
                                    <View>
                                        <Text style={custom.PartCalendarPicker} onPress={this._showDatePicker}>{this.state.date_absence ? this.state.date_absence : <Text style={custom.PartCalendarPicker} onPress={this._showDatePicker}>{this.state.date_absence}</Text>}</Text>
                                        <DateTimePicker date={this.state.selected} mode={'date'} isVisible={this.state.isDatePickerVisible} onConfirm={this._handleDatePicked} onCancel={this._hideDatePicker} />
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}> {date_absenceError ? date_absenceError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormButtonSpacing}>
                                <Button title="Добавете" customClick={this._handleCreate.bind(this)} disabled={this.state.disabled}/>
                            </View>
                        </Form>
                    </View>
                    <View>
                        <Alert title={'Успешно'} body={'Вие добавихте отсъствие на работника успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"OK"} second={""}/>
                    </View>
                    <View>
                        <Alert title={'Грешка'} body={'При добавянето на отсъствие на работника нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                </Content>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(createAbsence);
