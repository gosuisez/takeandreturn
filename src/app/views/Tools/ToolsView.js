/* Imports */
import React from 'react';
import { Text, FlatList, View, TouchableOpacity, StatusBar, Image, ActivityIndicator } from 'react-native';
import { ListItem, List, Content, Container, Header, Left, Button, Body, Title, Right, Fab, Icon } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
import db from "@app/utils/Database";
/* /Imports/ */

class ToolsView extends React.PureComponent {
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

    /* Component Data Method - Here Is Our Data For Tools */
    componentData() {
        const { navigation } = this.props;
        const subcategory_id = navigation.getParam('subcategory_id');
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_tools WHERE subcategory_id=' + `${subcategory_id}`, [], (tx, results) => {
                this._isMounted = true;

                if (this._isMounted) {
                    let rows = results.rows.raw();
                    this.setState({ data: rows, isLoading: false });
                    this.arrayholder = rows;
                }
            });
        });
    }
    /* /Component Data Method - Here Is Our Data For Tools/ */

    /* Component Did Mount Method - Here We Mount Component - Data */
    componentDidMount() {
        this.componentData();
    }
    /* /Component Did Mount Method - Here We Mount Component - Data  */

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

    /* Handle Search Method - Navigate to SearchTool */
    _handleSearch() {
        this.props.navigation.navigate('searchTool');
    }
    /* /Handle Search Method - Navigate to SearchTool/ */

    /* Handle Create Method - Navigate to CreateTool */
    _handleCreate(subcategory_id) {
        this.props.navigation.navigate('createTool', { subcategory_id: subcategory_id });
    }
    /* /Handle Create Method - Navigate to CreateTool/ */

    /* Handle Read Method - Navigate to ReadTool */
    _handleRead(tool_id, tool_name, tool_description, tool_count, tool_availability) {
        this.props.navigation.navigate('readTool', { tool_id: tool_id, tool_name: tool_name, tool_description: tool_description, tool_count: tool_count, tool_availability: tool_availability });
    }
    /* /Handle Read Method - Navigate to ReadTool/ */

    /* Handle Update Method - Navigate to UpdateTool */
    _handleUpdate(tool_id, tool_name, tool_description, tool_count, tool_availability) {
        this.props.navigation.navigate('updateTool', { tool_id: tool_id, tool_name: tool_name, tool_description: tool_description, tool_count: tool_count, tool_availability: tool_availability });
    }
    /* /Handle Update Method - Navigate to UpdateTool/ */

    /* Handle Delete Method - Navigate to DeleteTool */
    _handleDelete(tool_id) {
        this.props.navigation.navigate('deleteTool', { tool_id: tool_id });
    }
    /* /Handle Delete Method - Navigate to DeleteTool/ */

    /* Key Extractor Method - For Index Tools */
    _keyExtractor({ item, index }) {
        return 'key' + index;
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
                <List style={custom.PartList}>
                    <FlatList extraData={this.state} data={this.state.data} keyExtractor={(item, index) => index.toString()} renderItem={this._renderItem.bind(this)} />
                </List>
            );
        }

        else {
            return (
                <Content contentContainerStyle={custom.container} style={custom.content}>
                    <Text style={custom.noDataMessage}>Няма добавени инструменти.</Text>
                </Content>
            );
        }
    }
    /* /Check Data Method - Here We Check If Data Is More Than 0 Or Else Is Less Than 0/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = () => {
        return {
            title: "Инструменти",
            header: null
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { navigation } = this.props;
        const subcategory_id = navigation.getParam('subcategory_id');

        const responsive = responsives(this.props);
        const custom = styles(this.props);

        if (this.state.isLoading === true) {
            return (
                <Container>
                    <Header style={custom.header}>
                        <StatusBar backgroundColor="#425768" barStyle="default" />
                        <Left>
                            <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this.props.navigation.navigate('SubCategories')}>
                                <Button transparent onPress={() => this.props.navigation.navigate('SubCategories')}>
                                    <AntDesign name="arrowleft" style={custom.headerBackIcon} onPress={() => this.props.navigation.navigate('SubCategories')} />
                                </Button>
                            </TouchableOpacity>
                        </Left>
                        <Body style={custom.headerBody}>
                            <Title style={responsive.headerTitle}>Инструменти</Title>
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
                            <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this.props.navigation.navigate('SubCategories')}>
                                <Button transparent onPress={() => this.props.navigation.navigate('SubCategories')}>
                                    <AntDesign name="arrowleft" style={custom.headerBackIcon} onPress={() => this.props.navigation.navigate('SubCategories')}/>
                                </Button>
                            </TouchableOpacity>
                        </Left>
                        <Body style={custom.headerBody}>
                            <Title style={responsive.headerTitle}>Инструменти</Title>
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
                        <Fab style={custom.PartCreate} active={'true'} direction="up" position="bottomRight" onPress={() => this._handleCreate(subcategory_id)}>
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
export default withTheme(ToolsView);
/* /Exports/ */
