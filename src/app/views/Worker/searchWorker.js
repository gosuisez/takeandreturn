/* Imports */
import React from 'react';
import { View, Text, FlatList } from 'react-native';
import SearchBar from 'react-native-searchbar';
import { Container, Content, ListItem, List } from 'native-base';
import { AntDesign, MaterialCommunityIcons } from '@app/utils/Icons';
import { withTheme} from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
import db from "@app/utils/Database";
/* /Imports/ */

class searchWorker extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            refreshing: false
        };

        this.arrayholder = [];
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* Component Did Mount Method - Here Is Our Data For Workers */
    componentDidMount() {
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM table_worker', [], (tx, results) => {
                let rows = results.rows.raw();
                this.setState({ data: rows, refreshing: false });
                this.arrayholder = rows;
            });
        });
    }
    /* /Component Did Mount Method - Here Is Our Data For Workers/ */

    /* Handle Read Method - Navigate To ReadWorker */
    _handleRead(worker_id, worker_fname, worker_sname, worker_lname, worker_email, worker_mobile, worker_address) {
        this.props.navigation.navigate('readWorker', { worker_id: worker_id, worker_fname: worker_fname, worker_sname: worker_sname, worker_lname: worker_lname, worker_email: worker_email, worker_mobile: worker_mobile, worker_address: worker_address });
    }
    /* /Handle Read Method - Navigate To ReadWorker/ */

    /* Handle Search Method - Search Worker */
    _handleSearch = text => {
        const newData = this.arrayholder.filter(item => {
            const itemData = `${item.worker_fname.toUpperCase()} ${item.worker_sname.toUpperCase()} ${item.worker_lname.toUpperCase()}`;
            const textData = text.toUpperCase();
            return itemData.indexOf(textData) > -1;
        });
        this.setState({
            data: newData
        });
    };
    /* /Handle Search Method - Search Worker/ */

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
                <ListItem style={custom.PartListItem} onPress={() => this._handleRead(item.worker_id, item.worker_fname, item.worker_sname, item.worker_lname, item.worker_email, item.worker_mobile, item.worker_address, item.worker_pincode)}>
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
                <List style={custom.PartListSearch}>
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
                        placeholder="Търсете работник"
                        handleChangeText={text => this._handleSearch(text)}
                        backButton={<AntDesign name="arrowleft" style={custom.stackNavigatorSearchArrow} size={24} onPress={() => { this.props.navigation.navigate('Workers') }} />}
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

export default withTheme(searchWorker);
