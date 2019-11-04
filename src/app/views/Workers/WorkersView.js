/* Imports */
import React from 'react';
import { Text, FlatList, View, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { Container, Content, ListItem, List, Icon, Fab, Header, Body, Left, Title, Button, Right } from 'native-base';
import { MaterialCommunityIcons } from '@app/utils/Icons';
import { NavigationActions, StackActions } from 'react-navigation';
import db from "@app/utils/Database";
import { withTheme } from '@app/theme/themeProvider';
import {responsives} from '@app/styles/config';
import {styles} from '@app/styles/config';
console.disableYellowBox = true;
/* /Imports/ */

class WorkersView extends React.Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = (screenProps) => {
        const custom = styles(screenProps);

        return {
            title: "Работници",
            drawerIcon: () => (<MaterialCommunityIcons name="worker" style={custom.drawerMenuIcon}/>),
            header: null
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true
        };
    }
    /* /Constructor Initialize - Here Are Our States/ */

    _isMounted = false;

    /* Component Did Mount Method - Here Is Our Data For Absences */
    componentDidMount() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_worker', [], (tx, results) => {
                this._isMounted = true;
                if (this._isMounted) {
                    let rows = results.rows.raw();
                    this.setState({ data: rows, isLoading: false });
                }
            });
        });
    }
    /* /Component Did Mount Method - Here Is Our Data For Absences/ */

    /* Component Will Unmount Method - Here We Unmount Component - Data */
    componentWillUnmount() {
        this._isMounted = false;
    }
    /* /Component Will Unmount Method - Here We Unmount Component - Data/ */

    /* Component Did Update Method - Here We Update Component - Data */
    componentDidUpdate() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_worker', [], (tx, results) => {
                this._isMounted = true;
                if (this._isMounted) {
                    let rows = results.rows.raw();
                    this.setState({ data: rows, isLoading: false });
                }
            });
        });
    }
    /* /Component Did Update Method - Here We Update Component - Data/ */

    /* Handle Create Method - Navigate to CreateWorker */
    _handleCreate() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'createWorker' })]
        });

        const goToWorkers = NavigationActions.navigate({
            routeName: 'createWorker',
            params: {}
        });

        this.props.navigation.dispatch(resetAction);
        this.props.navigation.dispatch(goToWorkers);
    }
    /* /Handle Create Method - Navigate to CreateWorker/ */

    /* Handle Read Method - Navigate to ReadWorker */
    _handleRead(worker_id, worker_fname, worker_sname, worker_lname, worker_email, worker_mobile, worker_address, worker_pincode, worker_tiw, worker_riw) {
        this.props.navigation.navigate('readWorker', { worker_id: worker_id, worker_fname: worker_fname, worker_sname: worker_sname, worker_lname: worker_lname, worker_email: worker_email, worker_mobile: worker_mobile, worker_address: worker_address, worker_pincode: worker_pincode, worker_tiw: worker_tiw, worker_riw: worker_riw });
    }
    /* /Handle Read Method - Navigate to ReadWorker/ */

    /* Handle Search Method - Navigate to SearchWorker */
    _handleSearch() {
        this.props.navigation.navigate('searchWorker');
    }
    /* /Handle Search Method - Navigate to SearchWorker/ */

    /* Key Extractor Method - For Index Workers */
    _keyExtractor(index) {
        return index.toString();
    }
    /* /Key Extractor Method - For Index Workers/ */

    /* Render Item - Render One Row - Item - (Worker) */
    _renderItem({ item }) {
        const custom = styles(this.props);

        return (
            <View style={custom.PartView}>
                <ListItem style={custom.PartListItem} onPress={() => this._handleRead(item.worker_id, item.worker_fname, item.worker_sname, item.worker_lname, item.worker_email, item.worker_mobile, item.worker_address, item.worker_pincode, item.worker_tiw, item.worker_riw)}>
                    <MaterialCommunityIcons name="worker" style={custom.PartIcon}/>
                    <Text style={custom.PartName}>{item.worker_fname} {item.worker_sname} {item.worker_lname}</Text>
                </ListItem>
            </View>
        );
    }
    /* /Render Item - Render One Row - Item - (Worker)/ */

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
                        Няма добавени работници.
                    </Text>
                </Content>
            );
        }
    }
    /* /Check Data Method - Here We Check If Data Is More Than 0 Or Else Is Less Than 0/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const custom = styles(this.props);
        const responsive = responsives(this.props);

        if(this.state.isLoading === true ) {
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
                        <Title style={responsive.headerTitle}>Работници</Title>
                        </Body>
                        <Right>
                            <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this._handleSearch()}>
                                <Button transparent onPress={() => this._handleSearch()}>
                                    <Icon name="search" style={custom.headerIcon} onPress={() => this._handleSearch()}/>
                                </Button>
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <Content contentContainerStyle={custom.container} style={custom.content}>
                        <ActivityIndicator size={70} color="#243039" />
                    </Content>
                </Container>
            );
        }

        else {
            return (
                <Container>
                    <Header style={custom.header} >
                        <StatusBar backgroundColor="#425768" barStyle="default"/>
                        <Left>
                            <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this.props.navigation.openDrawer('DrawerOpen')}>
                                <Button transparent onPress={() => this.props.navigation.openDrawer('DrawerOpen')}>
                                    <Icon name="menu" style={custom.headerIcon} onPress={() => this.props.navigation.openDrawer('DrawerOpen')}/>
                                </Button>
                            </TouchableOpacity>
                        </Left>
                        <Body style={custom.headerBody}>
                        <Title style={responsive.headerTitle}>Работници</Title>
                        </Body>
                        <Right>
                            <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this._handleSearch()}>
                                <Button transparent onPress={() => this._handleSearch()}>
                                    <Icon name="search" style={custom.headerIcon} onPress={() => this._handleSearch()}/>
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
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(WorkersView);
