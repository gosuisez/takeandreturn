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

class updateWorker extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        const { navigation } = this.props;
        const worker_fname = navigation.getParam('worker_fname');
        const worker_sname = navigation.getParam('worker_sname');
        const worker_lname = navigation.getParam('worker_lname');
        const worker_email = navigation.getParam('worker_email');
        const worker_mobile = navigation.getParam('worker_mobile');
        const worker_address = navigation.getParam('worker_address');
        const worker_pincode = navigation.getParam('worker_pincode');

        this.state = {
            worker_id: '',
            worker_fname: worker_fname,
            worker_sname: worker_sname,
            worker_lname: worker_lname,
            worker_email: worker_email,
            worker_mobile: worker_mobile,
            worker_address: worker_address,
            worker_pincode: worker_pincode,
            worker_fnameError: null,
            worker_snameError: null,
            worker_lnameError: null,
            worker_emailError: null,
            worker_mobileError: null,
            worker_addressError: null,
            worker_pincodeError: null,
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
            actions: [NavigationActions.navigate({ routeName: 'searchWorker' })]
        });

        const goToWorkers = NavigationActions.navigate({
            routeName: 'Workers',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
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

    /* Handle Update Worker - Update Worker */
    _handleUpdate = () => {
        let that = this;

        const { navigation } = this.props;
        const worker_id = navigation.getParam('worker_id');
        const old_worker_fname = navigation.getParam('worker_fname');
        const old_worker_sname = navigation.getParam('worker_sname');
        const old_worker_lname = navigation.getParam('worker_lname');
        const old_worker_email = navigation.getParam('worker_email');
        const old_worker_mobile = navigation.getParam('worker_mobile');
        const old_worker_address = navigation.getParam('worker_address');
        const old_worker_pincode = navigation.getParam('worker_pincode');

        const { worker_fname, worker_sname, worker_lname, worker_email, worker_mobile, worker_address, worker_pincode } = this.state;

        let worker_fnameError = validator('worker_fname', worker_fname);
        let worker_snameError = validator('worker_sname', worker_sname);
        let worker_lnameError = validator('worker_lname', worker_lname);
        let worker_emailError = validator('worker_email', worker_email);
        let worker_mobileError = validator('worker_mobile', worker_mobile);
        let worker_addressError = validator('worker_address', worker_address);
        let worker_pincodeError = validator('worker_pincode', worker_pincode);

        this.setState({
            worker_fnameError: worker_fnameError,
            worker_snameError: worker_snameError,
            worker_lnameError: worker_lnameError,
            worker_emailError: worker_emailError,
            worker_mobileError: worker_mobileError,
            worker_addressError: worker_addressError,
            worker_pincodeError: worker_pincodeError
        });

        if (!worker_fnameError) {
        if (!worker_snameError) {
        if (!worker_lnameError) {
        if (!worker_emailError) {
        if (!worker_mobileError) {
        if (!worker_addressError) {
        if (!worker_pincodeError) {
            if (this.state.worker_fname === old_worker_fname && this.state.worker_sname === old_worker_sname && this.state.worker_lname === old_worker_lname && this.state.worker_email === old_worker_email && this.state.worker_mobile === old_worker_mobile && this.state.worker_address === old_worker_address && this.state.worker_pincode === old_worker_pincode) {
                that._showAsk();
            }

            else if (this.state.worker_fname === this.state.worker_fname || this.state.worker_sname === this.state.worker_sname || this.state.worker_lname === this.state.worker_lname || this.state.worker_email === this.state.worker_email || this.state.worker_mobile === this.state.worker_mobile || this.state.worker_address === this.state.worker_address || this.state.worker_pincode === this.state.worker_pincode) {
                db.transaction((tx) => {
                    tx.executeSql(
                        'UPDATE table_worker SET worker_fname = ?, worker_sname = ?, worker_lname = ?, worker_email = ?, worker_mobile = ?, worker_address = ?, worker_pincode = ? WHERE worker_id = ?',
                        [worker_fname, worker_sname, worker_lname, worker_email, worker_mobile, worker_address, worker_pincode, worker_id], () => {
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
        }}}}}}}
    };
    /* /Handle Update Worker - Update Worker/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
       const custom = styles(screenProps);
        const responsive = responsives(screenProps);

       return {
           title: "Редактиране на работник",
           headerStyle: responsive.headerStyle,
           headerTitleStyle: responsive.headerTitleStyle,
           headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('readWorker') }} style={custom.headerLeft}/>
       };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { worker_fnameError, worker_snameError, worker_lnameError, worker_emailError, worker_mobileError, worker_addressError, worker_pincodeError, dialogVisible, dialogAsk, dialogError } = this.state;

        const responsive = responsives(this.props);
        const custom = styles(this.props);

        return (
            <Container>
                <Content style={custom.PartForm}>
                    <Content style={responsive.workerForm}>
                        <View style={responsive.workerFormBoxUpdate}>
                            <Form>
                                <View style={responsive.workerFormBoxView}>
                                    <View>
                                        <Label style={custom.FormLabel}>Име на работника:</Label>
                                    </View>
                                    <View>
                                        <Item stackedLabel style={custom.FormItem}>
                                            <TextInput style={custom.FormInput} keyboardType='default' maxLength={30} value={this.state.worker_fname} onChangeText={worker_fname => this.setState({ worker_fname })}/>
                                        </Item>
                                    </View>
                                    <View>
                                        <Text style={custom.errorMessages}>{worker_fnameError ? worker_fnameError : null} </Text>
                                    </View>
                                </View>
                                <View style={custom.FormFieldSpacing}>
                                    <View style={responsive.workerFormBoxView}>
                                        <View>
                                            <Label style={custom.FormLabel}>Презиме на работника:</Label>
                                        </View>
                                        <View>
                                            <Item stackedLabel style={custom.FormItem}>
                                                <TextInput style={custom.FormInput} keyboardType='default' maxLength={30} value={this.state.worker_sname} onChangeText={worker_sname => this.setState({ worker_sname })}/>
                                            </Item>
                                        </View>
                                        <View>
                                            <Text style={custom.errorMessages}>{worker_snameError ? worker_snameError : null} </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={custom.FormFieldSpacing}>
                                    <View style={responsive.workerFormBoxView}>
                                        <View>
                                            <Label style={custom.FormLabel}>Фамилия на работника:</Label>
                                        </View>
                                        <View>
                                            <Item stackedLabel style={custom.FormItem}>
                                                <TextInput style={custom.FormInput} keyboardType='default' maxLength={30} value={this.state.worker_lname} onChangeText={worker_lname => this.setState({ worker_lname })}/>
                                            </Item>
                                        </View>
                                        <View>
                                            <Text style={custom.errorMessages}>{worker_lnameError ? worker_lnameError : null} </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={custom.FormFieldSpacing}>
                                    <View style={responsive.workerFormBoxView}>
                                        <View>
                                            <Label style={custom.FormLabel}>Имейл на работника:</Label>
                                        </View>
                                        <View>
                                            <Item stackedLabel style={custom.FormItem}>
                                                <TextInput style={custom.FormInput} keyboardType='email-address' maxLength={255} value={this.state.worker_email} onChangeText={worker_email => this.setState({ worker_email })} editable={false}/>
                                            </Item>
                                        </View>
                                        <View>
                                            <Text style={custom.errorMessages}>{worker_emailError ? worker_emailError : null} </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={custom.FormFieldSpacing}>
                                    <View style={responsive.workerFormBoxView}>
                                        <View>
                                            <Label style={custom.FormLabel}>Телефон на работника:</Label>
                                        </View>
                                        <View>
                                            <Item stackedLabel style={custom.FormItem}>
                                                <TextInput style={custom.FormInput} keyboardType='numeric' maxLength={16} value={this.state.worker_mobile} onChangeText={worker_mobile => this.setState({ worker_mobile })}/>
                                            </Item>
                                        </View>
                                        <View>
                                            <Text style={custom.errorMessages}>{worker_mobileError ? worker_mobileError : null} </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={custom.FormFieldSpacing}>
                                    <View style={responsive.workerFormBoxView}>
                                        <View>
                                            <Label style={custom.FormLabel}>Адрес на работника:</Label>
                                        </View>
                                        <View>
                                            <Item stackedLabel style={custom.FormTextArea}>
                                                <TextInput style={custom.FormInput} keyboardType='default' maxLength={200} value={this.state.worker_address} multiline={true} numberOfLines={10} onChangeText={worker_address => this.setState({ worker_address })}/>
                                            </Item>
                                        </View>
                                        <View>
                                            <Text style={custom.errorMessages}>{worker_addressError ? worker_addressError : null} </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={custom.FormFieldSpacing}>
                                    <View style={responsive.workerFormBoxView}>
                                        <View>
                                            <Label style={custom.FormLabel}>Парола на работника:</Label>
                                        </View>
                                        <View>
                                            <Item stackedLabel style={custom.FormItem}>
                                                <TextInput style={custom.FormInput} keyboardType='default' maxLength={255} value={this.state.worker_pincode} onChangeText={worker_pincode => this.setState({ worker_pincode })} editable={false}/>
                                            </Item>
                                        </View>
                                        <View>
                                            <Text style={custom.errorMessages}>{worker_pincodeError ? worker_pincodeError : null} </Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={custom.FormButtonSpacing}>
                                    <Button title="Редактирайте" customClick={this._handleUpdate.bind(this)} disabled={this.state.disabled}/>
                                </View>
                            </Form>
                        </View>
                        <View>
                            <Alert title={'Редактиране на работник'} body={'Наистина ли искате да се върнете към работниците без да сте направили промени по полетата?'} visible={dialogAsk} onSubmit={this._onButtonPress} onCancel={this._onCancel} first={"Да"} second={"Не"}/>
                        </View>
                        <View>
                            <Alert title={'Успешно'} body={'Вие редактирахте работника успешно!'} visible={dialogVisible} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                        </View>
                        <View>
                            <Alert title={'Грешка'} body={'При редактирането на работник нещо се обърка, моля опитайте по-късно!'} visible={dialogError} onSubmit={this._onButtonPress} onCancel={this._onButtonPress} first={"ОК"} second={""}/>
                        </View>
                    </Content>
                </Content>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(updateWorker);
/* /Exports/ */
