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

class createSubCategory extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const category_id = navigation.getParam('category_id');

        this.state = {
            category_id: category_id,
            subcategory_name: '',
            subcategory_nameError: null,
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
            actions: [NavigationActions.navigate({ routeName: 'SubCategoriesView', params: { category_id: this.state.category_id } })]
        });

        const goToSubCategories = NavigationActions.navigate({
            routeName: 'SubCategoriesView',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(goToSubCategories);
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

    /* Handle Create SubCategory - Create New SubCategory */
    _handleCreate = () => {
        let that = this;

        const { subcategory_name } = this.state;

        let subcategory_nameError = validator('subcategory_name', subcategory_name);

        this.setState({
            subcategory_nameError: subcategory_nameError,
        });

        if (!subcategory_nameError) {
            const { navigation } = this.props;
            const category_id = navigation.getParam('category_id');
            db.transaction(function (tx) {
                tx.executeSql(
                    'INSERT INTO table_subcategories (subcategory_name, category_id) VALUES (?, ?)', [subcategory_name, category_id], (tx, results) => {
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
        }
    };
    /* /Handle Create SubCategory - Create New SubCategory/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const { params = {} } = navigation.state;
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Добавяне на подкатегория",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: responsive.headerTitleStyle,
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { params.handleRemove() }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { subcategory_nameError, dialogVisible, dialogError } = this.state;
        const responsive = responsives(this.props);
        const custom = styles(this.props);

        return (
            <Container>
                <Content style={responsive.subCategoryForm}>
                    <View style={responsive.subCategoryFormBox}>
                        <Form>
                            <View style={responsive.subCategoryFormBoxView}>
                                <View>
                                    <Label style={custom.FormLabel}>Име на подкатегорията:</Label>
                                </View>
                                <View>
                                    <Item stackedLabel style={custom.FormItem}>
                                        <TextInput style={custom.FormInput} keyboardType='default' maxLength={100} onChangeText={subcategory_name => this.setState({ subcategory_name })}/>
                                    </Item>
                                </View>
                                <View>
                                    <Text style={custom.errorMessages}>{subcategory_nameError ? subcategory_nameError : null} </Text>
                                </View>
                            </View>
                            <View style={custom.FormButtonSpacing}>
                                <Button title="Добавете" customClick={this._handleCreate.bind(this)} disabled={this.state.disabled}/>
                            </View>
                        </Form>
                    </View>
                    <View>
                        <Alert title={'Успешно'} body={'Вие добавихте подкатегорията успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"OK"} second={""}/>
                    </View>
                    <View>
                        <Alert title={'Грешка'} body={'При добавянето на подкатегория нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                    </View>
                </Content>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(createSubCategory);
/* /Exports/ */
