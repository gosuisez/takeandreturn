/* Imports */
import React, { Component } from 'react';
import { Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';
import { AntDesign } from '@app/utils/Icons';
import { withTheme } from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
/* /Imports/ */

class AboutWorkers extends Component {
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
                        <Text style={theme.descriptionText}>Нека започнем с това, че работниците са базирани на принципа CRUD (Create, Read, Update, Delete). Това означава, че можем да добавяме, преглеждаме, редактираме и премахваме работник. Също така имаме търсачка, чрез която улесняваме търсенето на определен работник, а самата страница съдържа списък със създадени от вас работници, които се състоят от снимка, име, презиме, фамилия, имейл, телефон, адрес и парола.</Text>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrame} source={require('@app/assets/images/Workers/1.png')}/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutWorkerSearch')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Търсене на работник
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutWorkerCreate')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Създаване на работник
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutWorkerRead')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Преглеждане на работник
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutWorkerUpdate')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Редактиране на работник
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutWorkerDelete')}>
                            <Card>
                                <CardItem style={theme.aboutCardItem}>
                                    <Body>
                                        <Text style={theme.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={theme.aboutPageText}>
                                            Премахване на работник
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

export default withTheme(AboutWorkers);
