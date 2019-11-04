import React, { Component } from "react";
import { Image, View } from "react-native";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { Content } from "native-base";
import { withTheme } from '@app/theme/themeProvider';
import { responsives} from '../../styles/responsive/responsive';
import {styles} from '@app/styles/config';

class ContentComponent extends Component {
    render() {
        const responsive = responsives(this.props);
        const custom = styles(this.props);

        return (
            <View style={responsive.drawerNavigator}>
                <View>
                    <Image style={responsive.logoImage} source={require('@app/assets/images/logo.png')} />
                </View>
                <View style={custom.drawerHorizontalRule}/>
                <Content style={custom.drawerItems}>
                    <DrawerNavigatorItems  {...this.props} labelStyle={responsive.drawerLabel}/>
                </Content>
            </View>
        );
    }
}

export default withTheme(ContentComponent);
