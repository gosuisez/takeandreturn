/* Imports */
import React, { Component } from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Container } from 'native-base';
import slides from '@app/components/Intro/slides';
import { AntDesign } from '@app/utils/Icons';
/* /Imports/ */

class AppIntro extends Component {
    /* On Skip Method - AppIntroSlider */
    _onSkip = () => {
        this.props.navigation.navigate('Settings');
    };
    /* /On Skip Method - AppIntroSlider/ */

    /* On Done Method - AppIntroSlider */
    _onDone = () => {
        this.props.navigation.navigate('Settings');
    };
    /* /On Done Method - AppIntroSlider/ */

    /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
    static navigationOptions = () => {
        return {
            header: null
        };
    };
    /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        return (
            <Container>
                <AppIntroSlider slides={slides} onSkip={this._onSkip} onDone={this._onDone} showSkipButton={true} showPrevButton={true} prevLabel={<AntDesign name="arrowleft" size={23} />} nextLabel={<AntDesign name="arrowright" size={23} />} doneLabel="Готово"/>
            </Container>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default AppIntro;
/* /Exports/ */
