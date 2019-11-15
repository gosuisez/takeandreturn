/* Imports */
import React from 'react';
import {NavigationActions, StackActions} from "react-navigation";
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { Container, Content } from 'native-base';
import { Alert } from '@app/components/config';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
import db from "@app/utils/Database";
/* /Imports/ */

class deleteAbsence extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            dialogVisible: false,
            dialogError: false
        };

        this._onButtonPress = this._onButtonPress.bind(this);
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* On Button Press Method - Reset Actions */
    _onButtonPress = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'createAbsence' })]
        });

        const goToWorkers = NavigationActions.navigate({
            routeName: 'Absences',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(goToWorkers);
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

    /* Handle Delete Absence - Delete Absence */
    _handleDelete = () => {
        let that = this;

        const { navigation } = this.props;
        const id = navigation.getParam('id');

        db.transaction(tx => {
            tx.executeSql(
                'DELETE FROM table_absence_workers WHERE id = ?',  [id], (tx, results) => {
                    if (results.rowsAffected > 0) {
                        that._showDialog();
                    } else {
                        that._showError();
                    }
                }
            );
        });
    };
    /* /Handle Delete Absence - Delete Absence/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Премахване на отсъствие",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: responsive.headerTitleStyle,
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('readAbsence') }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { dialogVisible, dialogError } = this.state;

        const custom = styles(this.props);

        return (
            <Container>
                <Content style={custom.PartForm}>
                    <View style={custom.PartDeleteView}>
                        <Text style={custom.PartDeleteText}>
                            Сигурни ли сте, че искате да премахнахте това отсъствие на работника?
                        </Text>
                    </View>
                    <View style={custom.PartDeleteButton}>
                        <View>
                            <Button icon={{ name: 'check', type: 'font-awesome', color: '#FFFFFF' }} title="Да" buttonStyle={{ backgroundColor: "#5cb85c", borderRadius: 5 }} onPress={this._handleDelete.bind(this)}/>
                        </View>
                        <View style={custom.PartDeleteIcon}>
                            <Button icon={{ name: 'remove', type: 'font-awesome', color: '#FFFFFF' }} title="Не" buttonStyle={{ backgroundColor: "#d9534f", borderRadius: 5 }} onPress={() => this.props.navigation.navigate('readAbsence')}/>
                        </View>
                    </View>
                    <View>
                        <Alert title={'Успешно'} body={'Вие премахнахте отсъствието на работника успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"OK"} second={""}/>
                    </View>
                    <View>
                        <Alert title={'Грешка'} body={'При премахването на отсъствието на работника нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                </Content>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(deleteAbsence);
/* /Exports/ */
