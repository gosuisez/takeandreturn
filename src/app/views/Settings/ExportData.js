/* Imports */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Content } from 'native-base';
import { AntDesign } from '@app/utils/Icons';
import { Button } from 'react-native-elements';
import { Alert } from '@app/components/config';
import { NavigationActions, StackActions } from 'react-navigation';
import { withTheme } from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
import db from "@app/utils/Database";
import RNFS from 'react-native-fs';
import withPreventDoubleClick from '@app/utils/Constants';
const DefaultButton = withPreventDoubleClick(Button);
let path = RNFS.ExternalDirectoryPath + '/takeandreturn.json';
/* /Imports/ */

class ExportData extends Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            data: { categories: [], subcategories: [], tools: [], toolsinworkers: [], workers: [], schedules: [], absences: []},
            dialogVisible: false,
            dialogError: false,
            disabled: false,
        };

        this._onButtonPress = this._onButtonPress.bind(this);
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* Component Did Mount Method - Here We Apply On Button Press With Navigation */
    componentDidMount() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM categories', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({categories: rows});
            });
        });

        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_subcategories', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({subcategories: rows});
            });
        });

        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_tools', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({tools: rows});
            });
        });

        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_tools_workers', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({toolsinworkers: rows});
            });
        });

        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_worker', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({workers: rows});
            });
        });

        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_schedule_workers', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({schedules: rows});
            });
        });

        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_absence_workers', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({absences: rows});
            });
        });
    }
    /* /Component Did Mount Method - Here We Apply On Button Press With Navigation/ */

    /* On Button Press Method - Reset Actions */
    _onButtonPress = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'ExportData' })]
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
        this.setState({ dialogVisible: true });
    };
    /* /Show Dialog Method - Here We Display Our Custom Alert/ */

    /* Show Error Method - Here We Display Our Error Alert */
    _showError = () => {
        this.setState({ dialogError: true });
    };
    /* /Show Error Method - Here We Display Our Error Alert/ */

    /* Export Data Method - Here We Save And Export Our File */
    _exportData = () => {
        let data = { categories: this.state.categories, subcategories: this.state.subcategories, tools: this.state.tools, toolsinworkers: this.state.toolsinworkers, workers: this.state.workers, schedules: this.state.schedules, absences: this.state.absences };
        let json = JSON.stringify(data);

        RNFS.writeFile(path, json, 'utf8')
            .then(() => {
                this.setState({data: json});

                this._showDialog();
                this.setState({disabled: true});
                setTimeout(()=> { this.setState({disabled: false}); }, 5000);
            })
            .catch(() => {
                this._showError();
            });
    };
    /* /Export Data Method - Here We Save And Export Our File/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({navigation, screenProps}) => {
        const custom = styles(screenProps);

        return {
            title: "Експортиране на данни",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: {color: '#F5F5F5'},
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => {navigation.navigate('Settings')}} style={custom.headerLeft}/>
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
                        Какво представлява експортирането на данни?
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        Експортирането на данни представлява опция, в която вие можете да експортирате (запишете) вашите данни от приложението на физическото устройство (телефона) като файл.
                    </Text>
                </View>
                <View style={theme.settingsOtherView}>
                    <Text style={theme.settingsQuestion}>
                        Как да експортираме данните си?
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        За да експортираме данните си ние трябва да изберем бутона експорт.
                    </Text>
                </View>
                <View style={theme.settingsOtherView}>
                    <Text style={theme.settingsQuestion}>
                       Какво се случва след като експортираме данните си?
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        След като експортираме данните си те се записват в следната директория: /storage/emulated/0/Android/data/com.takeandreturn/files/takeandreturn.json, а именно във вътрешното хранилище (internal storage-а) на нашето физическо устройство.
                    </Text>
                </View>
                <View style={theme.settingsOtherView}>
                    <Text style={theme.settingsQuestion}>
                        Какво е важно да знаем като експортираме данните си?
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        Когато експортираме данните си и те се запишат в директорията, която е описана малко по-горе трябва да преместим, да копираме или да споделим нашият json файл, за да може, когато деинсталираме (изтрием) приложението json файла да не се губи.
                    </Text>
                </View>
                <View style={theme.settingsDataButtonView}>
                    <DefaultButton title="Експорт" buttonStyle={theme.settingsDataButtonStyle} onPress={this._exportData} disabled={disabled}/>
                </View>
                <View>
                    <Alert title={'Успешно'} body={'Вие успешно експортирахте данните си! ' + path} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"OK"} second={""}/>
                </View>
                <View>
                    <Alert title={'Грешка'} body={'При експортирането на данни нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                </View>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(ExportData);
