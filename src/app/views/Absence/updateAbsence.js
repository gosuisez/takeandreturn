/* Imports */
import React, { Component } from 'react';
import { NavigationActions } from 'react-navigation';
import { View, Text, TextInput } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Container, Content, Form, Label, Item } from 'native-base';
import moment from 'moment';
import { Button, Alert } from '@app/components/config';
import validator from '@app/validation/validator';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
import db from "@app/utils/Database";
/* /Imports/ */

class updateAbsence extends Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const worker_fname = navigation.getParam('worker_fname');
        const worker_sname = navigation.getParam('worker_sname');
        const worker_lname = navigation.getParam('worker_lname');
        const worker_reason = navigation.getParam('worker_reason');
        const date_absence = navigation.getParam('date_absence');

        this.state = {
            id: '',
            worker_fname: worker_fname,
            worker_sname: worker_sname,
            worker_lname: worker_lname,
            worker_reason: worker_reason,
            date_absence: date_absence,
            date_absenceError: null,
            isDatePickerVisible: false,
            data: [],
            selected: new Date(date_absence),
            dialogVisible: false,
            dialogError: false,
            dialogAsk: false,
            disabled: false
        };

        this._getAllWorkers();
        this._onButtonPress = this._onButtonPress.bind(this);
    };
    /* /Constructor Initialize - Here Are Our States/ */

    /* On Button Press Method - Reset Actions */
    _onButtonPress = () => {
        this.setState({ dialogVisible: false, dialogError: false, dialogAsk: false});

        const goToAbsences = NavigationActions.navigate({
            routeName: 'Absences',
            params: {}
        });

        this.props.navigation.dispatch(goToAbsences);
    };
    /* /On Button Press Method - Reset Actions/ */

    /* Get All Workers Method - Data Workers */
    _getAllWorkers = () => {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_worker', [], (results) => {
                let rows = results.rows.raw();
                this.setState({ data: rows });
                this.arrayholder = rows;
            })
        });
    };
    /* /Get All Workers Method - Data Workers/ */

    /* Show Date Picker Method - Show Picker Where You Can Select Date */
    _showDatePicker = () => this.setState({ isDatePickerVisible: true });
    /* /Show Date Picker Method - Show Picker Where You Can Select Date/ */

    /* Hide Date Picker Method - Hide Picker */
    _hideDatePicker = () => this.setState({ isDatePickerVisible: false });
    /* /Hide Date Picker Method - Hide Picker/ */

    /* Handle Date Picker - Date Picked */
    _handleDatePicked = (date) => {
        this.setState({ isDatePickerVisible: false, date_absence: moment(date).format('YYYY-MM-DD'), selected: date });
    };
    /* Handle Date Picker - Date Picked */

    /* Show Ask Method - Here We Display Our Ask Alert */
    _showAsk = () => {
        this.setState({ dialogAsk: true });
    };
    /* /Show Ask Method - Here We Display Our Ask Alert/ */

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

    /* On Cancel Method - Here We Disable Ask Alert */
    _onCancel = () => {
        this.setState({ dialogAsk: false });
    };
    /* /On Cancel Method - Here We Disable Ask Alert/ */

    /* Handle Update Absence - Update Absence */
    _handleUpdate = () => {
        let that = this;

        const {worker_id, worker_reason, date_absence } = this.state;

        let worker_idError = validator('worker_id', worker_id);
        let worker_reasonError = validator('worker_reason', worker_reason);
        let date_absenceError = validator('date_absence', date_absence);

        this.setState({
            worker_idError: worker_idError,
            worker_reasonError: worker_reasonError,
            date_absenceError: date_absenceError,
        });

        const { navigation } = this.props;
        const id = navigation.getParam('id');
        const old_worker_reason = navigation.getParam('worker_reason');
        const old_date_absence = navigation.getParam('date_absence');

            if (worker_id, worker_reason, date_absence) {
            if (!worker_reasonError) {
            if (!date_absenceError) {
                if (this.state.worker_reason === old_worker_reason && this.state.date_absence === old_date_absence) {
                    that._showAsk();
                }
                else if (this.state.worker_reason === this.state.worker_reason || this.state.date_absence === this.state.date_absence) {
                    db.transaction((tx) => {
                        tx.executeSql(
                            'UPDATE table_absence_workers SET worker_reason = ?, date_absence = ? WHERE id = ?', [worker_reason, date_absence, id], () => {
                                that._showDialog();
                                that.setState({disabled: true});
                                setTimeout(()=> { that.setState({disabled: false}); }, 5000);
                            }
                        );
                    });
                }
                else {
                    that._showError();
                }
                }
            }
        }
    };
    /* /Handle Update Absence - Update Absence/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Редактиране на отсъствието на работник",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: responsive.headerTitleStyle,
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('readAbsence') }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { worker_fnameError, worker_snameError, worker_lnameError, worker_reasonError, date_absenceError, dialogVisible, dialogAsk, dialogError } = this.state;

        const responsive = responsives(this.props);
        const custom = styles(this.props);

        return (
            <Container>
                <Content style={responsive.absenceForm}>
                    <View style={responsive.absenceFormBoxUpdate}>
                        <Form>
                            <View style={responsive.absenceFormBoxView}>
                                <View>
                                    <Label style={custom.FormLabel}>Име на работника:</Label>
                                </View>
                                <View>
                                    <Item stackedLabel style={custom.FormItem}>
                                        <TextInput style={custom.FormInput} keyboardType='default' maxLength={100} onChangeText={worker_fname => this.setState({ worker_fname })} value={this.state.worker_fname} editable={false}/>
                                    </Item>
                                </View>
                                <View>
                                    <Text style={custom.errorMessages}>{worker_fnameError ? worker_fnameError : null} </Text>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.absenceFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Презиме на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={100} onChangeText={worker_sname => this.setState({ worker_sname })} value={this.state.worker_sname} editable={false}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_snameError ? worker_snameError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.absenceFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Фамилия на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={100} onChangeText={worker_lname => this.setState({ worker_lname })} value={this.state.worker_lname} editable={false}/>
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
                                        <Label style={custom.FormLabel}>Причина за отсъствието на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={255} onChangeText={worker_reason => this.setState({ worker_reason })} value={this.state.worker_reason}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_reasonError ? worker_reasonError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.absenceFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Дата на отсъствие:</Label>
                                    </View>
                                    <View>
                                        <Text style={custom.PartCalendarPicker} onPress={this._showDatePicker}>{this.state.date_absence}</Text>
                                        <DateTimePicker date={this.state.selected} mode={'date'} isVisible={this.state.isDatePickerVisible} onConfirm={this._handleDatePicked} onCancel={this._hideDatePicker}/>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{date_absenceError ? date_absenceError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormButtonSpacing}>
                                <Button title="Редактирайте" customClick={this._handleUpdate.bind(this)} disabled={this.state.disabled}/>
                            </View>
                        </Form>
                    </View>
                    <View>
                        <Alert title={'Редактиране на отсъствие на работник'} body={'Наистина ли искате да се върнете към отсъстващите работници без да сте направили промени по полетата?'} visible={dialogAsk} onSubmit={this._onButtonPress} onCancel={this._onCancel} first={"Да"} second={"Не"}/>
                    </View>
                    <View>
                        <Alert title={'Успешно'} body={'Вие редактирахте отсъствието на работника успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                    <View>
                        <Alert title={'Грешка'} body={'При редактирането на отсъствието на работника нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                </Content>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(updateAbsence);
/* /Exports/ */
