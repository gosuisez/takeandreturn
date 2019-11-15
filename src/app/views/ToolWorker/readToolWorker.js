/* Imports */
import React from 'react';
import { ScrollView, View, Image, Text } from 'react-native';
import { Container, Footer, FooterTab, Button } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@app/utils/Icons';
/* /Imports/ */

class readToolWorker extends React.Component {
    /* Handle Delete Method - Navigate To DeleteToolWorker */
    _handleDelete(tool_worker_id, tool_id, tool_name, tool_count, checked, worker_tiw, worker_id) {
        this.props.navigation.navigate('deleteToolWorker', { tool_worker_id: tool_worker_id, tool_id: tool_id, tool_name: tool_name, tool_count: tool_count, checked: checked, worker_tiw: worker_tiw, worker_id: worker_id });
    }
    /* /Handle Delete Method - Navigate To DeleteToolWorker/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Преглеждане на инструмент",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: responsive.headerTitleStyle,
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('ToolsWorkersView') }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { navigation } = this.props;

        const tool_worker_id = navigation.getParam('tool_worker_id');
        const worker_fname = navigation.getParam('worker_fname');
        const worker_sname = navigation.getParam('worker_sname');
        const worker_lname = navigation.getParam('worker_lname');
        const worker_email = navigation.getParam('worker_email');
        const worker_pincode = navigation.getParam('worker_pincode');
        const tool_id = navigation.getParam('tool_id');
        const tool_count = navigation.getParam('tool_count');
        const tool_name = navigation.getParam('tool_name');
        const date_take = navigation.getParam('date_take');
        const hour_take = navigation.getParam('hour_take');
        const checked = navigation.getParam('checked');
        const worker_tiw = navigation.getParam('worker_tiw');
        const worker_id = navigation.getParam('worker_id');
        const custom = styles(this.props);

        return (
            <Container style={custom.PartForm}>
                <ScrollView>
                    <View>
                        <Image source={require('@app/assets/images/tr.png')} style={custom.PartDetailsImage}/>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <FontAwesome name="hashtag" size={16}/> <Text style={custom.PartDetailsValues}>Идентификационен номер:</Text> <Text style={custom.readViewValues}>{tool_worker_id}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <FontAwesome name="user" size={16}/> <Text style={custom.PartDetailsValues}>Име:</Text> <Text style={custom.readViewValues}>{worker_fname}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <FontAwesome name="user" size={16}/> <Text style={custom.PartDetailsValues}>Презиме:</Text> <Text style={custom.readViewValues}>{worker_sname}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <FontAwesome name="user" size={16}/> <Text style={custom.PartDetailsValues}>Фамилия:</Text> <Text style={custom.readViewValues}>{worker_lname}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <MaterialCommunityIcons name="email" size={16}/> <Text style={custom.PartDetailsValues}>Имейл:</Text> <Text style={custom.readViewValues}>{worker_email}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <MaterialCommunityIcons name="key-variant" size={16}/> <Text style={custom.PartDetailsValues}>Парола:</Text> <Text style={custom.readViewValues}>{worker_pincode}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <MaterialCommunityIcons name="tooltip" size={16}/> <Text style={custom.PartDetailsValues}>Име на инструмента:</Text> <Text style={custom.readViewValues}>{tool_name}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <MaterialIcons name="date-range" size={16}/> <Text style={custom.PartDetailsValues}>Дата на вземане:</Text> <Text style={custom.readViewValues}>{date_take}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <MaterialCommunityIcons name="clock-outline" size={16}/> <Text style={custom.PartDetailsValues}>Час на вземане:</Text> <Text style={custom.readViewValues}>{hour_take}</Text>
                        </Text>
                    </View>
                </ScrollView>
                <Footer>
                    <FooterTab style={custom.PartDetailsActions}>
                        <Button transparent onPress={() => this._handleDelete(tool_worker_id, tool_id, tool_name, tool_count, checked, worker_tiw, worker_id)}>
                            <FontAwesome name="remove" size={23} style={custom.PartDetailsDeleteIcon}/>
                            <Text style={custom.PartDetailsActionsTitle}>
                                Премахване
                            </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(readToolWorker);
/* Exports */
