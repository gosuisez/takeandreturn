/* Imports */
import React from 'react';
import { Text, FlatList, View, Image } from 'react-native';
import SearchBar from 'react-native-searchbar';
import CheckBox from 'react-native-check-box';
import { Container, Content, ListItem, List } from 'native-base';
import { AntDesign } from '@app/utils/Icons';
import { withTheme} from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
import db from "@app/utils/Database";
/* /Imports/ */

class searchToolWorker extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.arrayholder = [];
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* Component Did Mount Method - Here Is Our Data For ToolsWorkers */
    componentDidMount() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_tools_workers JOIN table_tools ON table_tools.tool_id = table_tools_workers.tool_id JOIN table_worker ON table_worker.worker_id = table_tools_workers.worker_id', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({ data: rows });
                this.arrayholder = rows;
            })
        });
    }
    /* /Component Did Mount Method - Here Is Our Data For ToolsWorkers/ */

    /* Handle Read Method - Navigate To ReadToolWorker */
    _handleRead(tool_worker_id, worker_fname, worker_sname, worker_lname, worker_email, worker_pincode, tool_name, date_take, hour_take) {
        this.props.navigation.navigate('readToolWorker', { tool_worker_id: tool_worker_id, worker_fname: worker_fname, worker_sname: worker_sname, worker_lname: worker_lname, worker_email: worker_email, worker_pincode: worker_pincode, tool_name: tool_name, date_take: date_take, hour_take: hour_take });
    }
    /* /Handle Read Method - Navigate To ReadToolWorker/ */

    /* Handle Change Method - Navigate to ReturnToolWorker */
    handleChange = (worker_fname, worker_sname, worker_lname, tool_id, tool_name, tool_count, worker_email, worker_pincode, tool_worker_id, date_take, hour_take, date_return, hour_return) => {
        this.props.navigation.navigate('returnTool', { worker_sname: worker_sname, worker_fname: worker_fname, worker_lname: worker_lname, worker_email: worker_email, worker_pincode: worker_pincode, tool_id: tool_id, tool_name: tool_name, tool_count: tool_count, tool_worker_id: tool_worker_id, date_take: date_take, hour_take: hour_take, date_return: date_return, hour_return: hour_return });
    };
    /* /Handle Change Method - Navigate to ReturnToolWorker/ */

    /* Handle Search Method - SearchToolWorker */
    _handleSearch = text => {
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.worker_fname.toUpperCase()} ${item.worker_sname.toUpperCase()} ${item.worker_lname.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData,
        });
    };
    /* /Handle Search Method - SearchToolWorker/ */

    /* Key Extractor Method - For Index ToolsWorkers */
    _keyExtractor(index) {
        return index.toString();
    }
    /* /Key Extractor Method - For Index ToolsWorkers/ */

    /* Render Item - Render One Row - Item - (ToolWorker) */
    _renderItem({ item }) {
        const custom = styles(this.props);

        if (item.checked === 0) {
            return (
                <View style={custom.PartView}>
                    <ListItem style={custom.PartListItem}>
                        <Image style={custom.PartImage} source={require('@app/assets/images/tw.png')} />
                        <Text style={custom.PartName} onPress={() => this._handleRead(item.tool_worker_id, item.worker_fname, item.worker_sname, item.worker_lname, item.worker_email, item.worker_pincode, item.tool_id, item.tool_name, item.tool_count, item.date_take, item.hour_take, item.checked)}>{item.worker_fname} - {item.worker_sname} - {item.worker_lname} - {item.tool_name}</Text>
                        <CheckBox
                            onClick={() => this.handleChange(item.worker_fname, item.worker_sname, item.worker_lname, item.tool_id, item.tool_name, item.tool_count, item.worker_email, item.worker_pincode, item.tool_worker_id, item.date_take, item.hour_take, this.state.date_return, this.state.hour_return)}
                            isChecked={item.checked}
                            checkedCheckBoxColor={'#22364F'}
                            uncheckedCheckBoxColor={'#F5F5F5'}
                            style={custom.FormCheckBox}
                        />
                    </ListItem>
                </View>
            );
        }
        else {
            return (
                <View style={custom.PartView}>
                    <ListItem style={custom.PartListItem}>
                        <Image style={custom.PartImage} source={require('@app/assets/images/tw.png')} />
                        <Text style={custom.PartName} onPress={() => this._handleRead(item.tool_worker_id, item.worker_fname, item.worker_sname, item.worker_lname, item.worker_email, item.worker_pincode, item.tool_id, item.tool_name, item.tool_count, item.date_take, item.hour_take, item.checked)}>{item.worker_fname} - {item.worker_sname} - {item.worker_lname} - {item.tool_name}</Text>
                        <CheckBox
                            onClick={() => this.props.navigation.navigate('ToolsWorkersView')}
                            isChecked={item.checked}
                            checkedCheckBoxColor={'#22364F'}
                            uncheckedCheckBoxColor={'#F5F5F5'}
                            style={custom.FormCheckBox}
                        />
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
                <List style={custom.PartListSearch}>
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
                        placeholder="Търсете инструмент в работник"
                        handleChangeText={text => this._handleSearch(text)}
                        backButton={<AntDesign name="arrowleft" style={custom.stackNavigatorSearchArrow} size={24} onPress={() => { this.props.navigation.navigate('ToolsWorkersView') }} />}
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

export default withTheme(searchToolWorker);
