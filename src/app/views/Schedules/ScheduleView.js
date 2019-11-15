/* Imports */
import React from 'react';
import { View, Text, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { ListItem, Container, List, Content, Fab, Icon } from 'native-base';
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

class ScheduleView extends React.PureComponent {
    _isMounted = false;

    /* Constructor Initialize - Here are our states */
    constructor(props) {
        super(props);

        let hour_from = new Date().setHours(new Date().getHours() + 1);

        this.state = {
            data: [],
            date_from: moment().format('YYYY-MM-DD'),
            hour_from: moment().format('HH:mm'),
            date_to: moment().format('YYYY-MM-DD'),
            hour_to: moment(hour_from).format('HH:mm'),
            isLoading: true,
            calendarBackground: null,
        };

        this._onDayPress = this._onDayPress.bind(this);
    }
    /* /Constructor Initialize - Here are our states/ */

    /* Component Data Method - Here Is Our Data For Schedules */
    componentData() {
        const date_from = this.state.date_from;
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_schedule_workers INNER JOIN table_worker ON table_worker.worker_id = table_schedule_workers.worker_id  WHERE date_from="' + `${date_from}"`, [], (tx, results) => {
                this._isMounted = true;

                if (this._isMounted) {
                    let rows = results.rows.raw();
                    this.setState({ data: rows, isLoading: false, calendarBackground: this.props.theme.backgroundColor });
                    this.arrayholder = rows;
                }
            });
        });
    }
    /* Component Data Method - Here Is Our Data For Schedules */

    /* Component Did Mount Method - Here We Mount Component - Data */
    componentDidMount() {
        this.componentData();
    }
    /* Component Did Mount Method - Here We Mount Component - Data */

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

    /* On Day Press Method - Date From And Date To */
    _onDayPress(day) {
        this.setState({date_from: day.dateString, date_to: day.dateString});
    }
    /* /On Day Press Method - Date From And Date To/ */

    /* Handle Create Method - Navigate to createSchedule */
    _handleCreate() {
        const date_pick = this.state.date_from;
        const hour_from = this.state.hour_from;
        const date_to = this.state.date_to;
        const hour_to = this.state.hour_to;

        this.props.navigation.navigate('createSchedule', { date_pick: date_pick, hour_from: hour_from, date_to: date_to, hour_to: hour_to});
    }
    /* /Handle Create Method - Navigate to createSchedule/ */

    /* Handle Read Method - Navigate to readSchedule */
    _handleRead(id, worker_fname, worker_sname, worker_lname, date_from, hour_from, date_to, hour_to) {
        this.props.navigation.navigate('readSchedule', { id: id, worker_fname: worker_fname, worker_sname: worker_sname, worker_lname: worker_lname, date_from: date_from, hour_from: hour_from, date_to: date_to, hour_to: hour_to });
    }
    /* Handle Read Method - Navigate to readSchedule */

    /* Key Extractor Method - For Index Schedules */
    _keyExtractor(index) {
        return index.toString();
    }
    /* Key Extractor Method - For Index Schedules */

    /* Render Item - Render One Row - Item - (Schedule) */
    _renderItem({ item }) {
        const custom = styles(this.props);

        return (
            <View>
                <ListItem style={custom.PartCalendarItem} onPress={() => this._handleRead(item.id, item.worker_fname, item.worker_sname, item.worker_lname, item.date_from, item.hour_from, item.date_to, item.hour_to)}>
                    <View style={custom.PartCalendarView}>
                        <Text style={custom.PartCalendarText}>{item.worker_fname}</Text>
                        <Text style={custom.PartCalendarDate}>
                            <MaterialCommunityIcons size={16} name="clock-outline"/> {item.hour_from} - {item.hour_to}
                        </Text>
                        <Text style={custom.PartCalendarExtraText}>
                            Взети: {item.worker_tiw}
                        </Text>
                    </View>
                </ListItem>
            </View>
        );
    }
    /* /Render Item - Render One Row - Item - (Schedule)/ */

    /* Check Data Method - Here we check if data is more than 0 or else is less than 0 */
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
                        Няма добавен график на работник за този ден.
                    </Text>
                </Content>
            );
        }
    }
    /* /Check Data Method - Here we check if data is more than 0 or else is less than 0/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = (screenProps) => {
        const custom = styles(screenProps);

        return {
            title: "График на работниците",
            drawerIcon: () => (<MaterialCommunityIcons name="calendar-clock" style={custom.drawerMenuIcon}/>)
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const custom = styles(this.props);

        if (this.state.isLoading === true) {
            return (
                <Container>
                    <AppHeader title="График на работниците" drawerOpen={() => this.props.navigation.openDrawer('DrawerOpen')}/>
                    <Content style={custom.content}>
                        <ScrollView>
                            <Calendar style={custom.PartCalendarData} onDayPress={this._onDayPress} showWeekNumbers={false} hideExtraDays={true} markedDates={{ [this.state.date_from]: { selected: true, disableTouchEvent: true, date_fromDotColor: '#2EBEE5', selectedColor: '#2EBEE5' }}} theme={{ backgroundColor: this.state.calendarBackground, calendarBackground: this.state.calendarBackground, arrowColor: '#22364F', monthTextColor: '#22364F', dayTextColor: '#22364F', textSectionTitleColor: '#22364F' }}/>
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
                    <AppHeader title="График на работниците" drawerOpen={() => this.props.navigation.openDrawer('DrawerOpen')}/>
                    <Content style={custom.content}>
                        <ScrollView>
                            <Calendar style={custom.PartCalendarData} onDayPress={this._onDayPress} showWeekNumbers={false} hideExtraDays={true} markedDates={{ [this.state.date_from]: { selected: true, disableTouchEvent: true, date_fromDotColor: '#2EBEE5', selectedColor: '#2EBEE5' }}} theme={{ backgroundColor: this.state.calendarBackground, calendarBackground: this.state.calendarBackground, arrowColor: '#22364F', monthTextColor: '#22364F', dayTextColor: '#22364F', textSectionTitleColor: '#22364F' }}/>
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
export default withTheme(ScheduleView);
/* /Exports/ */
