/* Imports */
import React from 'react';
import {Text, Image, View, ActivityIndicator} from 'react-native';
import SearchBar from 'react-native-searchbar';
import { Container, Content, ListItem, List } from 'native-base';
import { AntDesign, FontAwesome } from '@app/utils/Icons';
import {SwipeListView} from "react-native-swipe-list-view";
import { withTheme} from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
import db from "@app/utils/Database";
/* /Imports/ */

class searchCategory extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            isLoading: true
        };

        this.arrayholder = [];
    }
    /* /Constructor Initialize - Here Are Our States/ */
    _isMounted = false;
    /* Component Did Mount Method - Here Is Our Data For Categories */
    componentDidMount() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM categories', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({ data: rows, isLoading: false });
                this.arrayholder = rows;
            });
        });
    }
    /* /Component Did Mount Method - Here Is Our Data For Categories/ */

    /* Component Will Unmount Method - Here We Unmount Component - Data */
    componentWillUnmount() {
        this._isMounted = false;
    }
    /* /Component Will Unmount Method - Here We Unmount Component - Data/ */

    /* Handle Read Method - Navigate To SubCategories - Read Category */
    _handleRead(category_id) {
        this.props.navigation.navigate('SubCategories', { category_id: category_id });
    }
    /* /Handle Read Method - Navigate To SubCategories - Read Category/ */

    /* Handle Update Method - Navigate To UpdateCategory */
    _handleUpdate(category_id, category_name) {
        this.props.navigation.navigate('updateCategory', { category_id: category_id, category_name: category_name });
    }
    /* /Handle Update Method - Navigate To UpdateCategory/ */

    /* Handle Delete Method - Navigate To DeleteCategory */
    _handleDelete(category_id) {
        this.props.navigation.navigate('deleteCategory', { category_id: category_id });
    }
    /* /Handle Delete Method - Navigate To DeleteCategory/ */

    /* Handle Search Method - Search Category */
    _handleSearch = text => {
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.category_name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData
        });
    };
    /* /Handle Search Method - Search Category/ */

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
        );
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
                <List style={custom.PartListSearch}>
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
    static navigationOptions = () => {
        return {
            header: null
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const custom = styles(this.props);

        if (this.state.isLoading === true) {
            return (
                <Container>
                    <View>
                        <SearchBar
                            ref={(ref) => this.searchBar = ref}
                            data={this.state.data}
                            showOnLoad
                            placeholder="Търсете категория"
                            handleChangeText={text => this._handleSearch(text)}
                            backButton={<AntDesign name="arrowleft" style={custom.stackNavigatorSearchArrow} size={24} onPress={() => {this.props.navigation.navigate('Categories')}}/>}
                            backgroundColor="#22364F"
                            textColor="#F5F5F5"
                            iconColor="#F5F5F5"
                        />
                    </View>
                    <Content contentContainerStyle={custom.container} style={custom.content}>
                        <ActivityIndicator size={70} color="#22364F" />
                    </Content>
                </Container>
            );
        }

        else {
            return (
                <Container>
                    <View>
                        <SearchBar
                            ref={(ref) => this.searchBar = ref}
                            data={this.state.data}
                            showOnLoad
                            placeholder="Търсете категория"
                            handleChangeText={text => this._handleSearch(text)}
                            backButton={<AntDesign name="arrowleft" style={custom.stackNavigatorSearchArrow} size={24} onPress={() => {this.props.navigation.navigate('Categories')}}/>}
                            backgroundColor="#22364F"
                            textColor="#F5F5F5"
                            iconColor="#F5F5F5"
                        />
                    </View>
                    {this._checkData()}
                </Container>
            );
        }
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(searchCategory);
