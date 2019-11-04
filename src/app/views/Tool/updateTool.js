/* Imports */
import React from 'react';
import { View, TextInput, Text, Picker } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { Container, Content, Form, Item, Label } from 'native-base';
import moment from 'moment';
import validator from '@app/validation/validator';
import { AntDesign } from '@app/utils/Icons';
import { Button, Alert } from '@app/components/config';
import { withTheme} from '@app/theme/themeProvider';
import {responsives} from '@app/styles/config';
import {styles} from '@app/styles/config';
import db from "@app/utils/Database";
/* /Imports/ */

class updateTool extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const tool_name = navigation.getParam('tool_name');
        const tool_description = navigation.getParam('tool_description');
        const tool_count = navigation.getParam('tool_count');
        const tool_availability = navigation.getParam('tool_availability');

        this.state = {
            tool_id: '',
            tool_name: tool_name,
            tool_description: tool_description,
            tool_count: tool_count,
            tool_availability: tool_availability,
            tool_nameError: null,
            tool_descriptionError: null,
            tool_countError: null,
            tool_availabilityError: null,
            date_take: moment().format('YYYY-MM-DD'),
            hour_take: moment().format('HH:mm'),
            dialogVisible: false,
            dialogError: false,
            dialogAsk: false,
            disabled: false
        };

        this._onButtonPress = this._onButtonPress.bind(this);
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* On Button Press Method - Reset Actions */
    _onButtonPress = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'createToolWorker', params: { date_take: this.state.date_take, hour_take: this.state.hour_take } })]
        });

        const resetActionTwo = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'searchTool' })]
        });

        const goToWorkers = NavigationActions.navigate({
            routeName: 'Tools',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(resetActionTwo);
        this.props.navigation.dispatch(goToWorkers);
    };
    /* /On Button Press Method - Reset Actions/ */

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

    /* Handle Update Tool - Update Tool */
    _handleUpdate = () => {
        let that = this;

        const { navigation } = this.props;
        const tool_id = navigation.getParam('tool_id');
        const old_tool_name = navigation.getParam('tool_name');
        const old_tool_description = navigation.getParam('tool_description');
        const old_tool_count = navigation.getParam('tool_count');
        const old_tool_availability = navigation.getParam('tool_availability');

        const { tool_name, tool_description, tool_count, tool_availability } = this.state;

        let tool_nameError = validator('tool_name', tool_name);
        let tool_descriptionError = validator('tool_description', tool_description);
        let tool_countError = validator('tool_count', tool_count);
        let tool_availabilityError = validator('tool_availability', tool_availability);

        this.setState({
            tool_nameError: tool_nameError,
            tool_descriptionError: tool_descriptionError,
            tool_countError: tool_countError,
            tool_availabilityError: tool_availabilityError
        });

        if (!tool_nameError) {
            if (!tool_descriptionError) {
                if (!tool_countError) {
                    if (!tool_availabilityError) {
                        if (this.state.tool_name === old_tool_name && this.state.tool_description === old_tool_description && this.state.tool_count === old_tool_count && this.state.tool_availability === old_tool_availability) {
                            that._showAsk();
                        }

                        else if (this.state.tool_name === this.state.tool_name || this.state.tool_description === this.state.tool_description || this.state.tool_count === this.state.tool_count || this.state.tool_availability === this.state.tool_availability) {
                            db.transaction((tx) => {
                                tx.executeSql(
                                    'UPDATE table_tools SET tool_name = ?, tool_description = ?, tool_count = ?, tool_availability = ? WHERE tool_id = ?', [tool_name, tool_description, tool_count, tool_availability, tool_id], () => {
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
        }
    };
    /* /Handle Update Tool - Update Tool/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);

        return {
            title: "Редактиране на инструмент",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
            headerLeft: <AntDesign name="arrowleft" style={custom.stackNavigatorBackIcon} onPress={() => { navigation.navigate('readTool') }}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { tool_nameError, tool_descriptionError, tool_countError, dialogVisible, dialogAsk, dialogError } = this.state;
        const responsive = responsives(this.props);
        const custom = styles(this.props);

        return (
            <Container>
                <Content style={responsive.toolForm}>
                    <View style={responsive.toolFormBox}>
                        <Form>
                            <View style={responsive.toolFormBoxView}>
                                <View>
                                    <Label style={custom.FormLabel}>Име на инструмента:</Label>
                                </View>
                                <View>
                                    <Item stackedLabel style={custom.FormItem}>
                                        <TextInput style={custom.FormInput} keyboardType='default' maxLength={100} value={this.state.tool_name} onChangeText={tool_name => this.setState({ tool_name })}/>
                                    </Item>
                                </View>
                                <View>
                                    <Text style={custom.errorMessages}>{tool_nameError ? tool_nameError : null} </Text>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.toolFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Описание на инструмента:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={255} value={this.state.tool_description} onChangeText={tool_description => this.setState({ tool_description })}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{tool_descriptionError ? tool_descriptionError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.toolFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Брой на инструмента:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='numeric' value={this.state.tool_count} onChangeText={tool_count => this.setState({ tool_count })}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{tool_countError ? tool_countError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormFieldSpacing}>
                                <View style={responsive.toolFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Наличност на инструмента:</Label>
                                    </View>
                                    <Picker selectedValue={this.state.tool_availability} onValueChange={(itemValue) => this.setState({ tool_availability: itemValue })} mode={"dropdown"}>
                                        <Picker.Item key="0" label="Има го в наличност" value="Има го в наличност"/>
                                        <Picker.Item key="1" label="Няма го в наличност" value="Няма го в наличност"/>
                                    </Picker>
                                </View>
                            </View>
                            <View style={custom.FormButtonSpacing}>
                                <Button title="Редактирайте" customClick={this._handleUpdate.bind(this)} disabled={this.state.disabled}/>
                            </View>
                        </Form>
                    </View>
                    <View>
                        <Alert title={'Редактиране на инструмент'} body={'Наистина ли искате да се върнете към инструментите без да сте направили промени по полетата?'} visible={dialogAsk} onSubmit={this._onButtonPress} onCancel={this._onCancel} first={"Да"} second={"Не"}/>
                    </View>
                    <View>
                        <Alert title={'Успешно'} body={'Вие редактирахте инструмента успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                    <View>
                        <Alert title={'Грешка'} body={'При редактирането на инструмент нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                </Content>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(updateTool);
