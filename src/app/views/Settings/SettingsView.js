/* Imports */
import React from 'react';
import { TouchableOpacity, StatusBar, View, Text, Linking } from 'react-native';
import { Container, Header, Left, Body, Title, Button, List, ListItem, Content } from 'native-base';
import { AntDesign, MaterialCommunityIcons, Entypo, MaterialIcons, FontAwesome } from '@app/utils/Icons';
import { withTheme } from '@app/theme/themeProvider';
import {responsives} from '@app/styles/config';
import {styles} from '@app/styles/config';
/* /Imports/ */

class SettingsView extends React.Component {
  /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
  static navigationOptions = (screenProps) => {
    const custom = styles(screenProps);

    return {
      title: "Настройки",
      drawerIcon: () => (<MaterialCommunityIcons name="settings" style={custom.drawerMenuIcon}/>)
    };
  };
  /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

  /* Render Method - Is Place Where You Can View All Content Of The Page */
  render() {
    const responsive = responsives(this.props);
    const theme = styles(this.props);

    return (
      <Container>
        <Header style={styles(this.props).header}>
          <StatusBar backgroundColor="#425768" barStyle="default"/>
          <Left>
            <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this.props.navigation.navigate('Home')}>
              <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
                <AntDesign name="arrowleft" style={theme.headerBackIcon} onPress={() => this.props.navigation.navigate('Home')}/>
              </Button>
            </TouchableOpacity>
          </Left>
          <Body style={theme.headerSettingsBody}>
            <Title style={responsive.headerTitle}>
                Настройки
            </Title>
          </Body>
        </Header>
        <Content style={theme.content}>
          <List style={theme.backgroundColorTheme}>
            <ListItem style={theme.settingsListItem} onPress={() => this.props.navigation.navigate('AppIntro')}>
              <MaterialIcons name="import-contacts" size={25} color={'#22364F'}/>
              <Text style={theme.settingsText}>
                  Покажете въвеждащата страница
              </Text>
              <Entypo name="chevron-right" size={25} style={theme.settingsDetailsArrow}/>
            </ListItem>
            <ListItem style={theme.settingsListItem} onPress={() => this.props.navigation.navigate('ChangeTheme')}>
              <MaterialIcons name="color-lens" size={25} color={'#22364F'}/>
              <Text style={theme.settingsText}>
                  Промяна на темата
              </Text>
              <Entypo name="chevron-right" size={25} style={theme.settingsDetailsArrow}/>
            </ListItem>
            <View>
              <Text style={theme.settingsMenuHeader}>
                  Данни
              </Text>
            </View>
            <ListItem style={theme.settingsListItem} onPress={() => this.props.navigation.navigate('ImportData')}>
              <MaterialCommunityIcons name="file-import" size={25} color={'#22364F'}/>
              <Text style={theme.settingsText}>
                  Импортиране на данни
              </Text>
              <Entypo name="chevron-right" size={25} style={theme.settingsDetailsArrow}/>
            </ListItem>
            <ListItem style={theme.settingsListItem} onPress={() => this.props.navigation.navigate('ExportData')}>
              <MaterialCommunityIcons name="file-export" size={25} color={'#22364F'}/>
              <Text style={theme.settingsText}>
                  Експортиране на данни
              </Text>
              <Entypo name="chevron-right" size={25} style={theme.settingsDetailsArrow}/>
            </ListItem>
            <View>
              <Text style={theme.settingsMenuHeader}>
                Относно
              </Text>
            </View>
            <ListItem style={theme.settingsListItem} onPress={() => this.props.navigation.navigate('AboutUs')}>
              <FontAwesome name="users" size={25} color={'#22364F'}/>
              <Text style={theme.settingsText}>
                  За нас
              </Text>
              <Entypo name="chevron-right" size={25} style={theme.settingsDetailsArrow}/>
            </ListItem>
            <ListItem style={theme.settingsListItem} onPress={() => Linking.openURL('mailto:takeandreturn@gmail.com')}>
              <MaterialCommunityIcons name="contact-mail" size={25} color={'#22364F'}/>
              <Text style={theme.settingsText}>
                  Контакти
              </Text>
              <Entypo name="chevron-right" size={25} style={theme.settingsDetailsArrow}/>
            </ListItem>
            <ListItem style={theme.settingsListItem} onPress={() => this.props.navigation.navigate('AppVersion')}>
              <MaterialIcons name="info" size={25} color={'#22364F'}/>
              <Text style={theme.settingsText}>
                  Версия на приложението
              </Text>
              <Entypo name="chevron-right" size={25} style={theme.settingsDetailsArrow}/>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
  /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(SettingsView);
