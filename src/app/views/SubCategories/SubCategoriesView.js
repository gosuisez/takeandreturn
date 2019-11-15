/* Imports */
import React from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SwipeListView } from "react-native-swipe-list-view";
import { ListItem, List, Content, Container, Header, Left, Button, Body, Title, Right, Fab, Icon } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign, FontAwesome } from '@app/utils/Icons';
import db from "@app/utils/Database";
/* /Imports/ */

class SubCategoriesView extends React.PureComponent {
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

    /* Component Data Method - Here Is Our Data For SubCategories */
    componentData() {
        const { navigation } = this.props;
        const category_id = navigation.getParam('category_id');

        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_subcategories WHERE category_id=' + `${category_id}`, [], (tx, results) => {
                this._isMounted = true;

                if (this._isMounted) {
                    let rows = results.rows.raw();
                    this.setState({data: rows, isLoading: false});
                    this.arrayholder = rows;
                }
            });
        });
    }
    /* /Component Data Method - Here Is Our Data For SubCategories/ */

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

    /* Handle Search Method - Navigate to SearchSubCategory */
    _handleSearch(category_id) {
        this.props.navigation.navigate('searchSubCategory', { category_id: category_id });
    }
    /* /Handle Search Method - Navigate to SearchSubCategory/ */

    /* Handle Create Method - Navigate to CreateSubCategory */
    _handleCreate(category_id) {
        this.props.navigation.navigate('createSubCategory', { category_id: category_id });
    }
    /* /Handle Create Method - Navigate to CreateSubCategory/ */

    /* Handle Read Method - Navigate to Tools - Read SubCategory */
    _handleRead(subcategory_id) {
        this.props.navigation.navigate('Tools', { subcategory_id: subcategory_id });
    }
    /* /Handle Read Method - Navigate to Tools - Read SubCategory/ */

    /* Handle Update Method - Navigate to UpdateSubCategory */
    _handleUpdate(subcategory_id, subcategory_name, category_id) {
        this.props.navigation.navigate('updateSubCategory', { subcategory_id: subcategory_id, subcategory_name: subcategory_name, category_id: category_id });
    }
    /* /Handle Update Method - Navigate to UpdateSubCategory/ */

    /* Handle Delete Method - Navigate to DeleteSubCategory */
    _handleDelete(subcategory_id) {
        this.props.navigation.navigate('deleteSubCategory', { subcategory_id: subcategory_id });
    }
    /* /Handle Delete Method - Navigate to DeleteSubCategory/ */

    /* Key Extractor Method - For Index SubCategories */
    _keyExtractor = (item, index) => {
        return index.toString();
    };
    /* /Key Extractor Method - For Index SubCategories/ */

    /* Render Item - Render One Row - Item - (SubCategory) */
    _renderItem = (index, item) => {
        const custom = styles(this.props);

        return (
            <View style={custom.PartView}>
                <ListItem style={custom.PartListItem} onPress={() => this._handleRead(item.subcategory_id)}>
                    <Image style={custom.PartImage} source={require('@app/assets/images/subcategories.png')}/>
                    <Text style={custom.PartName}> {item.subcategory_name} </Text>
                </ListItem>
            </View>
        );
    };
    /* /Render Item - Render One Row - Item - (SubCategory)/ */

    /* Render Quick Action - Render One Action - Button - (SubCategory) */
    _renderQuickActionButton = (index, item) => {
        const { navigation } = this.props;
        const category_id = navigation.getParam('category_id');
        const custom = styles(this.props);

        return (
            <View>
                <View style={custom.PartQuickActionButtons}>
                    <AntDesign name="eye" style={custom.PartRead} onPress={() => this._handleRead(item.subcategory_id)}/>
                </View>
                <View style={custom.PartQuickActionButtons}>
                    <AntDesign name="edit" style={custom.PartUpdate} onPress={() => this._handleUpdate(item.subcategory_id, item.subcategory_name, category_id)}/>
                </View>
                <View style={custom.PartQuickActionButtons}>
                    <FontAwesome name="remove" style={custom.PartDelete} onPress={() => this._handleDelete(item.subcategory_id)}/>
                </View>
            </View>
        );
    };
    /* /Render Quick Action - Render One Action - Button - (SubCategory)/ */

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
                        Няма добавени подкатегории.
                    </Text>
                </Content>
            );
        }
    }
    /* /Check Data Method - Here We Check If Data Is More Than 0 Or Else Is Less Than 0/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = () => {
        return {
            title: "Подкатегории",
            header: null
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { navigation } = this.props;
        const category_id = navigation.getParam('category_id');
        const custom = styles(this.props);

        const responsive = responsives(this.props);

        if (this.state.isLoading === true) {
            return (
                <Container>
                    <Header style={custom.header}>
                        <StatusBar backgroundColor="#425768" barStyle="default"/>
                        <Left>
                            <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this.props.navigation.navigate('Categories')}>
                                <Button transparent onPress={() => this.props.navigation.navigate('Categories')}>
                                    <AntDesign name="arrowleft" style={custom.headerBackIcon} onPress={() => this.props.navigation.navigate('Categories')} />
                                </Button>
                            </TouchableOpacity>
                        </Left>
                        <Body style={custom.headerBody}>
                            <Title style={responsive.headerTitle}>Подкатегории</Title>
                        </Body>
                        <Right>
                            <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this._handleSearch()}>
                                <Button transparent onPress={() => this._handleSearch()}>
                                    <Icon name="search" style={custom.headerIcon} onPress={() => this._handleSearch()} />
                                </Button>
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <Content contentContainerStyle={custom.container} style={custom.content}>
                        <ActivityIndicator size={70} color="#243039"/>
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
                            <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this.props.navigation.navigate('Categories')}>
                                <Button transparent onPress={() => this.props.navigation.navigate('Categories')}>
                                    <AntDesign name="arrowleft" style={custom.headerBackIcon} onPress={() => this.props.navigation.navigate('Categories')} />
                                </Button>
                            </TouchableOpacity>
                        </Left>
                        <Body style={custom.headerBody}>
                            <Title style={responsive.headerTitle}>Подкатегории</Title>
                        </Body>
                        <Right>
                            <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this._handleSearch()}>
                                <Button transparent onPress={() => this._handleSearch()}>
                                    <Icon name="search" style={custom.headerIcon} onPress={() => this._handleSearch()} />
                                </Button>
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    {this._checkData()}
                    <View>
                        <Fab style={custom.PartCreate} active={'true'} direction="up" position="bottomRight" onPress={() => this._handleCreate(category_id)}>
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
export default withTheme(SubCategoriesView);
/* /Exports/ */
