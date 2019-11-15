/* Imports */
import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Content } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
/* /Imports/ */

class AboutAppIntro extends Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Описание на страницата",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: responsive.headerTitleStyle,
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('AboutSettings') }} style={custom.headerLeft}/>
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const custom = styles(this.props);

        return (
            <Content contentContainerStyle={custom.container} style={custom.content}>
                <ScrollView>
                    <View style={custom.descriptionSection}>
                        <Text style={responsive.descriptionText}>Въвеждащата страница показва всяка една от страниците ни с кратко описание.</Text>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={custom.imageFrameAppIntro} source={require('@app/assets/images/Settings/2.png')}/>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={custom.imageFrameAppIntro} source={require('@app/assets/images/Settings/3.png')}/>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={custom.imageFrameAppIntro} source={require('@app/assets/images/Settings/4.png')}/>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={custom.imageFrameAppIntro} source={require('@app/assets/images/Settings/5.png')}/>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={custom.imageFrameAppIntro} source={require('@app/assets/images/Settings/6.png')}/>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={custom.imageFrameAppIntro} source={require('@app/assets/images/Settings/7.png')}/>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={custom.imageFrameAppIntro} source={require('@app/assets/images/Settings/8.png')}/>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={custom.imageFrameAppIntro} source={require('@app/assets/images/Settings/9.png')}/>
                    </View>
                </ScrollView>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(AboutAppIntro);
/* /Exports/ */
