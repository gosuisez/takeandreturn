/* Imports */
import React from 'react';
import { Text, FlatList, View, Image } from 'react-native';
import SearchBar from 'react-native-searchbar';
import { Container, Content, ListItem, List } from 'native-base';
import { AntDesign } from '@app/utils/Icons';
import { withTheme} from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
import db from "@app/utils/Database";
/* /Imports/ */

class searchTool extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            error: null,
            refreshing: false
        };

        this.arrayholder = [];
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* Component Did Mount Method - Here Is Our Data For Tools */
    componentDidMount() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_tools', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({ data: rows, refreshing: false });
                this.arrayholder = rows;
            });
        });
    }
    /* /Component Did Mount Method - Here Is Our Data For Tools/ */

    /* Handle Read Method - Navigate To ReadTool */
    _handleRead(tool_id, tool_name, tool_description, tool_count, tool_availability) {
        this.props.navigation.navigate('readTool', { tool_id: tool_id, tool_name: tool_name, tool_description: tool_description, tool_count: tool_count, tool_availability: tool_availability });
    }
    /* /Handle Read Method - Navigate To ReadTool/ */

    /* Handle Search Method - Search Tool */
    _handleSearch = text => {
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.tool_name.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData
        });
    };
    /* /Handle Search Method - Search Tool/ */

    /* Key Extractor Method - For Index Tools */
    _keyExtractor(index) {
        return index.toString();
    }
    /* /Key Extractor Method - For Index Tools/ */

    /* Render Item - Render One Row - Item - (Tool) */
    _renderItem({ item }) {
        const custom = styles(this.props);

        return (
            <View style={custom.PartView}>
                <ListItem style={custom.PartListItem} onPress={() => this._handleRead(item.tool_id, item.tool_name, item.tool_description, item.tool_count, item.tool_availability)}>
                    <Image style={custom.PartImage} source={require('@app/assets/images/tools.png')}/>
                    <Text style={custom.PartName}>{item.tool_name}</Text>
                </ListItem>
            </View>
        );
    }
    /* /Render Item - Render One Row - Item - (Tool)/ */

    /* Check Data Method - Here We Check If Data Is More Than 0 Or Else Is Less Than 0 */
    _checkData() {
        const custom = styles(this.props);

        if (this.state.data.length > 0) {
            return (
                <List style={custom.PartListSearch}>
                    <FlatList extraData={this.state} data={this.state.data} keyExtractor={this._keyExtractor.bind(this)} renderItem={this._renderItem.bind(this)}/>
                </List>
            );
        }

        else {
            return (
                <Content contentContainerStyle={custom.container} style={custom.content}>
                    <Text style={custom.noDataMessage}>
                        Няма добавени инструменти.
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

        return (
            <Container>
                <View>
                    <SearchBar
                        ref={(ref) => this.searchBar = ref}
                        data={this.state.data}
                        showOnLoad
                        placeholder="Търсете инструмент"
                        handleChangeText={text => this._handleSearch(text)}
                        backButton={<AntDesign name="arrowleft" style={custom.stackNavigatorSearchArrow} size={24} onPress={() => { this.props.navigation.navigate('Tools') }} />}
                        backgroundColor="#22364F"
                        textColor="#F5F5F5"
                        iconColor="#F5F5F5"
                    />
                </View>
                {this._checkData()}
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(searchTool);
