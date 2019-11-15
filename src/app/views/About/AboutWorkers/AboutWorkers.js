/* Imports */
import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
/* /Imports/ */

class AboutWorkers extends Component {
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
                        <Text style={responsive.descriptionText}>Нека започнем с това, че работниците са базирани на принципа CRUD (Create, Read, Update, Delete). Това означава, че можем да добавяме, преглеждаме, редактираме и премахваме работник. Също така имаме търсачка, чрез която улесняваме търсенето на определен работник, а самата страница съдържа списък със създадени от вас работници, които се състоят от снимка, име, презиме, фамилия, имейл, телефон, адрес и парола.</Text>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={responsive.imageFrame} source={require('@app/assets/images/Workers/1.png')}/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutWorkerSearch')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Търсене на работник
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutWorkerCreate')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Създаване на работник
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutWorkerRead')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Преглеждане на работник
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutWorkerUpdate')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Редактиране на работник
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutWorkerDelete')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
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

/* Exports */
export default withTheme(AboutWorkers);
/* /Exports/ */
