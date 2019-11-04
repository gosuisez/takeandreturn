/* Imports */
import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';
import { AntDesign } from '@app/utils/Icons';
import { withTheme } from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
/* /Imports/ */

class AboutCategories extends Component {
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
                        <Text style={theme.descriptionText}>Това меню съдържа едни от основните категории инструменти, добавени от нас, също така ви дава възможността да създавате свои подкатегории и да добавяте инструменти към тях.</Text>
                    </View>
                    <View style={theme.descriptionSection}>
                        <Text style={theme.descriptionText}>Нека започнем с това, че категориите са базирани на принципа CRUD (Create, Read, Update, Delete). Това означава, че можем да добавяме, преглеждаме, редактираме и премахваме категория. Също така имаме търсачка, чрез която улесняваме търсенето на определена категория, а самата страница съдържа списък с предварително създадени от нас категории, които се състоят от снимка и име.</Text>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrame} source={require('@app/assets/images/Categories/1.png')}/>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrame} source={require('@app/assets/images/Categories/2.png')}/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutCategorySearch')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Търсене на категория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutCategoryCreate')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Създаване на категория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutCategoryUpdate')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Редактиране на категория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutCategoryDelete')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Премахване на категория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSubCategories')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Подкатегории
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutTools')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
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
                    </View>
                </ScrollView>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(AboutCategories);
