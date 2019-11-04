/* Imports */
import React, { Component } from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { Content } from 'native-base';
import { AntDesign } from '@app/utils/Icons';
import { withTheme } from '@app/theme/themeProvider';
import {styles} from '@app/styles/config';
/* /Imports/ */

class AboutAppIntro extends Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);

        return {
            title: "Описание на страницата",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('AboutSettings') }} style={custom.headerLeft}/>
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
                        <Text style={theme.descriptionText}>Въвеждащата страница показва всяка една от страниците ни с кратко описание.</Text>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrameAppIntro} source={require('@app/assets/images/Settings/2.png')}/>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrameAppIntro} source={require('@app/assets/images/Settings/3.png')}/>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrameAppIntro} source={require('@app/assets/images/Settings/4.png')}/>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrameAppIntro} source={require('@app/assets/images/Settings/5.png')}/>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrameAppIntro} source={require('@app/assets/images/Settings/6.png')}/>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrameAppIntro} source={require('@app/assets/images/Settings/7.png')}/>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrameAppIntro} source={require('@app/assets/images/Settings/8.png')}/>
                    </View>
                    <View style={theme.imageSection}>
                        <Image style={theme.imageFrameAppIntro} source={require('@app/assets/images/Settings/9.png')}/>
                    </View>
                </ScrollView>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(AboutAppIntro);
