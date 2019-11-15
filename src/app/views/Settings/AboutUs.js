/* Imports */
import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Content } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
/* /Imports/ */

class AboutUs extends Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({navigation, screenProps}) => {
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "За нас",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: {color: '#F5F5F5'},
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => {navigation.navigate('Settings')}} style={custom.headerLeft} />
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const custom = styles(this.props);

        return (
            <Content style={custom.content}>
                <View style={custom.settingsFirstView}>
                    <Text style={custom.settingsQuestion}>
                        Кои сме ние?
                    </Text>
                    <Text style={custom.settingsAnswer}>
                        Ние сме ученици на Професионална гимназия по икономика - гр.Перник.
                        Специалност - Икономическа информатика.
                    </Text>
                </View>
                <View style={custom.settingsOtherView}>
                    <Text style={custom.settingsQuestion}>
                        Имейл:
                    </Text>
                    <Text style={custom.settingsAnswer}>
                        takeandreturn@gmail.com
                    </Text>
                </View>
                <View style={custom.settingsOtherView}>
                    <Text style={custom.settingsQuestion}>
                        Къде да ни намерите?
                    </Text>
                    <Text style={custom.settingsAnswer}>
                        ПГИ Перник 2302, гр. Перник, ул. Г. Мамарчев pgi_pernik@abv.bg
                    </Text>
                </View>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(AboutUs);
/* /Exports/ */
