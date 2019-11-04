/* Imports */
import React from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import { Container, Footer, FooterTab, Button } from 'native-base';
import { AntDesign, FontAwesome, MaterialCommunityIcons, MaterialIcons } from '@app/utils/Icons';
import { withTheme} from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
/* /Imports/ */

class readTool extends React.Component {
    /* Handle Update Method - Navigate To UpdateTool */
    _handleUpdate(tool_id, tool_name, tool_description, tool_count, tool_availability) {
        this.props.navigation.navigate('updateTool', { tool_id: tool_id, tool_name: tool_name, tool_description: tool_description, tool_count: tool_count, tool_availability: tool_availability });
    }
    /* /Handle Update Method - Navigate To UpdateTool/ */

    /* Handle Delete Method - Navigate To DeleteTool */
    _handleDelete(tool_id) {
        this.props.navigation.navigate('deleteTool', { tool_id: tool_id });
    }
    /* /Handle Delete Method - Navigate To DeleteTool/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);

        return {
            title: "Преглеждане на инструмент",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('Tools') }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { navigation } = this.props;

        const tool_id = navigation.getParam('tool_id');
        const tool_name = navigation.getParam('tool_name');
        const tool_description = navigation.getParam('tool_description');
        const tool_count = navigation.getParam('tool_count');
        const tool_availability = navigation.getParam('tool_availability');
        const custom = styles(this.props);

        return(
            <Container style={custom.PartForm}>
                <ScrollView>
                    <View>
                        <Image source={require('@app/assets/images/tool.png')} style={custom.PartDetailsImage}/>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <FontAwesome name="hashtag" size={16}/> <Text style={custom.PartDetailsValues}>Идентификационен номер:</Text> <Text style={custom.readViewValues}>{tool_id}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <MaterialCommunityIcons name="tooltip" size={16}/> <Text style={custom.PartDetailsValues}>Име:</Text> <Text style={custom.readViewValues}>{tool_name}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <MaterialIcons name="description" size={16}/> <Text style={custom.PartDetailsValues}>Описание:</Text> <Text style={custom.readViewValues}>{tool_description}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <MaterialCommunityIcons name="numeric" size={16}/> <Text style={custom.PartDetailsValues}>Брой:</Text> <Text style={custom.readViewValues}>{tool_count}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <MaterialIcons name="date-range" size={16}/> <Text style={custom.PartDetailsValues}>Наличност:</Text> <Text style={custom.readViewValues}>{tool_availability}</Text>
                        </Text>
                    </View>
                </ScrollView>
                <Footer>
                    <FooterTab style={custom.PartDetailsActions}>
                        <Button transparent onPress={() => this._handleUpdate(tool_id, tool_name, tool_description, tool_count, tool_availability)}>
                            <AntDesign name="edit" size={23} style={custom.PartDetailsEditIcon}/>
                            <Text style={custom.PartDetailsActionsTitle}>
                                Редактиране
                            </Text>
                        </Button>
                        <Button transparent onPress={() => this._handleDelete(tool_id)} >
                            <FontAwesome name="remove" size={23} style={custom.PartDetailsDeleteIcon}/>
                            <Text style={custom.PartDetailsActionsTitle}>
                                Премахване
                            </Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(readTool);
