/* Imports */
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Content } from 'native-base';
import { withTheme } from '@app/theme/themeProvider';
import { AntDesign } from '@app/utils/Icons';
import {styles} from '@app/styles/config';
/* /Imports/ */

class ChangeTheme extends React.Component {
    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = ({navigation, screenProps}) => {
        const custom = styles(screenProps);

        return {
            title: "Промяна на темата",
            headerStyle: { backgroundColor: screenProps.theme.color },
            headerTitleStyle: { color: '#F5F5F5' },
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
                <View style={[custom.settingsThemeItem, {backgroundColor: item.backgroundColor}]}>
                    <Text style={[custom.settingsThemeText, { color: item.color }]}>{item.key}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    /* /Render Item - Render One Row - Item - (Theme)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const { themes } = this.props;
        const theme = styles(this.props);

        return (
            <Content style={theme.content}>
                <View>
                    <Text style={theme.settingsTheme}>
                        Изберете вашата тема:
                    </Text>
                </View>

                <FlatList style={[theme.settingsThemeContainer, theme.backgroundColorTheme]} data={themes} renderItem={this._renderItem.bind(this)}/>
            </Content>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

export default withTheme(ChangeTheme);
