/* Imports */
import React from 'react';
import { View, Image, Text, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import { ListItem, List, Content, Container, Header, Left, Button, Body, Title, Right, Fab, Icon } from 'native-base';
import { SwipeListView } from "react-native-swipe-list-view";
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign, FontAwesome, FontAwesomeFive } from '@app/utils/Icons';
import db from "@app/utils/Database";
/* /Imports/ */

class CategoriesView extends React.PureComponent {
    _isMounted = false;

    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true
        };
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* Component Data Method - Here Is Our Data For Categories */
    componentData() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM categories', [], (tx, results) => {
                this._isMounted = true;
                if (this._isMounted) {
                    let rows = results.rows.raw();
                    this.setState({ data: rows, isLoading: false });
                }
            });
        });
    }
    /* Component Data Method - Here Is Our Data For Categories */

    /* Component Did Mount Method - Here We Mount Component - Data */
    componentDidMount() {
        this.componentData();
    }
    /* /Component Did Mount Method - Here We Mount Component - Data/ */

    /* Component Did Update Method - Here We Update Component - Data */
    componentDidUpdate() {
        this.componentData();
    }
    /* /Component Did Update Method - Here We Update Component - Data/ */

    /* Component Will Unmount Method - Here We Unmount Component - Data */
    componentWillUnmount() {
        this._isMounted = false;
    }
    /* /Component Will Unmount Method - Here We Unmount Component - Data/ */

    /* Handle Search Method - Navigate to SearchCategory */
    _handleSearch() {
        this.props.navigation.navigate('searchCategory');
    }
    /* /Handle Search Method - Navigate to SearchCategory/ */

    /* Handle Create Method - Navigate to CreateCategory */
    _handleCreate() {
        this.props.navigation.navigate('createCategory');
    }
    /* /Handle Create Method - Navigate to CreateCategory/ */

    /* Handle Read Method - Navigate to SubCategories - Read Category */
    _handleRead(category_id) {
        this.props.navigation.navigate('SubCategories', { category_id: category_id });
    }
    /* /Handle Read Method - Navigate to SubCategories - Read Category/ */

    /* Handle Update Method - Navigate to UpdateCategory */
    _handleUpdate(category_id, category_name) {
        this.props.navigation.navigate('updateCategory', { category_id: category_id, category_name: category_name });
    }
    /* /Handle Update Method - Navigate to UpdateCategory/ */

    /* Handle Delete Method - Navigate to DeleteCategory */
    _handleDelete(category_id) {
        this.props.navigation.navigate('deleteCategory', { category_id: category_id });
    };
    /* /Handle Delete Method - Navigate to DeleteCategory/ */

    /* Key Extractor Method - For Index Categories */
    _keyExtractor = (item, index) => {
        return index.toString();
    };
    /* /Key Extractor Method - For Index Categories/ */

    /* Render Item - Render One Row - Item - (Category) */
    _renderItem = (index, item) => {
        const custom = styles(this.props);

        return (
            <View style={custom.PartView}>
                <ListItem style={custom.PartListItem} onPress={() => this._handleRead(item.category_id)}>
                    <Image style={custom.PartImage} source={{ uri: 'asset:/images/' + `${item.category_icon}` }}/>
                    <Text style={custom.PartName}> {item.category_name} </Text>
                </ListItem>
            </View>
        )
    };
    /* /Render Item - Render One Row - Item - (Category)/ */

    /* Render Quick Action - Render One Action - Button - (Category) */
    _renderQuickActionButton = (index, item) => {
        const custom = styles(this.props);

        return (
            <View>
                <View style={custom.PartQuickActionButtons}>
                    <AntDesign name="eye" style={custom.PartRead} onPress={() => this._handleRead(item.category_id)}/>
                </View>
                <View style={custom.PartQuickActionButtons}>
                    <AntDesign name="edit" style={custom.PartUpdate} onPress={() => this._handleUpdate(item.category_id, item.category_name)}/>
                </View>
                <View style={custom.PartQuickActionButtons}>
                    <FontAwesome name="remove" style={custom.PartDelete} onPress={() => this._handleDelete(item.category_id)}/>
                </View>
            </View>
        );
    };
    /* /Render Quick Action - Render One Action - Button - (Category)/ */

    /* Check Data Method - Here We Check If Data Is More Than 0 Or Else Is Less Than 0 */
    _checkData() {
        const custom = styles(this.props);

        if (this.state.data.length > 0) {
            return (
                <List style={custom.PartList}>
                    <SwipeListView
                        data={this.state.data}
                        renderItem={({index, item}) => this._renderItem(index, item)}
                        renderHiddenItem={({index, item}) => this._renderQuickActionButton(index, item)}
                        leftOpenValue={20 + Math.random() * 150}
                        rightOpenValue={-150}
                        keyExtractor={this._keyExtractor.bind(this)}
                    />
                </List>
            );
        }

        else {
            return (
                <Content contentContainerStyle={custom.container} style={custom.content}>
                    <Text style={custom.noDataMessage}>
                        Няма добавени категории.
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
            title: "Инструменти",
            drawerIcon: () => (<FontAwesomeFive name="toolbox" style={custom.drawerMenuIcon}/>),
            header: null
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

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
                            <Title style={responsive.headerTitle}>Категории</Title>
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
                            <Title style={responsive.headerTitle}>Категории</Title>
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

/* Exports */
export default withTheme(CategoriesView);
/* /Exports/ */
