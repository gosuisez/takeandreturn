/* Imports */
import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Container, Footer, FooterTab, Button } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@app/utils/Icons';
/* /Imports/ */

class readAbsence extends Component {
    /* Handle Update Method - Navigate To UpdateAbsence */
    _handleUpdate(id, worker_fname, worker_sname, worker_lname, worker_reason, date_absence) {
        this.props.navigation.navigate('updateAbsence', { id: id, worker_fname: worker_fname, worker_sname: worker_sname, worker_lname: worker_lname, worker_reason: worker_reason, date_absence: date_absence });
    }
    /* /Handle Update Method - Navigate To UpdateAbsence/ */

    /* Handle Delete Method - Navigate To DeleteAbsence */
    _handleDelete(id) {
        this.props.navigation.navigate('deleteAbsence', { id: id });
    }
    /* Handle Delete Method - Navigate To DeleteAbsence */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Преглеждане на отсъствие",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: responsive.headerTitleStyle,
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('Absences') }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { navigation } = this.props;
        const id = navigation.getParam('id');
        const worker_fname = navigation.getParam('worker_fname');
        const worker_sname = navigation.getParam('worker_sname');
        const worker_lname = navigation.getParam('worker_lname');
        const worker_reason = navigation.getParam('worker_reason');
        const date_absence = navigation.getParam('date_absence');

        const custom = styles(this.props);

        return (
            <Container style={custom.PartForm}>
                <ScrollView>
                    <View>
                        <MaterialCommunityIcons name="minus-circle" size={150} color="#F5F5F5" style={custom.PartDetailsImage} />
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <FontAwesome name="hashtag" size={16}/> <Text style={custom.PartDetailsValues}>Идентификационен номер:</Text> <Text style={custom.readViewValues}>{id}</Text>
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
                            <MaterialIcons name="description" size={16}/> <Text style={custom.PartDetailsValues}>Причина за отсъствие:</Text> <Text style={custom.readViewValues}>{worker_reason}</Text>
                        </Text>
                    </View>
                    <View style={custom.PartDetailsView}>
                        <Text style={custom.PartDetailsText}>
                            <MaterialIcons name="date-range" size={16}/> <Text style={custom.PartDetailsValues}>Дата на отсъствие:</Text> <Text style={custom.readViewValues}>{date_absence}</Text>
                        </Text>
                    </View>
                </ScrollView>
                <Footer>
                    <FooterTab style={custom.PartDetailsActions}>
                        <Button transparent onPress={() => this._handleUpdate(id, worker_fname, worker_sname, worker_lname, worker_reason, date_absence)}>
                            <AntDesign name="edit" size={23} style={custom.PartDetailsEditIcon}/>
                            <Text style={custom.PartDetailsActionsTitle}>
                                Редактиране
                            </Text>
                        </Button>
                        <Button transparent onPress={() => this._handleDelete(id)}>
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
export default withTheme(readAbsence);
/* /Exports/ */
