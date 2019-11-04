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
                        <Text style={theme.descriptionText}>Нека започнем с това, че подкатегориите са базирани на принципа CRUD (Create, Read, Update, Delete). Това означава, че можем да добавяме, преглеждаме, редактираме и премахваме подкатегория. Също така имаме търсачка, чрез която улесняваме търсенето на определена подкатегория, а самата страница съдържа списък със създадени от вас подкатегории, които се състоят от снимка и име.</Text>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrame} source={require('@app/assets/images/SubCategories/1.png')}/>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrame} source={require('@app/assets/images/SubCategories/2.png')}/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSubCategorySearch')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Търсене на подкатегория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSubCategoryCreate')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Създаване на подкатегория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSubCategoryUpdate')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Редактиране на подкатегория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSubCategoryDelete')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Премахване на подкатегория
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
