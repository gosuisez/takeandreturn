/* Imports */
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Container, Footer, FooterTab, Button } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign, FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@app/utils/Icons';
/* /Imports/ */

class readSchedule extends Component {
  /* Handle Update Method - Navigate To UpdateSchedule */
  _handleUpdate(id, worker_fname, worker_sname, worker_lname, date_from, hour_from, date_to, hour_to) {
    this.props.navigation.navigate('updateSchedule', { id: id, worker_fname: worker_fname, worker_sname: worker_sname, worker_lname: worker_lname, date_from: date_from, hour_from: hour_from, date_to: date_to, hour_to: hour_to });
  }
  /* Handle Update Method - Navigate To UpdateSchedule */

  /* Handle Delete Method - Navigate To DeleteSchedule */
  _handleDelete(id) {
    this.props.navigation.navigate('deleteSchedule', { id: id });
  }
  /* Handle Delete Method - Navigate To DeleteSchedule */

  /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Преглеждане на графика",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: responsive.headerTitleStyle,
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('Schedule') }} style={custom.headerLeft}/>
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
    const date_from = navigation.getParam('date_from');
    const hour_from = navigation.getParam('hour_from');
    const date_to = navigation.getParam('date_to');
    const hour_to = navigation.getParam('hour_to');

    const custom = styles(this.props);

    return (
      <Container style={custom.PartForm}>
        <ScrollView>
            <View>
                <MaterialCommunityIcons name="calendar-clock" size={150} color="#F5F5F5" style={custom.PartDetailsImage} />
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
                <MaterialIcons name="date-range" size={16}/> <Text style={custom.PartDetailsValues}>Дата на започване:</Text> <Text style={custom.readViewValues}>{date_from}</Text>
              </Text>
            </View>
            <View style={custom.PartDetailsView}>
              <Text style={custom.PartDetailsText}>
                <MaterialCommunityIcons name="clock-outline" size={16}/> <Text style={custom.PartDetailsValues}>Час на започване:</Text> <Text style={custom.readViewValues}>{hour_from}</Text>
              </Text>
            </View>
            <View style={custom.PartDetailsView}>
              <Text style={custom.PartDetailsText}>
                <MaterialIcons name="date-range" size={16}/> <Text style={custom.PartDetailsValues}>Дата на приключване:</Text> <Text style={custom.readViewValues}>{date_to}</Text>
              </Text>
            </View>
            <View style={custom.PartDetailsView}>
              <Text style={custom.PartDetailsText}>
                <MaterialCommunityIcons name="clock-outline" size={16}/> <Text style={custom.PartDetailsValues}>Час на приключване:</Text> <Text style={custom.readViewValues}>{hour_to}</Text>
              </Text>
            </View>
        </ScrollView>
        <Footer>
          <FooterTab style={custom.PartDetailsActions}>
            <Button transparent onPress={() => this._handleUpdate(id, worker_fname, worker_sname, worker_lname, date_from, hour_from, date_to, hour_to)}>
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
  /* Render Method - Is Place Where You Can View All Content Of The Page */
}

/* Exports */
export default withTheme(readSchedule);
/* /Exports/ */
