/* Imports */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Content } from 'native-base';
import { AntDesign, FontAwesome, Entypo } from '@app/utils/Icons';
import { withTheme } from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
/* /Imports/ */

class AppVersion extends Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);

        return {
            title: "Версия на приложението",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('Settings') }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const theme = styles(this.props);

        return (
            <Content style={theme.content}>
                <View style={theme.settingsFirstView}>
                    <Text style={theme.settingsQuestion}>
                        Условия за ползване:
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        <FontAwesome name="warning" size={20} color={'#22364F'}/>
                        Когато извършвате някое от действията в приложението ни може да има леко забавяне, молим ви да изчакате малко, ако ли не рестартирайте приложението. Ако приложението не работи правилно или откриете грешка, молим да се свържете с нас!
                    </Text>
                </View>
                <View style={theme.settingsOtherView}>
                    <Text style={theme.settingsQuestion}>
                        Версия на приложението:
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        <Entypo name="info-with-circle" size={20} color={'#22364F'}/>
                        v1.0
                    </Text>
                </View>
                <View style={theme.settingsOtherView}>
                    <Text style={theme.settingsQuestion}>
                        Дата на публикуване:
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        <FontAwesome name="calendar-o" size={20} color={'#22364F'}/>
                        10 Март 2019 - 10/03/2019
                    </Text>
                </View>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(AppVersion);
