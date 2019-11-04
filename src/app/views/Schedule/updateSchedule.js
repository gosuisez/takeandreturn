/* Imports */
import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { Container, Content, Form, Item, Label } from 'native-base';
import moment from 'moment';
import { AntDesign } from '@app/utils/Icons';
import { custom } from '@app/styles/config';
import { Button, Alert } from '@app/components/config';
import validator from '@app/validation/validator';
import {NavigationActions} from "react-navigation";
import { withTheme} from '@app/theme/themeProvider';
import {responsives} from '@app/styles/config';
import {styles} from '@app/styles/config';
import db from "@app/utils/Database";
/* /Imports/ */

class updateSchedule extends Component {
  /* Constructor Initialize - Here Are Our States */
  constructor(props) {
    super(props);

    const { navigation } = this.props;

    const worker_fname = navigation.getParam('worker_fname');
    const worker_sname = navigation.getParam('worker_sname');
    const worker_lname = navigation.getParam('worker_lname');
    const date_from = navigation.getParam('date_from');
    const hour_from = navigation.getParam('hour_from');
    const date_to = navigation.getParam('date_to');
    const hour_to = navigation.getParam('hour_to');

    this.state = {
      id: '',
      isDateTimePickerVisible: false,
      isDateTimePickerVisibleTwo: false,
      isDateTimePickerVisibleThree: false,
      isDateTimePickerVisibleFour: false,
      date_from: date_from,
      date_fromError: null,
      hour_from: hour_from,
      hour_fromError: null,
      date_to: date_to,
      date_toError: null,
      hour_to: hour_to,
      hour_toError: null,
      worker_fname: worker_fname,
      worker_sname: worker_sname,
      worker_lname: worker_lname,
      selectedDateFrom: new Date(date_from),
      selectedDateTo: new Date(date_to),
      selectedHourFrom: new Date(),
      selectedHourTo: new Date(),
      dialogVisible: false,
      dialogError: false,
      dialogAsk: false,
      disabled: false
    };

    this._onButtonPress = this._onButtonPress.bind(this);
  }
  /* Constructor Initialize - Here Are Our States */

  /* On Button Press Method - Reset Actions */
  _onButtonPress = () => {
    this.setState({ dialogVisible: false, dialogError: false, dialogAsk: false});

    const goToSchedule = NavigationActions.navigate({
      routeName: 'Schedule',
      params: {}
    });

    this.props.navigation.dispatch(goToSchedule);
  };
  /* /On Button Press Method - Reset Actions/ */

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
      this.setState({ isDateTimePickerVisible: false, date_to: this.state.date_from, selectedDateTo: this.state.selectedDateFro });
    }
  };
  /* /Handle Date Picker - Date Picked/ */

  /* Show Time Picker Two Method - Show Picker Where You Can Select Time */
  _showDateTimePickerTwo = () => this.setState({ isDateTimePickerVisibleTwo: true });
  /* /Show Time Picker Two Method - Show Picker Where You Can Select Time/ */

  /* Hide Time Picker Two Method - Hide Picker */
  _hideDateTimePickerTwo = () => this.setState({ isDateTimePickerVisibleTwo: false });
  /* /Hide Time Picker Two Method - Hide Picker/ */

  /* Handle Time Picker Two - Time Picked */
  _handleDatePickedTwo = (time) => {
    this.setState({ isDateTimePickerVisibleTwo: false, hour_from: moment(time).format('HH:mm'), selectedHourFrom: time });

    if (this.state.hour_from) {
      this.setState({ isDateTimePickerVisibleTwo: false, hour_to: this.state.hour_from, selectedHourTo: this.state.selectedHourFrom });
    }
  };
  /* /Handle Time Two - Time Picked/ */

  /* Show Date Picker Three Method - Show Picker Where You Can Select Date */
  _showDateTimePickerThree = () => this.setState({ isDateTimePickerVisibleThree: true });
  /* /Show Date Picker Three Method - Show Picker Where You Can Select Date/ */

  /* Hide Date Picker Three Method - Hide Picker */
  _hideDateTimePickerThree = () => this.setState({ isDateTimePickerVisibleThree: false });
  /* /Hide Date Picker Three Method - Hide Picker/ */

  /* Handle Date Picker Three - Date Picked */
  _handleDatePickedThree = (date) => {
    this.setState({ isDateTimePickerVisibleThree: false, date_to: moment(date).format('YYYY-MM-DD'), selectedDateTo: date });

    if (this.state.date_from < this.state.date_to) {
      this.setState({ isDateTimePickerVisibleThree: false, date_to: this.state.date_to, selectedDateTo: this.state.selectedDateTo });
    }

    else {
      this.setState({ isDateTimePickerVisibleThree: false, date_to: this.state.date_from, selectedDateTo: this.state.selectedDateFrom, hour_to: this.state.hour_from, selectedHourTo: this.state.selectedHourFrom });
    }
  };
  /* /Handle Date Picker Three - Date Picked/ */

  /* Show Time Picker Four Method - Show Picker Where You Can Select Time */
  _showDateTimePickerFour = () => this.setState({ isDateTimePickerVisibleFour: true });
  /* /Show Time Picker Four Method - Show Picker Where You Can Select Time/ */

  /* Hide Time Picker Four Method - Hide Picker */
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

  /* Handle Update Schedule - Update Schedule */
  _handleUpdate = () => {
    let that = this;

    const { navigation } = this.props;
    const id = navigation.getParam('id');

    const { date_from, hour_from, date_to, hour_to } = this.state;

    let date_fromError = validator('date_from', date_from);
    let hour_fromError = validator('hour_from', hour_from);
    let date_toError = validator('date_to', date_to);
    let hour_toError = validator('hour_to', hour_to);

    this.setState({
      date_fromError: date_fromError,
      hour_fromError: hour_fromError,
      date_toError: date_toError,
      hour_toError: hour_toError,
    });

    const old_date_from = navigation.getParam('date_from');
    const old_hour_from = navigation.getParam('hour_from');
    const old_date_to = navigation.getParam('date_to');
    const old_hour_to = navigation.getParam('hour_to');

    if (date_from, hour_from, date_to, hour_to) {
    if (!date_fromError) {
    if (!hour_fromError) {
    if (!date_toError) {
    if (!hour_toError) {
        if (this.state.date_from === old_date_from && this.state.hour_from === old_hour_from && this.state.date_to === old_date_to && this.state.hour_to === old_hour_to) {
            that._showAsk();
        }

        else if (this.state.date_from === this.state.date_from || this.state.hour_from === this.state.hour_from || this.state.date_to === this.state.date_to || this.state.hour_to === this.state.hour_to) {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE table_schedule_workers SET date_from = ?, hour_from = ?, date_to = ?, hour_to = ? WHERE id = ?', [date_from, hour_from, date_to, hour_to, id], () => {
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
    }}}}}
  };
  /* /Handle Update Schedule - Update Schedule/ */

  /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
  static navigationOptions = ({ navigation, screenProps }) => ({
    title: "Редактиране на график",
    headerStyle: { backgroundColor: screenProps.theme.color },
    headerTitleStyle: { color: '#F5F5F5' },
    headerLeft: <AntDesign name="arrowleft" style={custom.stackNavigatorBackIcon} onPress={() => { navigation.navigate('readSchedule') }}/>
  });
  /* Navigation Options Like (Header, Title, Menu, Icon, Style) */

  /* Render Method - Is Place Where You Can View All Content Of The Page */
  render() {
    const { worker_fnameError, worker_snameError, worker_lnameError, date_fromError, hour_fromError, date_toError, hour_toError, dialogVisible, dialogAsk, dialogError } = this.state;

    const responsive = responsives(this.props);
    const custom = styles(this.props);

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
                  <Item stackedLabel style={custom.FormItem}>
                    <TextInput style={custom.FormInput} keyboardType='default' maxLength={30} value={this.state.worker_fname} onChangeText={worker_fname => this.setState({ worker_fname })} editable={false}/>
                  </Item>
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
                <View style={responsive.scheduleFormBoxView}>
                  <View>
                    <Label style={custom.FormLabel}>Фамилия на работник:</Label>
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
                <View style={responsive.workerFormBoxView}>
                  <View>
                    <Label style={custom.FormLabel}>Час на започване:</Label>
                  </View>
                  <View>
                    <Text style={custom.PartCalendarPicker} onPress={this._showDateTimePickerTwo}>{this.state.hour_from}</Text>
                    <DateTimePicker date={this.state.selectedHourFrom} mode={'time'} isVisible={this.state.isDateTimePickerVisibleTwo} onConfirm={this._handleDatePickedTwo} onCancel={this._hideDateTimePickerTwo}/>
                  </View>
                  <View>
                    <Text style={custom.errorMessages}>{hour_fromError ? hour_fromError : null} </Text>
                  </View>
                </View>
              </View>
              <View style={custom.FormFieldSpacing}>
                <View style={responsive.workerFormBoxView}>
                  <View>
                    <Label style={custom.FormLabel}>Дата на приключване:</Label>
                  </View>
                  <View>
                    <Text style={custom.PartCalendarPicker} onPress={this._showDateTimePickerThree}>{this.state.date_to}</Text>
                    <DateTimePicker date={this.state.selectedDateTo} mode={'date'} isVisible={this.state.isDateTimePickerVisibleThree} onConfirm={this._handleDatePickedThree} onConfirm={this._handleDatePickedThree} onCancel={this._hideDateTimePickerThree}/>
                  </View>
                  <View>
                    <Text style={custom.errorMessages}>{date_toError ? date_toError : null} </Text>
                  </View>
                </View>
              </View>
              <View style={custom.FormFieldSpacing}>
                <View style={responsive.workerFormBoxView}>
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
              <View style={custom.FormButtonSpacing}>
                <Button title="Редактирайте" customClick={this._handleUpdate.bind(this)} disabled={this.state.disabled}/>
              </View>
            </Form>
          </View>
          <View>
            <Alert title={'Редактиране на график на работник'} body={'Наистина ли искате да се върнете към графика на работниците без да сте направили промени по полетата?'} visible={dialogAsk} onSubmit={this._onButtonPress} onCancel={this._onCancel} first={"Да"} second={"Не"}/>
          </View>
          <View>
            <Alert title={'Успешно'} body={'Вие редактирахте графика на работника успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
          </View>
          <View>
            <Alert title={'Грешка'} body={'При редактирането на графика на работника нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
          </View>
        </Content>
      </Container>
    );
  }
  /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(updateSchedule);
