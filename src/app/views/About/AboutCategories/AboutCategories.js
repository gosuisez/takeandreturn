/* Imports */
import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
/* /Imports/ */

class AboutCategories extends Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Описание на страницата",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: responsive.headerTitleStyle,
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('AboutApp') }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const custom = styles(this.props);
        const responsive = responsives(this.props);

        return (
            <Content contentContainerStyle={custom.container} style={custom.content}>
                <ScrollView>
                    <View style={custom.descriptionSection}>
                        <Text style={responsive.descriptionText}>Това меню съдържа едни от основните категории инструменти, добавени от нас, също така ви дава възможността да създавате свои подкатегории и да добавяте инструменти към тях.</Text>
                    </View>
                    <View style={custom.descriptionSection}>
                        <Text style={responsive.descriptionText}>Нека започнем с това, че категориите са базирани на принципа CRUD (Create, Read, Update, Delete). Това означава, че можем да добавяме, преглеждаме, редактираме и премахваме категория. Също така имаме търсачка, чрез която улесняваме търсенето на определена категория, а самата страница съдържа списък с предварително създадени от нас категории, които се състоят от снимка и име.</Text>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={responsive.imageFrame} source={require('@app/assets/images/Categories/1.png')}/>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={responsive.imageFrame} source={require('@app/assets/images/Categories/2.png')}/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutCategorySearch')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Търсене на категория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutCategoryCreate')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Създаване на категория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutCategoryUpdate')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Редактиране на категория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutCategoryDelete')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Премахване на категория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSubCategories')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Подкатегории
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutTools')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
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
                    </View>
                </ScrollView>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(AboutCategories);
/* /Exports/ */
