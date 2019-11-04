/* Imports */
import React from 'react';
import { View, TextInput, Text, Picker } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';
import { Container, Content, Form, Item, Label } from 'native-base';
import validator from '@app/validation/validator';
import { AntDesign } from '@app/utils/Icons';
import { Button, Alert } from '@app/components/config';
import { withTheme} from '@app/theme/themeProvider';
import {responsives} from '@app/styles/config';
import {styles} from '@app/styles/config';
import db from "@app/utils/Database";
/* /Imports/ */

class createTool extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const subcategory_id = navigation.getParam('subcategory_id');

        this.state = {
            subcategory_id: subcategory_id,
            tool_name: '',
            tool_nameError: null,
            tool_description: '',
            tool_descriptionError: null,
            tool_count: '',
            tool_countError: null,
            tool_availability: '',
            tool_availabilityError: null,
            dialogVisible: false,
            dialogError: false,
            disabled: false
        };

        this._onButtonPress = this._onButtonPress.bind(this);
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* On Button Press Method - Reset Actions */
    _onButtonPress = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'createTool', params: { subcategory_id: this.state.subcategory_id} })]
        });

        const goToTools = NavigationActions.navigate({
            routeName: 'Tools',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(goToTools);
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
    /* /Component Did Mount Method - Here We Apply On Button Press With Navigation/ */

    /* Handle Create Tool - Create New Tool */
    _handleCreate = () => {
        let that = this;

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
            const { navigation } = this.props;
            const subcategory_id = navigation.getParam('subcategory_id');
            db.transaction(function (tx) {
                tx.executeSql(
                    'INSERT INTO table_tools (subcategory_id, tool_name, tool_description, tool_count, tool_availability) VALUES (?, ?, ?, ?, ?)',
                    [subcategory_id, tool_name, tool_description, tool_count, tool_availability], (tx, results) => {
                        if (results.rowsAffected > 0) {
                            that._showDialog();
                            that.setState({disabled: true});
                            setTimeout(()=> { that.setState({disabled: false}); }, 5000);
                        } else {
                            that._showError();
                        }
                    }
                );
            });
        }}}}
    };
    /* /Handle Create Tool - Create New Tool/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        const custom = styles(screenProps);

        return {
            title: "Добавяне на инструмент",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { params.handleRemove() }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { tool_nameError, tool_descriptionError, tool_countError, tool_availabilityError, dialogVisible, dialogError } = this.state;
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
                                        <TextInput style={custom.FormInput} keyboardType='default' maxLength={100} onChangeText={tool_name => this.setState({ tool_name })}/>
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
                                        <Item stackedLabel style={custom.FormTextArea}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={255} onChangeText={tool_description => this.setState({ tool_description })} multiline={true} numberOfLines={10}/>
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
                                            <TextInput style={custom.FormInput} keyboardType='numeric' maxLength={30} onChangeText={tool_count => this.setState({ tool_count })}/>
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
                                    <View>
                                        <Picker selectedValue={this.state.tool_availability} onValueChange={(itemValue) => this.setState({ tool_availability: itemValue })} mode={"dropdown"}>
                                            <Picker.Item key="0" label="Изберете наличност на инструмента"/>
                                            <Picker.Item key="1" label="Има го в наличност" value={"Има го в наличност"}/>
                                            <Picker.Item key="2" label="Няма го в наличност" value={"Няма го в наличност"}/>
                                        </Picker>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{tool_availabilityError ? tool_availabilityError : null} </Text>
                                    </View>
                                </View>
                            </View>
                            <View style={custom.FormButtonSpacing}>
                                <Button title="Добавете" customClick={this._handleCreate.bind(this)} disabled={this.state.disabled}/>
                            </View>
                        </Form>
                    </View>
                    <View>
                        <Alert title={'Успешно'} body={'Вие добавихте инструмента успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"OK"} second={""}/>
                    </View>
                    <View>
                        <Alert title={'Грешка'} body={'При добавянето на инструмент нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                </Content>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(createTool);
