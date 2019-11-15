/* Imports */
import React from 'react';
import { ScrollView, View, FlatList, Text, ActivityIndicator } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ListItem, List, Container, Content, Fab, Icon } from 'native-base';
import moment from 'moment';
import { AppHeader } from '@app/components/config';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { MaterialCommunityIcons } from '@app/utils/Icons';
import db from "@app/utils/Database";
/* /Imports/ */

/* Calendar LocaleConfig Month Names and Day Names */
LocaleConfig.locales['bg'] = {
  monthNames: ['Януари', 'Февруари', 'Март', 'Април', 'Май', 'Юни', 'Юли', 'Август', 'Септември', 'Октомври', 'Ноември', 'Декември'],
  monthNamesShort: ['Яну.', 'Фев.', 'Мар.', 'Апр.', 'Май.', 'Юни', 'Юли.', 'Авг.', 'Сеп.', 'Окт.', 'Ное.', 'Дек.'],
  dayNames: ['Понеделник', 'Вторник', 'Сряда', 'Четвъртък', 'Петък', 'Събота', 'Неделя'],
  dayNamesShort: ['Пон.', 'Вто.', 'Сря.', 'Чет.', 'Пет.', 'Съб.', 'Нед.']
};
LocaleConfig.defaultLocale = 'bg';
/* /Calendar LocaleConfig Month Names and Day Names/ */

class AbsencesView extends React.PureComponent {
  _isMounted = false;

  /* Constructor Initialize - Here Are Our States */
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      date_absence: moment().format('YYYY-MM-DD'),
      isLoading: true,
      isMounted: false,
      calendarBackground: null
    };

    this._onDayPress = this._onDayPress.bind(this);
  }
  /* /Constructor Initialize - Here Are Our States/ */

  /* Component Data Method - Here Is Our Data For Absences */
  componentData() {
    const date_absence = this.state.date_absence;
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_absence_workers INNER JOIN table_worker ON table_worker.worker_id = table_absence_workers.worker_id WHERE date_absence="' + `${date_absence}"`, [], (tx, results) => {
        this._isMounted = true;

        if (this._isMounted) {
          let rows = results.rows.raw();
          this.setState({ data: rows, calendarBackground: this.props.theme.backgroundColor, isLoading: false });
          this.arrayholder = rows;
        }
      });
    });
  }
  /* Component Data Method - Here Is Our Data For Absences */

  /* Component Did Mount Method - Here We Mount Component - Data */
  componentDidMount() {
    this.componentData();
  }
  /* /Component Did Mount Method - Here We Mount Component - Data/ */

  /* Component Did Update Method - Here We Update Component - Data */
  componentDidUpdate() {
    this.componentData();
  }
  /* /Component Did Update Method - Here We Update Component - Data/ */

  /* Component Will Unmount Method - Here We Unmount Component - Data */
  componentWillUnmount() {
    this._isMounted = false;
  }
  /* /Component Will Unmount Method - Here We Unmount Component - Data/ */

  /* On Day Press Method - Date Absence */
  _onDayPress(day) {
    this.setState({ date_absence: day.dateString });
  }
  /* /On Day Press Method - Date Absence/ */

  /* Handle Create Method - Navigate to CreateAbsence */
  _handleCreate() {
    const date_absence = this.state.date_absence;
    this.props.navigation.navigate('createAbsence', { date_absence: date_absence });
  }
  /* /Handle Create Method - Navigate to CreateAbsence/ */

  /* Handle Read Method - Navigate to ReadAbsence */
  _handleRead(id, worker_fname, worker_sname, worker_lname, worker_reason, date_absence) {
    this.props.navigation.navigate('readAbsence', { id: id, worker_fname: worker_fname, worker_sname: worker_sname, worker_lname: worker_lname, worker_reason: worker_reason, date_absence: date_absence });
  }
  /* /Handle Read Method - Navigate to ReadAbsence/ */

  /* Key Extractor Method - For Index Absences */
  _keyExtractor(index) {
    return index.toString();
  }
  /* /Key Extractor Method - For Index Absences/ */

  /* Render Item - Render One Row - Item - (Absence) */
  _renderItem({ item }) {
    const custom = styles(this.props);

    return (
      <View>
        <ListItem style={custom.PartCalendarItem} onPress={() => this._handleRead(item.id, item.worker_fname, item.worker_sname, item.worker_lname, item.worker_reason, item.date_absence)}>
          <View style={custom.PartCalendarView}>
            <Text style={custom.PartCalendarText}>{item.worker_fname}</Text>
            <Text style={custom.PartCalendarDate}>
              <MaterialCommunityIcons size={16} name="clock-outline"/> {item.date_absence}
            </Text>
          </View>
        </ListItem>
      </View>
    );
  }
  /* /Render Item - Render One Row - Item - (Absence)/ */

  /* Check Data Method - Here We Check If Data Is More Than 0 Or Else Is Less Than 0 */
  _checkData() {
    const responsive = responsives(this.props);

    if (this.state.data.length > 0) {
      return (
        <List>
          <FlatList extraData={this.state} data={this.state.data} keyExtractor={(item, index) => index.toString()} renderItem={this._renderItem.bind(this)}/>
        </List>
      );
    }

    else {
      return (
        <Content style={responsive.PartCalendar}>
          <Text style={responsive.PartNoData}>
            Няма добавено отсъствие на работник за този ден.
          </Text>
        </Content>
      );
    }
  }
  /* /Check Data Method - Here We Check If Data Is More Than 0 Or Else Is Less Than 0/ */

  /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
  static navigationOptions = (screenProps) => {
    const custom = styles(screenProps);

    return {
      title: "Отсъстващи работници",
      drawerIcon: () => (<MaterialCommunityIcons name="minus-circle" style={custom.drawerMenuIcon}/>),
      header: null
    };
  };
  /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

  /* Render Method - Is Place Where You Can View All Content Of The Page */
  render() {
    const custom = styles(this.props);

    if (this.state.isLoading === true) {
      return (
          <Container>
            <AppHeader title="Отсъстващи работници" drawerOpen={() => this.props.navigation.openDrawer('DrawerOpen')}/>
            <Content style={custom.content}>
              <ScrollView>
                <Calendar style={custom.PartCalendarData} onDayPress={this._onDayPress} showWeekNumbers={false} hideExtraDays={true} markedDates={{ [this.state.date_absence]: { selected: true, disableTouchEvent: true, date_absenceDotColor: '#2EBEE5', selectedColor: '#2EBEE5' } }} theme={{ backgroundColor: this.state.calendarBackground, calendarBackground: this.state.calendarBackground, arrowColor: '#22364F', monthTextColor: '#22364F', dayTextColor: '#22364F', textSectionTitleColor: '#22364F' }}/>
                <ActivityIndicator size={70} color="#243039" />
              </ScrollView>
            </Content>
            <View>
              <Fab style={custom.PartCreate} active={'true'} direction="down" position="bottomRight" onPress={() => this._handleCreate()}>
                <Icon name="add"/>
              </Fab>
            </View>
          </Container>
      );
    }

    else {
      return (
          <Container>
            <AppHeader title="Отсъстващи работници" drawerOpen={() => this.props.navigation.openDrawer('DrawerOpen')}/>
            <Content style={custom.content}>
              <ScrollView>
                <Calendar style={custom.PartCalendarData} onDayPress={this._onDayPress} showWeekNumbers={false} hideExtraDays={true} markedDates={{ [this.state.date_absence]: { selected: true, disableTouchEvent: true, date_absenceDotColor: '#2EBEE5', selectedColor: '#2EBEE5' } }} theme={{ backgroundColor: this.state.calendarBackground, calendarBackground: this.state.calendarBackground, arrowColor: '#22364F', monthTextColor: '#22364F', dayTextColor: '#22364F', textSectionTitleColor: '#22364F' }}/>
                {this._checkData()}
              </ScrollView>
            </Content>
            <View>
              <Fab style={custom.PartCreate} active={'true'} direction="down" position="bottomRight" onPress={() => this._handleCreate()}>
                <Icon name="add"/>
              </Fab>
            </View>
          </Container>
      );
    }
  }
  /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(AbsencesView);
/* /Exports/ */
