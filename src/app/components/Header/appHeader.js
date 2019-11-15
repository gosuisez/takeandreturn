/* Imports */
import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { Header, Left, Button, Icon, Body, Title } from 'native-base';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
/* /Imports/ */

class AppHeader extends React.Component {
  /* Render Method - Is Place Where You Can View All Content Of The Page */
  render() {
    const custom = styles(this.props);
    const responsive = responsives(this.props);

    return (
      <Header style={custom.header}>
        <StatusBar backgroundColor="#52616B" barStyle="default"/>
        <Left>
            <TouchableOpacity hitSlop={custom.headerHitSlop} onPress={() => this.props.drawerOpen('openDrawer')}>
                <Button transparent>
                    <Icon name="menu" style={custom.headerIcon} onPress={() => this.props.drawerOpen('openDrawer')}/>
                </Button>
            </TouchableOpacity>
        </Left>
        <Body>
            <Title style={responsive.headerTitle}>{this.props.title}</Title>
        </Body>
      </Header>
    );
  }
  /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(AppHeader);
/* /Exports/ */
