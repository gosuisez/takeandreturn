/* Imports */
import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Container, Footer, FooterTab, Button } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign, FontAwesome, MaterialCommunityIcons, Entypo, Foundation } from '@app/utils/Icons';
/* /Imports/ */

class readWorker extends React.Component {
  /* Handle Update Method - Navigate To UpdateWorker */
  _handleUpdate(worker_id, worker_fname, worker_sname, worker_lname, worker_email, worker_mobile, worker_address, worker_pincode) {
    this.props.navigation.navigate('updateWorker', { worker_id: worker_id, worker_fname: worker_fname, worker_sname: worker_sname, worker_lname: worker_lname, worker_email: worker_email, worker_mobile: worker_mobile, worker_address: worker_address, worker_pincode: worker_pincode });
  }
  /* /Handle Update Method - Navigate To UpdateWorker/ */

  /* Handle Delete Method - Navigate To DeleteWorker */
  _handleDelete(worker_id) {
    this.props.navigation.navigate('deleteWorker', { worker_id: worker_id });
  }
  /* Handle Delete Method - Navigate To DeleteWorker */

  /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Прегледжане на работник",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: responsive.headerTitleStyle,
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('Workers') }} style={custom.headerLeft}/>
        };
    };
   /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

  /* Render Method - Is Place Where You Can View All Content Of The Page */
  render() {
    const { navigation } = this.props;
    const worker_id = navigation.getParam('worker_id');
    const worker_fname = navigation.getParam('worker_fname');
    const worker_sname = navigation.getParam('worker_sname');
    const worker_lname = navigation.getParam('worker_lname');
    const worker_email = navigation.getParam('worker_email');
    const worker_mobile = navigation.getParam('worker_mobile');
    const worker_address = navigation.getParam('worker_address');
    const worker_pincode = navigation.getParam('worker_pincode');
    const worker_tiw = navigation.getParam('worker_tiw');
    const worker_riw = navigation.getParam('worker_riw');
    const custom = styles(this.props);

    return (
      <Container style={custom.PartForm}>
        <ScrollView>
            <View>
              <Image source={require('@app/assets/images/worker.png')} style={custom.PartDetailsImage}/>
            </View>
            <View style={custom.PartDetailsView}>
              <Text style={custom.PartDetailsText}>
                <FontAwesome name="hashtag" size={16}/> <Text style={custom.PartDetailsValues}>Идентификационен номер:</Text> <Text style={custom.readViewValues}>{worker_id}</Text>
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
                <Foundation name="telephone" size={16}/> <Text style={custom.PartDetailsValues}>Телефонен номер:</Text> <Text style={custom.readViewValues}>{worker_mobile}</Text>
              </Text>
            </View>
            <View style={custom.PartDetailsView}>
              <Text style={custom.PartDetailsText}>
                <Entypo name="location-pin" size={16}/> <Text style={custom.PartDetailsValues}>Адрес:</Text> <Text style={custom.readViewValues}>{worker_address}</Text>
              </Text>
            </View>
            <View style={custom.PartDetailsView}>
              <Text style={custom.PartDetailsText}>
                <MaterialCommunityIcons name="key-variant" size={16}/> <Text style={custom.PartDetailsValues}>Парола:</Text> <Text style={custom.readViewValues}>{worker_pincode}</Text>
              </Text>
            </View>
            <View style={custom.PartDetailsExtraView}>
              <View style={custom.PartDetailsExtraValues}>
                <Text style={custom.PartDetailsText}>
                  <MaterialCommunityIcons name="key-variant" size={16}/> <Text style={custom.PartDetailsValues}>Взети:</Text> <Text style={custom.readViewValues}>{worker_tiw}</Text>
                </Text>
              </View>
              <View style={custom.PartDetailsExtraValues}>
                <Text style={custom.PartDetailsText}>
                  <MaterialCommunityIcons name="key-variant" size={16}/> <Text style={custom.PartDetailsValues}>Върнати:</Text> <Text style={custom.readViewValues}>{worker_riw}</Text>
                </Text>
              </View>
            </View>
        </ScrollView>
        <Footer>
          <FooterTab style={custom.PartDetailsActions}>
            <Button transparent onPress={() => this._handleUpdate(worker_id, worker_fname, worker_sname, worker_lname, worker_email, worker_mobile, worker_address, worker_pincode)}>
              <AntDesign name="edit" size={23} style={custom.PartDetailsEditIcon}/>
              <Text style={custom.PartDetailsActionsTitle}>
                  Редактиране
              </Text>
            </Button>
            <Button transparent onPress={() => this._handleDelete(worker_id)}>
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

/* Exports */
export default withTheme(readWorker);
/* /Exports/ */
