/* Imports */
import { StyleSheet } from 'react-native';
import { Fonts } from "@app/utils/Fonts";
/* /Imports/ */

module.exports = StyleSheet.create({
    /* App Introduction */
    appIntroImage: {
        width: 200,
        height: 200
    },
    appIntroText: {
        color: '#F5F5F5',
        fontSize: 20,
        fontFamily: Fonts.FiraSans
    },
    appIntroTitle: {
        fontSize: 28,
        fontFamily: Fonts.FiraSansMedium,
        color: 'white',
        backgroundColor: 'transparent',
        textAlign: 'center'
    },
    /* /App Introduction/ */
});
