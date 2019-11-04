/* Imports */
import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';
import { AntDesign } from '@app/utils/Icons';
import { withTheme } from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
/* /Imports/ */

class AboutTools extends Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
       const custom = styles(screenProps);

       return {
           title: "Описание на страницата",
           headerStyle: { backgroundColor: screenProps.theme.color },
           headerTitleStyle: { color: '#F5F5F5' },
           headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('AboutCategories') }} style={custom.headerLeft}/>
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
                        <Text style={theme.descriptionText}>Нека започнем с това, че инструментите са базирани на принципа CRUD (Create, Read, Update, Delete). Това означава, че можем да добавяме, преглеждаме, редактираме и премахваме инструмент. Също така имаме търсачка, чрез която улесняваме търсенето на определен инструмент, а самата страница съдържа списък със създадени от вас инструменти, които се състоят от снимка, име, описание, брой и наличност.</Text>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrame} source={require('@app/assets/images/Tools/1.png')}/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutToolSearch')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Търсене на инструмент
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutToolCreate')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Създаване на инструмент
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutToolRead')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Преглеждане на инструмент
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutToolUpdate')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Редактиране на инструмент
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutToolDelete')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Премахване на инструмент
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

export default withTheme(AboutTools);
