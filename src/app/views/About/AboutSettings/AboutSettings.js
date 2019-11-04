/* Imports */
import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';
import { AntDesign } from '@app/utils/Icons';
import { withTheme } from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
/* /Imports/ */

class AboutSettings extends Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);

        return {
            title: "Описание на страницата",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('AboutApp') }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const theme = styles(this.props);

        return (
            <Content contentContainerStyle={theme.container} style={theme.content}>
                <ScrollView>
                    <View style={theme.descriptionSection}>
                        <Text style={theme.descriptionText}>Страницата настройки съдържа нашата въвеждаща страница, ако случайно сте я пропуснали, но и кратка информация относно нас.</Text>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrame} source={require('@app/assets/images/Settings/1.png')}/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutAppIntro')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Въвеждаща страница
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutAppUs')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            За нас
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutAppContacts')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Контакти
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutAppVersion')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Версия на приложението
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(AboutSettings);
