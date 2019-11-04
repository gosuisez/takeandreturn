/* Imports */
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {Content} from 'native-base';
import {AntDesign} from '@app/utils/Icons';
import {Button} from 'react-native-elements';
import {Alert} from '@app/components/config';
import {NavigationActions, StackActions} from 'react-navigation';
import { withTheme } from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
import db from "@app/utils/Database";
import RNFS from 'react-native-fs';
import withPreventDoubleClick from '@app/utils/Constants';
const DefaultButton = withPreventDoubleClick(Button);
/* /Imports/ */

class ImportData extends Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            dialogVisible: false,
            dialogError: false,
            disabled: false,
        };

        this._onButtonPress = this._onButtonPress.bind(this);
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* On Button Press Method - Reset Actions */
    _onButtonPress = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'ImportData'})]
        });

        const goToSettings = NavigationActions.navigate({
            routeName: 'Settings',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(goToSettings);
    };
    /* /On Button Press Method - Reset Actions/ */

    /* Show Dialog Method - Here We Display Our Custom Alert */
    _showDialog = () => {
        this.setState({dialogVisible: true});
    };
    /* /Show Dialog Method - Here We Display Our Custom Alert/ */

    /* Show Error Method - Here We Display Our Error Alert */
    _showError = () => {
        this.setState({dialogError: true});
    };
    /* /Show Error Method - Here We Display Our Error Alert/ */

    /* Import Data Method - Here We Get And Import Our File */
    _importData = () => {
        RNFS.readDir(RNFS.ExternalDirectoryPath)
            .then((result) => {
                return Promise.all([RNFS.stat(result[0].path), result[0].path]);
            })
            .then((statResult) => {
                if (statResult[0].isFile()) {
                    return RNFS.readFile(statResult[1], 'utf8');
                }
                return 'No file in this directory.';
            })
            .then((contents) => {
                let parse = JSON.parse(contents);

                for (let i = 0; i < parse.categories.length; i++) {
                    db.transaction(function (tx) {
                        tx.executeSql(
                            'INSERT INTO categories (category_name, category_icon) VALUES (?, ?)',
                            [parse.categories[i].category_name, parse.categories[i].category_icon]
                        );
                    });
                }

                for (let i = 0; i < parse.subcategories.length; i++) {
                    db.transaction(function (tx) {
                        tx.executeSql(
                            'INSERT INTO table_subcategories (category_id, subcategory_name) VALUES (?, ?)',
                            [parse.subcategories[i].category_id, parse.subcategories[i].subcategory_name]
                        );
                    });
                }

                for (let i = 0; i < parse.tools.length; i++) {
                    db.transaction(function (tx) {
                        tx.executeSql(
                            'INSERT INTO table_tools (subcategory_id, tool_name, tool_description, tool_count, tool_availability) VALUES (?, ?, ?, ?, ?)',
                            [parse.tools[i].subcategory_id, parse.tools[i].tool_name, parse.tools[i].tool_description, parse.tools[i].tool_count, parse.tools[i].tool_availability]
                        );
                    });
                }

                for (let i = 0; i < parse.toolsinworkers.length; i++) {
                    db.transaction(function (tx) {
                        tx.executeSql(
                            'INSERT INTO table_tools_workers (checked, worker_id, tool_id, date_take, hour_take, date_return, hour_return) VALUES (?, ?, ?, ?, ?, ?, ?)',
                            [parse.toolsinworkers[i].checked, parse.toolsinworkers[i].worker_id, parse.toolsinworkers[i].tool_id, parse.toolsinworkers[i].date_take, parse.toolsinworkers[i].hour_take, parse.toolsinworkers[i].date_return, parse.toolsinworkers[i].hour_return]
                        );
                    });
                }

                for (let i = 0; i < parse.workers.length; i++) {
                    db.transaction(function (tx) {
                        tx.executeSql(
                            'INSERT INTO table_worker (worker_fname, worker_sname, worker_lname, worker_email, worker_mobile, worker_address, worker_pincode, worker_tiw) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                            [parse.workers[i].worker_fname, parse.workers[i].worker_sname, parse.workers[i].worker_lname, parse.workers[i].worker_email, parse.workers[i].worker_mobile, parse.workers[i].worker_address, parse.workers[i].worker_pincode, parse.workers[i].worker_tiw]
                        );
                    });
                }

                for (let i = 0; i < parse.schedules.length; i++) {
                    db.transaction(function (tx) {
                        tx.executeSql(
                            'INSERT INTO table_schedule_workers (worker_id, date_from, hour_from, date_to, hour_to) VALUES (?, ?, ?, ?, ?)',
                            [parse.schedules[i].worker_id, parse.schedules[i].date_from, parse.schedules[i].hour_from, parse.schedules[i].date_to, parse.schedules[i].hour_to]
                        );
                    });
                }

                for (let i = 0; i < parse.absences.length; i++) {
                    db.transaction(function (tx) {
                        tx.executeSql(
                            'INSERT INTO table_absence_workers (worker_id, worker_reason, date_absence) VALUES (?, ?, ?)',
                            [parse.absences[i].worker_id, parse.absences[i].worker_reason, parse.absences[i].date_absence]
                        );
                    });
                }

                this._showDialog();
                this.setState({disabled: true});
                setTimeout(()=> { this.setState({disabled: false}); }, 5000);
            })
            .catch(() => {
                this._showError();
            });
    };
    /* /Import Data Method - Here We Get And Import Our File/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({navigation, screenProps}) => {
        const custom = styles(screenProps);

        return {
            title: "Импортиране на данни",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: {color: '#F5F5F5'},
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => {navigation.navigate('Settings')}} style={custom.headerLeft} />
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const {dialogVisible, dialogError, disabled} = this.state;
        const theme = styles(this.props);

        return (
            <Content style={theme.content}>
                <View style={theme.settingsOtherView}>
                    <Text style={theme.settingsQuestion}>
                        Какво представлява импортирането на данни?
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        Импортирането на данни представлява опция, в която вие можете да импортирате
                        (вмъкнете) данни от файл на физическото устройство (телефона) като файл.
                    </Text>
                </View>
                <View style={theme.settingsOtherView}>
                    <Text style={theme.settingsQuestion}>
                        Как да импортираме данните си?
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        За да импортираме данните си ние трябва да изберем бутона импорт.
                    </Text>
                </View>
                <View style={theme.settingsOtherView}>
                    <Text style={theme.settingsQuestion}>
                        Какво се случва след като импортираме данните си?
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        След като импортираме данните си те се записват (вмъкват) автоматично в нашето приложение в съотвения списък.
                    </Text>
                </View>
                <View style={theme.settingsOtherView}>
                    <Text style={theme.settingsQuestion}>
                        Какво е важно да знаем като импортираме данните си?
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        Когато импортираме данните си и трябва да вземем файла, който сме преместили или копирали или споделили, за да може да вземем файла и да го експортираме успешно.
                    </Text>
                </View>
                <View style={theme.settingsDataButtonView}>
                    <DefaultButton title="Импорт" buttonStyle={theme.settingsDataButtonStyle} onPress={this._importData} disabled={disabled}/>
                </View>
                <View>
                    <Alert title={'Успешно'} body={'Вие успешно импортирахте данните си!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"OK"} second={""}/>
                </View>
                <View>
                    <Alert title={'Грешка'} body={'При импортирането на данни нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                </View>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(ImportData);
