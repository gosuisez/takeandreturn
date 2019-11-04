/* Imports */
import React from 'react';
import { Text, View, FlatList, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Container, Content, ListItem, List, Icon, Fab, Header, Body, Left, Title, Button, Right } from 'native-base';
import CheckBox from 'react-native-check-box'
import moment from 'moment';
import { NavigationActions, StackActions } from 'react-navigation';
import db from "@app/utils/Database";
import { withTheme } from '@app/theme/themeProvider';
import {responsives} from '@app/styles/config';
import {styles} from '@app/styles/config';
import { MaterialCommunityIcons } from '@app/utils/Icons';
/* /Imports/ */

class ToolsWorkersView extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            date_take: moment().format('YYYY-MM-DD'),
            hour_take: moment().format('HH:mm'),
            date_return: moment().format('YYYY-MM-DD'),
            hour_return: moment().format('HH:mm'),
            isLoading: true
        };
    }
    /* /Constructor Initialize - Here Are Our States/ */
    _isMounted = false;
    /* Component Did Mount Method - Here Is Our Data For Tools In Workers */
    componentDidMount() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_tools_workers JOIN table_tools ON table_tools.tool_id = table_tools_workers.tool_id JOIN table_worker ON table_worker.worker_id = table_tools_workers.worker_id', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({ data: rows, isLoading: false });
                this.arrayholder = rows;
            })
        });
    }
    /* /Component Did Mount Method - Here Is Our Data For Tools In Workers/ */

    /* Component Will Unmount Method - Here We Unmount Component - Data */
    componentWillUnmount() {
        this._isMounted = false;
    }
    /* /Component Will Unmount Method - Here We Unmount Component - Data/ */

    /* Component Did Update Method - Here We Update Component - Data */
    componentDidUpdate() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_tools_workers JOIN table_tools ON table_tools.tool_id = table_tools_workers.tool_id JOIN table_worker ON table_worker.worker_id = table_tools_workers.worker_id', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({ data: rows, isLoading: false });
                this.arrayholder = rows;
            })
        });
    }
    /* /Component Did Update Method - Here We Update Component - Data/ */

    /* Handle Create Method - Navigate to CreateToolWorker */
    _handleCreate() {
        const date_take = this.state.date_take;
        const hour_take = this.state.hour_take;

        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'createToolWorker', params: { date_take: date_take, hour_take: hour_take } })],
        });

        const goToToolsWorkers = NavigationActions.navigate({
            routeName: 'createToolWorker',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(goToToolsWorkers);
    }
    /* /Handle Create Method - Navigate to CreateToolWorker/ */

    /* Handle Read Method - Navigate to ReadToolWorker */
    _handleRead(tool_worker_id, worker_fname, worker_sname, worker_lname, worker_email, worker_pincode, tool_id, tool_name, tool_count, date_take, hour_take, checked, worker_tiw, worker_riw, worker_id) {
        this.props.navigation.navigate('readToolWorker', { tool_worker_id: tool_worker_id, worker_fname: worker_fname, worker_sname: worker_sname, worker_lname: worker_lname, worker_email: worker_email, worker_pincode: worker_pincode, tool_id: tool_id, tool_name: tool_name, tool_count: tool_count, date_take: date_take, hour_take: hour_take, checked: checked, worker_tiw: worker_tiw, worker_riw: worker_riw, worker_id: worker_id });
    }
    /* /Handle Read Method - Navigate to ReadToolWorker/ */

    /* Handle Search Method - SearchToolWorker */
    handleSearch() {
        this.props.navigation.navigate('searchToolWorker');
    }
    /* /Handle Search Method - SearchToolWorker/ */

    /* Handle Change Method - Navigate to ReturnToolWorker */
    _handleChange = (worker_fname, worker_sname, worker_lname, tool_id, tool_name, tool_count, worker_email, worker_pincode, tool_worker_id, date_take, hour_take, date_return, hour_return, worker_tiw, worker_riw, worker_id) => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'returnToolWorker', params: { worker_fname: worker_fname, worker_sname: worker_sname, worker_lname: worker_lname, worker_email: worker_email, worker_pincode: worker_pincode, tool_id: tool_id, tool_name: tool_name, tool_count: tool_count, tool_worker_id: tool_worker_id, date_take: date_take, hour_take: hour_take, date_return: date_return, hour_return: hour_return, worker_tiw: worker_tiw, worker_riw: worker_riw, worker_id: worker_id } })],
        });

        const goToToolsWorkers = NavigationActions.navigate({
            routeName: 'returnToolWorker',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(goToToolsWorkers);
    };
    /* /Handle Change Method - Navigate to ReturnToolWorker/ */

    /* Key Extractor Method - For Index Workers */
    _keyExtractor(index) {
        return index.toString();
    };
    /* /Key Extractor Method - For Index Workers/ */

    /* Render Item - Render One Row - Item - (ToolWorker) */
    _renderItem({ item }) {
        const custom = styles(this.props);

        if (item.checked === 0) {
            return (
                <View style={custom.PartView}>
                    <ListItem style={custom.PartListItem}>
                        <Image style={custom.PartImage} source={require('@app/assets/images/tw.png')} />
                        <Text style={custom.PartName} onPress={() => this._handleRead(item.tool_worker_id, item.worker_fname, item.worker_sname, item.worker_lname, item.worker_email, item.worker_pincode, item.tool_id, item.tool_name, item.tool_count, item.date_take, item.hour_take, item.checked, item.worker_tiw, item.worker_riw, item.worker_id)}>{item.worker_fname} - {item.worker_sname} - {item.worker_lname} - {item.tool_name}</Text>
                        <CheckBox onClick={() => this._handleChange(item.worker_fname, item.worker_sname, item.worker_lname, item.tool_id, item.tool_name, item.tool_count, item.worker_email, item.worker_pincode, item.tool_worker_id, item.date_take, item.hour_take, this.state.date_return, this.state.hour_return, item.worker_tiw, item.worker_riw, item.worker_id)} isChecked={item.checked} checkedCheckBoxColor={'#22364F'} uncheckedCheckBoxColor={'#F5F5F5'} style={custom.FormCheckBox}/>
                    </ListItem>
                </View>
            );
        }
        else {
            return (
                <View style={custom.PartView}>
                    <ListItem style={custom.PartListItem}>
                        <Image style={custom.PartImage} source={require('@app/assets/images/tw.png')} />
                        <Text style={custom.PartName} onPress={() => this._handleRead(item.tool_worker_id, item.worker_fname, item.worker_sname, item.worker_lname, item.worker_email, item.worker_pincode, item.tool_id, item.tool_name, item.tool_count, item.date_take, item.hour_take, item.checked, item.worker_tiw, item.worker_riw, item.worker_id)}>{item.worker_fname} - {item.worker_sname} - {item.worker_lname} - {item.tool_name}</Text>
                        <CheckBox onClick={() => this.props.navigation.navigate('ToolsWorkersView')} isChecked={item.checked} checkedCheckBoxColor={'#22364F'} uncheckedCheckBoxColor={'#F5F5F5'} style={custom.FormCheckBox}/>
                    </ListItem>
                </View>
            );
        }
    }
    /* /Render Item - Render One Row - Item - (ToolWorker)/ */

    /* Check Data Method - Here We Check If Data Is More Than 0 Or Else Is Less Than 0 */
    _checkData() {
        const custom = styles(this.props);

        if (this.state.data.length > 0) {
            return (
                <List style={custom.PartList}>
                    <FlatList extraData={this.state} data={this.state.data} keyExtractor={this._keyExtractor.bind(this)} renderItem={this._renderItem.bind(this)}/>
                </List>
            );
        }

        else {
            return (
                <Content contentContainerStyle={custom.container} style={custom.content}>
                    <Text style={custom.noDataMessage}>
                        Няма взети и невърнати инструменти.
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
            title: "Взети и върнати",
            drawerIcon: () => (<MaterialCommunityIcons name="swap-horizontal-bold" style={custom.drawerMenuIcon}/>)
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const responsive = responsives(this.props);
        const custom = styles(this.props);

        return (
            <Container>
                <Header style={custom.header}>
                    <StatusBar backgroundColor="#425768" barStyle="default"/>
                    <Left>
                        <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this.props.navigation.openDrawer('DrawerOpen')}>
                            <Button transparent onPress={() => this.props.navigation.openDrawer('DrawerOpen')}>
                                <Icon name="menu" style={custom.headerIcon} onPress={() => this.props.navigation.openDrawer('DrawerOpen')}/>
                            </Button>
                        </TouchableOpacity>
                    </Left>
                    <Body style={custom.headerBody}>
                        <Title style={responsive.headerTitle}>Взети и върнати</Title>
                    </Body>
                    <Right>
                        <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this.handleSearch()}>
                            <Button transparent onPress={() => this.handleSearch()}>
                                <Icon name="search" style={custom.headerIcon} onPress={() => this.handleSearch()}/>
                            </Button>
                        </TouchableOpacity>
                    </Right>
                </Header>
                {this._checkData()}
                <View>
                    <Fab style={custom.PartCreate} active={'true'} direction="down" position="bottomRight" onPress={() => this._handleCreate()}>
                        <Icon name="add"/>
                    </Fab>
                </View>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(ToolsWorkersView);
