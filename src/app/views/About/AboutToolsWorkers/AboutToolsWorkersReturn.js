/* Imports */
import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Content } from 'native-base';
import { AntDesign } from '@app/utils/Icons';
import { withTheme } from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
/* /Imports/ */

class AboutToolsWorkersReturn extends Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);

        return {
            title: "Описание на страницата",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('AboutToolsWorkers') }} style={custom.headerLeft}/>
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
                        <Text style={theme.descriptionText}>Страницата за връщане на инструмент от работник представлява форма, в която вие трябва да въведете дата на връщане, час на връщане и парола на работника, от който искате да върнете инструмент.</Text>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrame} source={require('@app/assets/images/ToolsWorkers/7.png')}/>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrame} source={require('@app/assets/images/ToolsWorkers/8.png')}/>
                    </View>
                </ScrollView>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(AboutToolsWorkersReturn);
