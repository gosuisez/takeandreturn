/* Imports */
import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { Content } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
/* /Imports/ */

class ChangeTheme extends React.Component {
    /* Constructor Initialize - Here Are Our States */
    constructor(props) {
        super(props);

        this.state = {
            selectedIndex: 0
        };
    }
    /* /Constructor Initialize - Here Are Our States/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({navigation, screenProps}) => {
        const custom = styles(screenProps);
        const responsive = responsives(screenProps);

        return {
            title: "Промяна на темата",
            headerStyle: responsive.headerStyle,
            headerTitleStyle: responsive.headerTitleStyle,
            headerLeft: <AntDesign name="arrowleft" size={24} color="#F5F5F5" onPress={() => {navigation.navigate('Settings')}} style={custom.headerLeft} />
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Item - Render One Row - Item - (Theme) */
    _renderItem({ item }) {
        const { setTheme } = this.props;
        const custom = styles(this.props);

        return (
            <TouchableOpacity onPress={() => setTheme(item.key, this.props.navigation.setParams({ theme: item.color }))}>
                <Text style={[custom.themeText, { color: item.color }]}>{item.key}</Text>
            </TouchableOpacity>
        );
    }
    /* /Render Item - Render One Row - Item - (Theme)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { themes } = this.props;
        const custom = styles(this.props);
        const responsive = responsives(this.props);

        return (
            <Content style={custom.content}>
                <View style={custom.themeImageSection}>
                    <Image style={responsive.themeImageFrame} source={require('@app/assets/images/Theme/1.png')}/>
                    <Text style={custom.themeText}>
                        ORIGINAL THEME
                    </Text>
                </View>

                <View style={custom.themeImageSection}>
                    <Image style={responsive.themeImageFrame} source={require('@app/assets/images/Theme/2.png')}/>
                    <Text style={custom.themeText}>
                        GRAY THEME
                    </Text>
                </View>

                <View style={custom.settingsOtherView}>
                    <Text style={custom.settingsQuestion}>
                        Какво представлява промяната на тема?
                    </Text>

                    <Text style={custom.settingsAnswer}>
                        Промяната на тема представлява смяна на дизайна (customization) с различни цветове.
                    </Text>
                </View>

                <View style={custom.themeImageSection}>
                    <Text style={custom.settingsQuestion}>Изберете вашата тема: </Text>
                    <FlatList data={themes} renderItem={this._renderItem.bind(this)}/>
                </View>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(ChangeTheme);
/* /Exports/ */
