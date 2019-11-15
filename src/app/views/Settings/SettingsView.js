/* Imports */
import React from 'react';
import { TouchableOpacity, StatusBar, View, Text, Linking } from 'react-native';
import { Container, Header, Left, Button, Body, Title, Content, List, ListItem } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign, MaterialCommunityIcons, Entypo, MaterialIcons, FontAwesome } from '@app/utils/Icons';
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
    const custom = styles(this.props);
    const responsive = responsives(this.props);

    return (
      <Container>
        <Header style={styles(this.props).header}>
          <StatusBar backgroundColor="#425768" barStyle="default"/>
          <Left>
            <TouchableOpacity hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }} onPress={() => this.props.navigation.navigate('Home')}>
              <Button transparent onPress={() => this.props.navigation.navigate('Home')}>
                <AntDesign name="arrowleft" style={custom.headerBackIcon} onPress={() => this.props.navigation.navigate('Home')}/>
              </Button>
            </TouchableOpacity>
          </Left>
          <Body style={custom.headerSettingsBody}>
            <Title style={responsive.headerTitle}>
                Настройки
            </Title>
          </Body>
        </Header>
        <Content style={custom.content}>
          <List style={custom.backgroundColorTheme}>
            <ListItem style={custom.settingsListItem} onPress={() => this.props.navigation.navigate('AppIntro')}>
              <MaterialIcons name="import-contacts" style={responsive.vectorIcon} color={'#22364F'}/>
              <Text style={responsive.settingsText}>
                  Покажете въвеждащата страница
              </Text>
              <Entypo name="chevron-right" size={25} style={custom.settingsDetailsArrow}/>
            </ListItem>
            <ListItem style={custom.settingsListItem} onPress={() => this.props.navigation.navigate('ChangeTheme')}>
              <MaterialIcons name="color-lens" style={responsive.vectorIcon} color={'#22364F'}/>
              <Text style={responsive.settingsText}>
                  Промяна на темата
              </Text>
              <Entypo name="chevron-right" size={25} style={custom.settingsDetailsArrow}/>
            </ListItem>
            <View>
              <Text style={custom.settingsMenuHeader}>
                  Данни
              </Text>
            </View>
            <ListItem style={custom.settingsListItem} onPress={() => this.props.navigation.navigate('ImportData')}>
              <MaterialCommunityIcons name="file-import" style={responsive.vectorIcon} color={'#22364F'}/>
              <Text style={responsive.settingsText}>
                  Импортиране на данни
              </Text>
              <Entypo name="chevron-right" size={25} style={custom.settingsDetailsArrow}/>
            </ListItem>
            <ListItem style={custom.settingsListItem} onPress={() => this.props.navigation.navigate('ExportData')}>
              <MaterialCommunityIcons name="file-export" style={responsive.vectorIcon} color={'#22364F'}/>
              <Text style={responsive.settingsText}>
                  Експортиране на данни
              </Text>
              <Entypo name="chevron-right" size={25} style={custom.settingsDetailsArrow}/>
            </ListItem>
            <View>
              <Text style={custom.settingsMenuHeader}>
                Относно
              </Text>
            </View>
            <ListItem style={custom.settingsListItem} onPress={() => this.props.navigation.navigate('AboutUs')}>
              <FontAwesome name="users" style={responsive.vectorIcon} color={'#22364F'}/>
              <Text style={responsive.settingsText}>
                  За нас
              </Text>
              <Entypo name="chevron-right" size={25} style={custom.settingsDetailsArrow}/>
            </ListItem>
            <ListItem style={custom.settingsListItem} onPress={() => Linking.openURL('mailto:takeandreturn@gmail.com')}>
              <MaterialCommunityIcons name="contact-mail" style={responsive.vectorIcon} color={'#22364F'}/>
              <Text style={responsive.settingsText}>
                  Контакти
              </Text>
              <Entypo name="chevron-right" size={25} style={custom.settingsDetailsArrow}/>
            </ListItem>
            <ListItem style={custom.settingsListItem} onPress={() => this.props.navigation.navigate('AppVersion')}>
              <MaterialIcons name="info" style={responsive.vectorIcon} color={'#22364F'}/>
              <Text style={responsive.settingsText}>
                  Версия на приложението
              </Text>
              <Entypo name="chevron-right" ssize={25} style={custom.settingsDetailsArrow}/>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
  /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(SettingsView);
/* /Exports/ */
