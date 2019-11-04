/* Imports */
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Container, Content, Card, CardItem, Body } from 'native-base';
import { AntDesign } from '@app/utils/Icons';
import { withTheme } from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
/* /Imports/ */

class AboutApp extends Component {
  /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
  static navigationOptions = ({ navigation, screenProps }) => {
    const custom = styles(screenProps);

    return {
      title: "Информация",
      headerStyle: { backgroundColor: screenProps.theme.color },
      headerTitleStyle: { color: '#F5F5F5' },
      headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('Home') }} style={custom.headerLeft}/>
    };
  };
  /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

  /* Render Method - Is Place Where You Can View All Content Of The Page */
  render() {
    const theme = styles(this.props);

    return (
      <Container>
        <Content style={theme.content}>
          <View style={theme.aboutAppBlock}>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutHome')}>
              <Card>
                <CardItem style={theme.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={theme.aboutPresentText}>
                      Какво представлява страницата?
                    </Text>
                    <Text style={theme.aboutPageText}>
                      Начало
                    </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutCategories')}>
              <Card>
                <CardItem style={theme.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={theme.aboutPresentText}>
                      Какво представлява страницата?
                  </Text>
                    <Text style={theme.aboutPageText}>
                      Инструменти
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutToolsWorkers')}>
              <Card>
                <CardItem style={theme.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={theme.aboutPresentText}>
                      Какво представлява страницата?
                  </Text>
                    <Text style={theme.aboutPageText}>
                      Взети и върнати
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutWorkers')}>
              <Card>
                <CardItem style={theme.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={theme.aboutPresentText}>
                      Какво представлява страницата?
                  </Text>
                    <Text style={theme.aboutPageText}>
                      Работници
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSchedule')}>
              <Card>
                <CardItem style={theme.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={theme.aboutPresentText}>
                      Какво представлява страницата?
                  </Text>
                    <Text style={theme.aboutPageText}>
                      График на работниците
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutAbsences')}>
              <Card>
                <CardItem style={theme.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={theme.aboutPresentText}>
                      Какво представлява страницата?
                  </Text>
                    <Text style={theme.aboutPageText}>
                      Отсъстващи работници
                  </Text>
                  </Body>
                </CardItem>
              </Card>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSettings')}>
              <Card>
                <CardItem style={theme.aboutCardItem} bordered={false}>
                  <Body>
                    <Text style={theme.aboutPresentText}>
                      Какво представлява страницата?
                  </Text>
                    <Text style={theme.aboutPageText}>
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

export default withTheme(AboutApp);
