import { Dimensions, StyleSheet } from 'react-native';
import {relativeWidth} from "@app/utils/Relatives";
import {Fonts} from "@app/utils/Fonts";
import {Margins, Paddings} from "@app/utils/Spacing";
import {Colors} from "@app/utils/Colors";
const { width } = Dimensions.get('window');

export const styles = (props) => StyleSheet.create({
    colorTheme: {
        color: props.theme.backgroundColor,
        marginTop: 60,
        marginBottom: 20,
        marginLeft: 20,
        fontWeight: '200',
        fontSize: 24,
    },
    backgroundColorTheme: {
        backgroundColor: props.theme.backgroundColor,
    },

    /* Header */
    header: {
        backgroundColor: props.theme.color,
    },
    headerIcon: {
        fontSize: 28
    },
    headerBackIcon: {
        color: '#F5F5F5',
        fontSize: 24
    },
    headerBody: {
        marginLeft: Margins.left.ml50
    },
    headerSettingsBody: {
        marginLeft: Margins.left.ml5
    },
    headerHitSlop: {
        top: 20,
        bottom: 20,
        left: 50,
        right: 50
    },
    /* /Header/ */

    /* Navigation */
    headerLeft: {
        marginLeft: Margins.left.ml10
    },
    drawerMenuIcon: {
        fontSize: 25,
        color: "#919191"
    },
    drawerHorizontalRule: {
        marginTop: Margins.top.mt10,
        borderBottomColor: '#52616B',
        borderBottomWidth: 2
    },
    drawerItems: {
        marginTop: Margins.top.mt10
    },
    stackNavigatorBackIcon: {
        marginLeft: Margins.left.ml10,
        fontSize: 24,
        color: '#F5F5F5'
    },
    stackNavigatorSearchArrow: {
        color: Colors.whiteSmoke
    },
    /* /Navigation/ */

    /* Form */
    FormItem: {
        borderBottomColor: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: Margins.left.ml15,
        marginRight: Margins.right.mr15,
        height: 32
    },
    FormLabel: {
        color: props.theme.formLabel,
        fontSize: 16,
        marginLeft: Margins.left.ml15,
        marginTop: Margins.top.mt10,
        marginBottom: Margins.bottom.mb10,
        fontFamily: Fonts.FiraSansMedium
    },
    FormTextArea: {
        borderBottomColor: 0,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginLeft: Margins.left.ml15,
        marginRight: Margins.right.mr15,
        height: 70
    },
    FormInput: {
        flex: 1,
        marginTop: Margins.top.mt0,
        marginBottom: Margins.bottom.mb0,
        marginLeft: Margins.left.ml0,
        marginRight: Margins.right.mr0,
        paddingTop: Paddings.top.pt0,
        paddingBottom: Paddings.bottom.pb0,
        paddingLeft: Paddings.left.pl0,
        paddingRight: Paddings.right.pr0,
        fontSize: 15,
        color: props.theme.formInput
    },
    FormCheckBox: {
        position: 'absolute',
        right: 0
    },
    FormButton: {
        alignItems: 'center',
        backgroundColor: props.theme.buttonColor,
        color: '#F5F5F5',
        paddingLeft: Paddings.left.pl10,
        paddingRight: Paddings.right.pr10,
        marginTop: Margins.top.mt15,
        marginLeft: Margins.left.ml15,
        marginRight: Margins.right.mr15,
        borderRadius: 5
    },
    FormButtonTitle: {
        color: '#F5F5F5'
    },
    FormFieldSpacing: {
        marginTop: Margins.top.mt15
    },
    FormButtonSpacing: {
        marginTop: Margins.top.mt20
    },
    /* /Form/ */

    /* Home */
    homeDescriptionText: {
        color: props.theme.anotherTextColor,
        fontSize: 16,
        textAlign: 'center',
        fontFamily: Fonts.FiraSans
    },
    homeDescriptionButton: {
        marginTop: Margins.top.mt30
    },
    videoBackground: {
        backgroundColor: props.theme.backgroundColor
    },
    /* /Home/ */

    /* CRUD For Categories, SubCategories And Tools */
    PartView: {
        backgroundColor: props.theme.backgroundColor,
        elevation: 5,
        marginLeft: relativeWidth(0.01),
        marginRight: relativeWidth(0.01),
        marginTop: relativeWidth(2),
        marginBottom: relativeWidth(2),
        shadowRadius: 5,
        shadowOffset: { width: 5, height: 5 }
    },
    PartList: {
        marginTop: Margins.top.mt0,
        marginBottom: Margins.bottom.mb0,
        paddingLeft: Paddings.left.pl15,
        paddingRight: Paddings.right.pr5,
        backgroundColor: props.theme.backgroundColor,
        flex: 1
    },
    PartListSearch: {
        marginTop: Margins.top.mt60,
        marginBottom: Margins.bottom.mb0,
        paddingLeft: Paddings.left.pl15,
        paddingRight: Paddings.right.pr5,
        backgroundColor: props.theme.backgroundColor,
        flex: 1
    },
    PartListSearchView: {
        backgroundColor: props.theme.backgroundColor,
        elevation: 5,
        marginLeft: relativeWidth(0.01),
        marginRight: relativeWidth(0.01),
        marginTop: relativeWidth(2),
        marginBottom: relativeWidth(2),
        shadowRadius: 5,
        shadowOffset: {
            width: 5,
            height: 5
        }
    },
    PartListItem: {
        borderBottomWidth: 0
    },
    PartImage: {
        width: 30,
        height: 30,
        marginLeft: -Margins.left.ml15,
        color: props.theme.iconColor,
    },
    PartIcon: {
        position: 'absolute',
        left: -23,
        color: props.theme.iconColor,
        fontSize: 30
    },
    PartName: {
        color: props.theme.textColor,
        left: 10,
        marginRight: Margins.right.mr50,
        paddingRight: Paddings.right.pr50,
        fontSize: 14,
        fontFamily: Fonts.FiraSans
    },
    PartCreate: {
        backgroundColor: props.theme.color
    },
    PartRead: {
        position: 'absolute',
        right: 65,
        color: '#1C3A40',
        fontSize: 25
    },
    PartUpdate: {
        position: 'absolute',
        right: 35,
        color: '#2E618D',
        fontSize: 25
    },
    PartDelete: {
        position: 'absolute',
        right: 5,
        color: '#E50000',
        fontSize: 25
    },
    PartForm: {
        backgroundColor: '#415868'
    },
    PartUpdateButton: {
        marginTop: Margins.top.mt20
    },
    PartQuickActionButtons: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        top: 25
    },
    PartDeleteButton: {
        marginTop: Margins.top.mt50
    },
    PartDeleteIcon: {
        marginTop: Margins.top.mt10
    },
    PartDeleteView: {
        marginTop: Margins.top.mt80
    },
    PartDeleteText: {
        color: "#F5F5F5",
        fontWeight: "bold",
        fontStyle: 'italic',
        textAlign: "center",
        fontSize: 18,
        marginTop: Margins.top.mt60
    },
    PartDeleteFirstButton: {
        backgroundColor: "#5CB85C",
        borderRadius: 5
    },
    PartDeleteSecondButton: {
        backgroundColor: "#D9534F",
        borderRadius: 5
    },
    PartDetailsValues: {
        fontWeight: "bold"
    },
    PartDetailsImage: {
        marginTop: Margins.top.mt5,
        width: 150,
        height: 150,
        alignSelf: 'center'
    },
    PartDetailsActions: {
        backgroundColor: props.theme.color
    },
    PartDetailsActionsTitle: {
        color: "#F5F5F5"
    },
    PartDetailsEditIcon: {
        color: '#2E618D'
    },
    PartDetailsDeleteIcon: {
        color: '#E50000'
    },
    PartDetailsView: {
        marginTop: Margins.top.mt10,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        marginLeft: Margins.left.ml10,
        marginRight: Margins.right.mr10,
        marginBottom: Margins.bottom.mb5
    },
    PartDetailsText: {
        color: '#F5F5F5',
        marginTop: Margins.top.mt10,
        fontSize: 20,
        marginLeft: Margins.left.ml5
    },
    PartDetailsExtraValues: {
        width: 150,
        height: 50,
        marginTop: Margins.top.mt10,
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#F5F5F5',
        marginLeft: Margins.left.ml10,
        marginRight: Margins.right.mr10,
        marginBottom: Margins.bottom.mb5
    },
    PartDetailsExtraView: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    PartNoData: {
        textAlign: 'center',
        color: '#F5F5F5',
        marginTop: Margins.top.mt25,
        paddingLeft: Paddings.left.pl10,
        paddingRight: Paddings.right.pr10,
        fontSize: 15,
        fontFamily: Fonts.FiraSans
    },
    PartCalendarView: {
        flex: 1
    },
    PartCalendar: {
        backgroundColor: props.theme.color,
        borderRadius: 10,
        marginLeft: Margins.left.ml20,
        marginRight: Margins.right.mr20,
        marginTop: Margins.top.mt20,
        height: 70
    },
    PartCalendarItem: {
        backgroundColor: props.theme.color,
        borderRadius: 10,
        marginLeft: Margins.left.ml20,
        marginRight: Margins.right.mr20,
        marginTop: Margins.top.mt20,
        marginBottom: Margins.bottom.mb5,
        height: 60
    },
    PartCalendarText: {
        color: '#F5F5F5',
        left: 10
    },
    PartCalendarExtraText: {
        position: "absolute",
        right: 0,
        color: '#F5F5F5'
    },
    PartCalendarDate: {
        marginLeft: Margins.left.ml20,
        color: '#F5F5F5'
    },
    PartCalendarPicker: {
        color: '#22364F',
        marginLeft: Margins.left.ml15
    },
    PartCalendarData: {
        paddingTop: 5,
        height: 350,
        backgroundColor: props.theme.backgroundColor
    },
    /* /CRUD For Categories, SubCategories And Tools/ */

    /* About App */
    aboutAppBlock: {
        marginTop: Margins.top.mt35
    },
    aboutCardItem: {
        backgroundColor: props.theme.color,
        height: 65
    },
    aboutPresentText: {
        color: '#F5F5F5',
        alignSelf: 'center',
        fontSize: 16
    },
    aboutPageText: {
        fontWeight: 'bold',
        color: props.theme.buttonColor,
        alignSelf: 'center',
        fontSize: 16
    },
    /* /About App/ */

    /* Settings */
    settingsText: {
        color: props.theme.textColor,
    },
    settingsListItem: {
        borderBottomWidth: 0,
    },
    settingsDetailsArrow: {
        position: 'absolute',
        right: 0,
        color: '#F5F5F5'
    },
    settingsFirstView: {
        marginTop: Margins.top.mt150
    },
    settingsOtherView: {
        marginTop: Margins.top.mt25
    },
    settingsDataButtonView: {
        marginTop: Margins.top.mt25,
        marginBottom: Margins.bottom.mb5
    },
    settingsDataButtonStyle: {
        backgroundColor: "#22364F",
        marginLeft: Margins.left.ml5,
        marginRight: Margins.right.mr5
    },
    settingsThemeContainer: {
        flex: 1,
    },
    settingsThemeHeadline: {
        marginTop: 60,
        marginBottom: 20,
        marginLeft: 20,
        fontWeight: '200',
        fontSize: 24,
    },
    settingsThemeItem: {
        height: 100,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    settingsThemeText: {
        fontWeight: 'bold'
    },
    settingsMenuHeader: {
        backgroundColor: props.theme.color,
        fontSize: 20,
        padding: 5,
        color: '#F5F5F5',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    settingsQuestion: {
        textAlign: "center",
        color: props.theme.textColor,
        fontSize: 23,
        fontFamily: Fonts.FiraSansMedium
    },
    settingsAnswer: {
        textAlign: "center",
        color: props.theme.textColor,
        fontSize: 15,
        fontFamily: Fonts.FiraSans
    },
    settingsTheme: {
        textAlign: "center",
        color: props.theme.textColor,
        fontSize: 23,
        fontFamily: Fonts.FiraSansMedium,
        marginTop: Margins.top.mt30
    },
    /* /Settings/ */

    /* Alerts */
    Alert: {
        backgroundColor: '#52616B'
    },
    AlertTitle: {
        fontFamily: Fonts.FiraSansMedium,
        textAlign: 'center',
        color: '#F5F5F5',
        fontSize: 23
    },
    AlertBody: {
        fontFamily: Fonts.FiraSans,
        textAlign: 'center',
        color: '#F5F5F5',
        fontSize: 16
    },
    /* /Alerts/ */

    /* NFC */
    NFCView: {
        marginTop: Margins.top.mt15
    },
    NFCErrorText: {
        color: '#FF0000',
        fontFamily: Fonts.FiraSans,
        textAlign: 'center'
    },
    NFCText: {
        color: '#2EBEE5',
        alignSelf: 'center',
        marginTop: Margins.top.mt15,
        fontSize: 15,
        fontFamily: Fonts.FiraSansMedium
    },
    NFCTitle: {
        textAlign: 'center',
        fontSize: 20,
        color: '#22364F',
        fontFamily: Fonts.FiraSansMedium
    },
    NFCAnimation: {
        width: 300,
        height: 200,
        marginTop: Margins.top.mt125,
        alignItems: 'center'
    },
    NFCDescription: {
        textAlign: 'center',
        fontSize: 15,
        fontFamily: Fonts.FiraSans
    },
    NFCStatus: {
        marginBottom: Margins.bottom.mb10,
        textAlign: 'center',
        fontSize: 15,
        fontFamily: Fonts.FiraSans
    },
    NFCButton: {
        color: '#22364F'
    },
    /* /NFC/ */

    /* Video */
    video: {
        ...StyleSheet.absoluteFill
    },
    videoView: {
        width,
        height: width * .6,
        backgroundColor: '#52616B',
        marginBottom: Margins.bottom.mb55
    },
    videoOverlay: {
        ...StyleSheet.absoluteFillObject
    },
    videoOverlayView: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#0006'
    },
    videoOverlaySet: {
        flex: 1,
        flexDirection: 'row'
    },
    videoIcon: {
        color: 'white',
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 25
    },
    videoSliderCont: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0
    },
    videoTimer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 1
    },
    videoTimerLenght: {
        color: '#F5F5F5'
    },
    videoTouch: {
        flex: 1
    },
    /* /Video/ */

    /* Global */
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    content: {
        backgroundColor: props.theme.backgroundColor,
    },
    errorMessages: {
        color: '#FF0000',
        position: 'absolute',
        right: 0,
        top: 3,
        fontFamily: Fonts.FiraSans
    },
    noDataMessage: {
        color: props.theme.color,
        fontSize: 15,
        fontFamily: Fonts.FiraSansMedium
    },
    descriptionSection: {
        alignSelf: 'center'
    },
    descriptionText: {
        textAlign: 'center',
        color: props.theme.anotherTextColor,
        fontSize: 16,
        fontFamily: Fonts.FiraSansMedium
    },
    imageSection: {
        alignSelf: 'center',
        marginTop: Margins.top.mt10,
        marginBottom: Margins.bottom.mb10
    },
    imageFrame: {
        borderWidth: 2,
        borderColor: props.theme.color
    },
    imageFrameAppIntro: {
        borderWidth: 2,
        borderColor: props.theme.color,
        width: 362,
        height: 578
    },
    readViewValues: {
        textAlign: 'right'
    },
    zdr: {
        backgroundColor: '#8B93A0',
    }
    /* /Global/ */
});
