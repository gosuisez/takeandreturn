/* Imports */
import React, { Component } from 'react';
import { View, Text, Slider, TouchableNativeFeedback } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Video from 'react-native-video';
import { Button } from 'react-native-elements';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content } from 'native-base';
import { AppHeader } from '@app/components/config';
import slides from '@app/components/Intro/slides';
import { styles } from '@app/styles/config';
import { responsives } from '@app/styles/config';
import { withTheme } from '@app/theme/themeProvider';
import { Entypo, AntDesign } from '@app/utils/Icons';
/* /Imports/ */

class HomeView extends Component {
  /* Constructor Initialize - Here Are Our States */
  constructor(props) {
    super(props);

    this.state = {
      showRealApp: false,
      loading: true,
      videoBackground: null,
      currentTime: 0,
      duration: 0.1,
      paused: false,
      overlay: false
    };
  }
  /* /Constructor Initialize - Here Are Our States/ */

  /* Component Did Mount Method - Here We Save AppIntroSlider To Local Cache With AsyncStorage */
  componentDidMount() {
    AsyncStorage.getItem('first_time').then((value) => {
      this.setState({ showRealApp: !!value, loading: false });
    });
    this.setState({ videoBackground: this.props.theme.backgroundColor });
  };
  /* /Component Did Mount Method - Here We Save AppIntroSlider To Local Cache With AsyncStorage/ */

  /* On Skip Method - AppIntroSlider */
  _onSkip = () => {
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
    });
  };
  /* /On Skip Method - AppIntroSlider/ */

  /* On Done Method - AppIntroSlider */
  _onDone = () => {
    AsyncStorage.setItem('first_time', 'true').then(() => {
      this.setState({ showRealApp: true });
    });
  };
  /* /On Done Method - AppIntroSlider/ */

  /* Handle Double Tap Method - Here We Apply Double Tap On Video Player */
  lastTap = null;

  handleDoubleTap = (doubleTapCallback, singleTapCallback) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;

    if (this.lastTap && (now - this.lastTap) < DOUBLE_PRESS_DELAY)
    {
      clearTimeout(this.timer);
      doubleTapCallback();
    }

    else
    {
      this.lastTap = now;
      this.timer = setTimeout(() => { singleTapCallback(); }, DOUBLE_PRESS_DELAY);
    }

  };
  /* /Handle Double Tap Method - Here We Apply Double Tap On Video Player/ */

  /* Get Time Method - Here We Get The Time Of The Video */
  getTime = t => {
    const digit = n => n < 10 ? `0${n}` : `${n}`;
    const sec = digit(Math.floor(t % 60));
    const min = digit(Math.floor((t / 60) % 60));
    const hr = digit(Math.floor((t / 3600) % 60));
    return hr + ':' + min + ':' + sec;
  };
  /* /Get Time Method - Here We Get The Time Of The Video/ */

  /* Load Method - Here We Get The Duration Of The Video */
  load = ({ duration }) => this.setState({ duration });
  /* /Load Method - Here We Get The Duration Of The Video/ */

  /* Progress Method - Here We Get The Progress Of The Video */
  progress = ({ currentTime }) => this.setState({ currentTime });
  /* /Progress Method - Here We Get The Progress Of The Video/ */

  /* Backward Method - Here We Apply Backward Tapping On Video Player */
  backward = () => {
    this.video.seek(this.state.currentTime - 5);
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
  };
  /* /Backward Method - Here We Apply Backward Tapping On Video Player/ */

  /* Forward Method - Here We Apply Forward Tapping On Video Player */
  forward = () => {
    this.video.seek(this.state.currentTime + 5); // here the video is seek to 5 sec forward
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
  };
  /* /Forward Method - Here We Apply Forward Tapping On Video Player/ */

  /* On Slide Method - Here We Make Our Video Seeking */
  onslide = slide => {
    this.video.seek(slide * this.state.duration);
    clearTimeout(this.overlayTimer);
    this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
  };
  /* /On Slide Method - Here We Make Our Video Seeking/ */

  /* Seek Left Method - Here We Apply Our Seek Left Tapping On Video Player */
  seekLeft = () => {
    const { currentTime } = this.state;
    this.handleDoubleTap(() => {
      this.video.seek(currentTime - 5);
    }, () => {
      this.setState({ overlay: true });
      this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
    })
  };
  /* /Seek Left Method - Here We Apply Our Seek Left Tapping On Video Player/ */

  /* Seek Right Method - Here We Apply Our Seek Right Tapping On Video Player */
  seekRight = () => {
    const { currentTime } = this.state;
    this.handleDoubleTap(() => {
      this.video.seek(currentTime + 5);
    }, () => {
      this.setState({ overlay: true });
      this.overlayTimer = setTimeout(() => this.setState({ overlay: false }), 3000);
    })
  };
  /* /Seek Right Method - Here We Apply Our Seek Right Tapping On Video Player/ */

  /* Navigation Options Like (Header, Title, Menu, Icon, Style) */
  static navigationOptions = (screenProps) => {
    const custom = styles(screenProps);

    return {
      title: "Начало",
      drawerIcon: () => (<Entypo name="home" style={custom.drawerMenuIcon}/>),
    };
  };
  /* /Navigation Options Like (Header, Title, Menu, Icon, Style)/ */

  /* Render Method - Is Place Where You Can View All Content Of The Page */
  render() {
    const { currentTime, duration, paused, overlay } = this.state;
    const custom = styles(this.props);
    const responsive = responsives(this.props);

    if (this.state.showRealApp) {
      return (
          <Container>
            <AppHeader title="Начало" drawerOpen={() => this.props.navigation.openDrawer('DrawerOpen')}/>
            <Content padder={false} contentContainerStyle={custom.container} style={responsive.content}>
              <View style={responsive.videoView}>
                <Video paused={paused} ref={ref => this.video = ref} source={require('@app/assets/video/explainer.mp4')} style={custom.video} resizeMode='contain' onLoad={this.load} onProgress={this.progress}/>
                <View style={custom.videoOverlay}>
                  {overlay ? <View style={custom.videoOverlayView}>
                    <AntDesign name='stepbackward' style={custom.videoIcon} onPress={this.backward} />
                    <AntDesign name={paused ? 'play' : 'pausecircle'} style={custom.videoIcon} onPress={() => this.setState({ paused: !paused })} />
                    <AntDesign name='stepforward' style={custom.videoIcon} onPress={this.forward} />
                    <View style={custom.videoSliderCont}>
                      <View style={custom.videoTimer}>
                        <Text style={custom.videoTimerLenght}>{this.getTime(currentTime)}</Text>
                        <Text style={custom.videoTimerLenght}>{this.getTime(duration)}</Text>
                      </View>
                      <Slider maximumTrackTintColor='white' minimumTrackTintColor='white' thumbTintColor='white' value={currentTime / duration} onValueChange={this.onslide}/>
                    </View>
                  </View> : <View style={custom.videoOverlaySet}>
                    <TouchableNativeFeedback onPress={this.seekLeft}><View style={custom.videoTouch} /></TouchableNativeFeedback>
                    <TouchableNativeFeedback onPress={this.seekRight}><View style={custom.videoTouch} /></TouchableNativeFeedback>
                  </View>}
                </View>
              </View>
            </Content>
            <Content contentContainerStyle={custom.container} style={responsive.content}>
              <View>
                <Animatable.Text animation="zoomInUp" style={responsive.homeDescriptionText}>
                  <Text>
                    ⬆️ Информативно видео ⬆️
                    {"\n"}
                    {"\n"}
                    Добре дошли във Вземи и Върни!
                    {"\n"}
                    Подобрете организацията на вашата фирма с помощта на нашето приложене.
                    {"\n"}
                    За повече информация изгледайте информативното видео по-горе или посетете нашата информативна страница.
                    {"\n"}
                    {"\n"}
                    ⬇️ Информативна страница ⬇️
                  </Text>
                </Animatable.Text>
              </View>
              <View style={responsive.homeDescriptionButton}>
                <Button title="Как да използвате приложението?" buttonStyle={{ backgroundColor: '#22364F' }} onPress={() => this.props.navigation.navigate('AboutApp')}/>
              </View>
            </Content>
          </Container>
      );
    } else {
      return (
          <Container>
            <AppIntroSlider slides={slides} onSkip={this._onSkip} onDone={this._onDone} showPrevButton={true} showSkipButton={true} prevLabel={<AntDesign name="arrowleft" size={23} />} nextLabel={<AntDesign name="arrowright" size={23} />} doneLabel="Готово"/>
          </Container>
      );
    }
  }
  /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

/* Exports */
export default withTheme(HomeView);
/* /Exports/ */
