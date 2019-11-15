/* Imports */
import React from 'react';
import {Text, Image, View, ActivityIndicator} from 'react-native';
import SearchBar from 'react-native-searchbar';
import { SwipeListView } from "react-native-swipe-list-view";
import { ListItem, List, Content, Container } from 'native-base';
import { styles } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign, FontAwesome } from '@app/utils/Icons';
import db from "@app/utils/Database";
/* /Imports/ */

class searchSubCategory extends React.Component {
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

    /* Component Did Mount Method - Here Is Our Data For SubCategories */
    componentDidMount() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_subcategories', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({ data: rows, isLoading: false });
                this.arrayholder = rows;
            });
        });
    };
    /* /Component Did Mount Method - Here Is Our Data For SubCategories/ */

    /* Handle Search Method - Search SubCategory */
    _handleSearch = text => {
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.subcategory_name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData
        });
    };
    /* /Handle Search Method - Search SubCategory/ */

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
                            placeholder="Търсете подкатегория"
                            handleChangeText={text => this._handleSearch(text)}
                            backButton={<AntDesign name="arrowleft" style={custom.stackNavigatorSearchArrow} size={24} onPress={() => {this.props.navigation.navigate('SubCategories')}}/>}
                            backgroundColor={this.props.theme.color}
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
                            placeholder="Търсете подкатегория"
                            handleChangeText={text => this._handleSearch(text)}
                            backButton={<AntDesign name="arrowleft" style={custom.stackNavigatorSearchArrow} size={24} onPress={() => {this.props.navigation.navigate('SubCategories')}}/>}
                            backgroundColor={this.props.theme.color}
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

/* Exports */
export default withTheme(searchSubCategory);
/* /Exports/ */
