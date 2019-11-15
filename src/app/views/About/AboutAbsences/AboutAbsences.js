/* Imports */
import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { Content, Card, CardItem, Body } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
/* /Imports/ */

class AboutAbsences extends Component {
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
                        <Text style={responsive.descriptionText}>Страницата отсъстващи работници е базирана на принципа CRUD (Create, Read, Update, Delete). Това означава, че можем да добавяме, преглеждаме, редактираме и премахваме отсъствие на работник. A самата страница съдържа календар, който се състои от снимка, име на работника, презиме на работника, фамилия на работника и дата на отсъствие.</Text>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={responsive.imageFrame} source={require('@app/assets/images/Absences/1.png')}/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutAbsenceCreate')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Създаване на отсъствие
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutAbsenceRead')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Преглеждане на отсъствие
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutAbsenceUpdate')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Редактиране на отсъствие
                                        </Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('AboutAbsenceDelete')}>
                            <Card>
                                <CardItem style={custom.aboutCardItem}>
                                    <Body>
                                        <Text style={custom.aboutPresentText}>
                                            Какво представлява страницата?
                                        </Text>
                                        <Text style={custom.aboutPageText}>
                                            Премахване на отсъствие
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
export default withTheme(AboutAbsences);
/* /Exports/ */
