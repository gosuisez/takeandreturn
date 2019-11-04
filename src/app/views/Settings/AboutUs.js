/* Imports */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Content } from 'native-base';
import { AntDesign } from '@app/utils/Icons';
import { withTheme } from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
/* /Imports/ */

class AboutUs extends Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({navigation, screenProps}) => {
        const custom = styles(screenProps);

        return {
            title: "За нас",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: {color: '#F5F5F5'},
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => {navigation.navigate('Settings')}} style={custom.headerLeft} />
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
                        Кои сме ние?
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        Ние сме ученици на Професионална гимназия по икономика - гр.Перник.
                        Специалност - Икономическа информатика.
                    </Text>
                </View>
                <View style={theme.settingsOtherView}>
                    <Text style={theme.settingsQuestion}>
                        Имейл:
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        takeandreturn@gmail.com
                    </Text>
                </View>
                <View style={theme.settingsOtherView}>
                    <Text style={theme.settingsQuestion}>
                        Къде да ни намерите?
                    </Text>
                    <Text style={theme.settingsAnswer}>
                        ПГИ Перник 2302, гр. Перник, ул. Г. Мамарчев pgi_pernik@abv.bg
                    </Text>
                </View>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(AboutUs);
