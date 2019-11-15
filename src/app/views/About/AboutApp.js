/* Imports */
import React, { Component } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
/* /Imports/ */

class AboutApp extends Component {
  /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
  static navigationOptions = ({ navigation, screenProps }) => {
    const custom = styles(screenProps);
    const responsive = responsives(screenProps);

    return {
      title: "Информация",
      headerStyle: responsive.headerStyle,
      headerTitleStyle: responsive.headerTitleStyle,
      headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('Home') }} style={custom.headerLeft}/>
    };
  };
  /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

  /* Render Method - Is Place Where You Can View All Content Of The Page */
  render() {
    const custom = styles(this.props);

    return (
      <Container>
        <Content style={custom.content}>
          <View style={custom.aboutAppBlock}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutHome')}>
              <Card>
                <CardItem style={custom.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={custom.aboutPresentText}>
                      Какво представлява страницата?
                    </Text>
                    <Text style={custom.aboutPageText}>
                      Начало
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutCategories')}>
              <Card>
                <CardItem style={custom.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={custom.aboutPresentText}>
                      Какво представлява страницата?
                  </Text>
                    <Text style={custom.aboutPageText}>
                      Инструменти
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutToolsWorkers')}>
              <Card>
                <CardItem style={custom.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={custom.aboutPresentText}>
                      Какво представлява страницата?
                  </Text>
                    <Text style={custom.aboutPageText}>
                      Взети и върнати
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutWorkers')}>
              <Card>
                <CardItem style={custom.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={custom.aboutPresentText}>
                      Какво представлява страницата?
                  </Text>
                    <Text style={custom.aboutPageText}>
                      Работници
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSchedule')}>
              <Card>
                <CardItem style={custom.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={custom.aboutPresentText}>
                      Какво представлява страницата?
                  </Text>
                    <Text style={custom.aboutPageText}>
                      График на работниците
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutAbsences')}>
              <Card>
                <CardItem style={custom.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={custom.aboutPresentText}>
                      Какво представлява страницата?
                  </Text>
                    <Text style={custom.aboutPageText}>
                      Отсъстващи работници
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSettings')}>
              <Card>
                <CardItem style={custom.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={custom.aboutPresentText}>
                      Какво представлява страницата?
                  </Text>
                    <Text style={custom.aboutPageText}>
                      Настройки
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
          </View>
        </Content>
      </Container>
    );
  }
  /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(AboutApp);
/* /Exports/ */
