/* Imports */
import React, { Component } from "react";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import { View, Image } from "react-native";
import { Content } from "native-base";
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/responsive/responsive';
import { withTheme } from '@app/theme/themeProvider';
/* /Imports/ */

class ContentComponent extends Component {
    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        const custom = styles(this.props);
        const responsive = responsives(this.props);

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
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(ContentComponent);
/* /Exports/ */
