/* Imports */
import React from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import { View, TextInput, Text } from 'react-native';
import { Container, Content, Form, Label, Item } from 'native-base';
import validator from '@app/validation/validator';
import { Button, Alert } from '@app/components/config';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
import db from "@app/utils/Database";
/* /Imports/ */

class updateCategory extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        const { navigation } = this.props;

        const category_name = navigation.getParam('category_name');

        this.state = {
            category_id: '',
            category_name: category_name,
            category_nameError: null,
            dialogVisible: false,
            dialogError: false,
            dialogAsk: false,
            disabled: false
        };

        this._onButtonPress = this._onButtonPress.bind(this);
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* Component Did Mount Method - Here We Apply On Button Press With Navigation */
    componentDidMount() {
        this.props.navigation.setParams({ handleRemove: this._onButtonPress });
    };
    /* /Component Did Mount Method - Here We Apply On Button Press With Navigation/ */

    /* On Button Press Method - Reset Actions */
    _onButtonPress = () => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'searchCategory' })]
        });

        const goToCategories = NavigationActions.navigate({
            routeName: 'Categories',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(goToCategories);
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

    /* Handle Update Category - Update Category */
    _handleUpdate = () => {
        let that = this;

        const { navigation } = this.props;
        const category_id = navigation.getParam('category_id');
        const old_category_name = navigation.getParam('category_name');

        const { category_name } = this.state;

        let category_nameError = validator('category_name', category_name);

        this.setState({
            category_nameError: category_nameError
        });

        if (!category_nameError) {
            if (this.state.category_name === old_category_name) {
                that._showAsk();
            }
            else if (this.state.category_name === this.state.category_name) {
                db.transaction((tx) => {
                    tx.executeSql(
                        'UPDATE categories SET category_name = ? WHERE category_id = ?', [category_name, category_id], () => {
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
    };
    /* /Handle Update Category - Update Category/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps}) => {
        const { params = {} } = navigation.state;
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Редактиране на категория",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: {color: '#F5F5F5'},
            headerLeft: <AntDesign name="arrowleft" style={custom.stackNavigatorBackIcon} onPress={() => { params.handleRemove() }}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { category_nameError, dialogVisible, dialogAsk, dialogError } = this.state;
        const custom = styles(this.props);
        const responsive = responsives(this.props);

        return (
            <Container>
                <Content style={responsive.categoryForm}>
                    <View style={responsive.categoryFormBoxUpdate}>
                        <Form>
                            <View style={responsive.categoryFormBoxView}>
                                <View>
                                    <Label style={custom.FormLabel}>Име на категорията:</Label>
                                </View>
                                <View>
                                    <Item stackedLabel style={custom.FormItem}>
                                        <TextInput style={custom.FormInput} keyboardType='default' maxLength={100} value={this.state.category_name} onChangeText={category_name => this.setState({ category_name })}/>
                                    </Item>
                                </View>
                                <View>
                                    <Text style={custom.errorMessages}>{category_nameError ? category_nameError : null} </Text>
                                </View>
                            </View>
                            <View style={custom.PartUpdateButton}>
                                <Button title="Редактирайте" customClick={this._handleUpdate.bind(this)} disabled={this.state.disabled}/>
                            </View>
                        </Form>
                    </View>
                    <View>
                        <Alert title={'Редактиране на категория'} body={'Наистина ли искате да се върнете към категориите без да сте направили промени по полетата?'} visible={dialogAsk} onSubmit={this._onButtonPress} onCancel={this._onCancel} first={"Да"} second={"Не"}/>
                    </View>
                    <View>
                        <Alert title={'Успешно'} body={'Вие редактирахте категорията успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                    <View>
                        <Alert title={'Грешка'} body={'При редактирането на категория нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                </Content>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(updateCategory);
/* /Exports/ */
