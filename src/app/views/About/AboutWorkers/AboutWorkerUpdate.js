/* Imports */
import React, { Component } from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { Content } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
/* /Imports/ */

class AboutWorkerUpdate extends Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({ navigation, screenProps }) => {
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Описание на страницата",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: responsive.headerTitleStyle,
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => { navigation.navigate('AboutWorkers') }} style={custom.headerLeft}/>
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
                        <Text style={responsive.descriptionText}>Страницата за редактиране на работник представлява форма, в която вие можете да промените името, презимето, фамилията, телефона и адреса на създадения от вас работник.</Text>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={responsive.imageFrame} source={require('@app/assets/images/Workers/13.png')}/>
                    </View>
                    <View style={custom.imageSection}>
                        <Image style={responsive.imageFrame} source={require('@app/assets/images/Workers/14.png')}/>
                    </View>
                </ScrollView>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(AboutWorkerUpdate);
/* /Exports/ */
