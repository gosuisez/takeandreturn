/* Imports */
import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
/* /Imports/ */

class AboutToolsWorkers extends Component {
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
                        <Text style={responsive.descriptionText}>Страницата взети и върнати е базирана на принципа CRUD (Create, Read, Update, Delete). Това означава, че можем да добавяме, преглеждаме, редактираме и премахваме инструмент в работник. Също така имаме търсачка, чрез която улесняваме търсенето на определен инструмент в работник, а самата страница съдържа списък със взетите и върнатите инструменти, като се състои от снимка, име на работника, презиме на работника, фамилия на работника, име на инструмента, дата на вземане, час на вземане, дата на връщане, час на връщане, имейл на работника и парола на работника.</Text>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={responsive.imageFrame} source={require('@app/assets/images/ToolsWorkers/1.png')}/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutToolsWorkersReturn')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Връщане на инструмент от работник
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutToolsWorkersSearch')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Търсене на инструмент в работник
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutToolsWorkersCreate')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Вземане на инструмент от работник
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutToolsWorkersRead')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Преглеждане на инструмент в работник
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutToolsWorkersDelete')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Премахване на инструмент в работник
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
export default withTheme(AboutToolsWorkers);
/* /Exports/ */
