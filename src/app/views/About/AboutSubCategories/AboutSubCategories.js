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
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('AboutCategories') }} style={custom.headerLeft}/>
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
                        <Text style={responsive.descriptionText}>Нека започнем с това, че подкатегориите са базирани на принципа CRUD (Create, Read, Update, Delete). Това означава, че можем да добавяме, преглеждаме, редактираме и премахваме подкатегория. Също така имаме търсачка, чрез която улесняваме търсенето на определена подкатегория, а самата страница съдържа списък със създадени от вас подкатегории, които се състоят от снимка и име.</Text>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={responsive.imageFrame} source={require('@app/assets/images/SubCategories/1.png')}/>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={responsive.imageFrame} source={require('@app/assets/images/SubCategories/2.png')}/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSubCategorySearch')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Търсене на подкатегория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSubCategoryCreate')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Създаване на подкатегория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSubCategoryUpdate')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Редактиране на подкатегория
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutSubCategoryDelete')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
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

/* Exports */
export default withTheme(AboutCategories);
/* /Exports/ */
