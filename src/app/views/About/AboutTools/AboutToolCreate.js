/* Imports */
import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Content } from 'native-base';
import { AntDesign, FontAwesome } from '@app/utils/Icons';
import { Colors } from "@app/utils/Colors";
import { withTheme } from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
/* /Imports/ */

class AboutToolCreate extends Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);

        return {
            title: "Описание на страницата",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('AboutTools') }} style={custom.headerLeft}/>
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
                        <Text style={theme.descriptionText}><FontAwesome name="circle" size={16} style={Colors.default} /> Страницата за създаване на инструмент представлява форма, в която вие трябва да въведете име, описание, брой и наличност на инструмента, който искате да добавите.</Text>
                        <Text style={theme.descriptionText}><FontAwesome name="circle" size={16} style={Colors.default} /> Данни, които съдържа страницата: Име, Описание, Брой и Наличност на инструмента</Text>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrame} source={require('@app/assets/images/Tools/3.png')}/>
                    </View>
                </ScrollView>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(AboutToolCreate);
