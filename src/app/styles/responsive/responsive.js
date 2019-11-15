/* Imports */
import { Dimensions } from "react-native";
import { MediaQueryStyleSheet } from "react-native-responsive";
import { Fonts } from "@app/utils/Fonts";
import { Margins, Paddings } from "@app/utils/Spacing";

const { width } = Dimensions.get('window');
/* /Imports/ */

export const responsives = (props) => MediaQueryStyleSheet.create(
    {
        drawerNavigator: {
            flex: 1,
            backgroundColor: props.theme.drawerNavigator
        },
        drawerLabel: {
            color: props.theme.textColor
        },
        headerTitle: {
            color: '#F5F5F5',
            fontFamily: Fonts.FiraSans,
        },
        headerStyle: {
            backgroundColor: props.theme.color
        },
        headerTitleStyle: {
            color: '#F5F5F5'
        },
        content: {
            backgroundColor: props.theme.backgroundColor,
        },
        homeDescriptionText: {
            color: props.theme.anotherTextColor,
            fontSize: 15,
            textAlign: 'center',
            fontFamily: Fonts.FiraSans,
        },
        homeDescriptionButton: {
            marginTop: Margins.top.mt10
        },
        videoView: {
            width,
            height: width * .6,
            backgroundColor: '#52616B',
        },
        descriptionText: {
            textAlign: 'center',
            color: props.theme.anotherTextColor,
            fontSize: 16,
            fontFamily: Fonts.FiraSansMedium
        },
        categoryForm: {
            backgroundColor: props.theme.formColor,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15
        },
        categoryFormBox: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt30,
            height: 200,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        categoryFormBoxUpdate: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt30,
            height: 200,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        categoryFormBoxView: {
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            marginTop: Margins.top.mt10,
            borderRadius: 5
        },
        subCategoryForm: {
            backgroundColor: props.theme.formColor,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15
        },
        subCategoryFormBox: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt30,
            height: 200,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        subCategoryFormBoxUpdate: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt30,
            height: 200,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        subCategoryFormBoxView: {
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            marginTop: Margins.top.mt10,
            borderRadius: 5
        },
        toolForm: {
            backgroundColor: props.theme.formColor,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15
        },
        toolFormBox: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt30,
            height: 555,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        toolFormBoxUpdate: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt30,
            height: 555,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        toolFormBoxView: {
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            marginTop: Margins.top.mt10,
            borderRadius: 5
        },
        workerForm: {
            backgroundColor: props.theme.formColor,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15
        },
        workerFormBox: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt30,
            height: 865,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        workerFormBoxUpdate: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt30,
            height: 865,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        workerFormBoxView: {
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            marginTop: Margins.top.mt10,
            borderRadius: 5
        },
        scheduleForm: {
            backgroundColor: props.theme.formColor,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15
        },
        scheduleFormBox: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt30,
            height: 915,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        scheduleFormBoxUpdate: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt10,
            height: 765,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        scheduleFormBoxView: {
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            marginTop: Margins.top.mt10,
            borderRadius: 5
        },
        absenceForm: {
            backgroundColor: props.theme.formColor,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15
        },
        absenceFormBox: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt10,
            height: 685,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        absenceFormBoxUpdate: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt10,
            height: 600,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        absenceFormBoxView: {
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            marginTop: Margins.top.mt10,
            borderRadius: 5
        },
        toolWorkerForm: {
            backgroundColor: props.theme.formColor,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15
        },
        toolWorkerFormBox: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt30,
            height: 1125,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        toolWorkerFormBoxView: {
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            marginTop: Margins.top.mt10,
            borderRadius: 5
        },
        toolWorkerFormReturn: {
            backgroundColor: props.theme.formColor,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15
        },
        toolWorkerFormBoxReturn: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt30,
            height: 1125,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        toolWorkerFormBoxReturnView: {
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            marginTop: Margins.top.mt10,
            borderRadius: 5
        },

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

        /* CRUD For Categories, SubCategories, Tools, ToolsInWorkers, Workers, Absences And Schedules */
        PartCalendar: {
            backgroundColor: props.theme.color,
            borderRadius: 10,
            marginLeft: Margins.left.ml20,
            marginRight: Margins.right.mr20,
            marginTop: Margins.top.mt20,
            height: 70
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
        /* /CRUD For Categories, SubCategories, Tools, ToolsInWorkers, Workers, Absences And Schedules/ */

        /* Settings */
        settingsText: {
            color: props.theme.textColor,
        },
        /* /Settings/ */

        /* Global */
        imageFrame: {
            borderWidth: 2,
            borderColor: props.theme.color,
            width: 365,
            height: 600
        },
        themeImageFrame: {
            borderWidth: 2,
            borderColor: props.theme.color,
            width: 420,
            height: 250
        },
        /* /Global/ */
    },
    {
        "@media (min-device-width: 0) and (max-device-width: 320)": {
            logoImage: {
                width: 250,
                height: 250
            },
            drawerLabel: {
                color: props.theme.textColor,
                fontSize: 15
            },
            vectorIcon: {
                fontSize: 23
            },
            videoView: {
                width,
                height: width * .6,
                backgroundColor: '#52616B',
            },
            homeDescriptionText: {
                color: props.theme.anotherTextColor,
                fontSize: 10,
                textAlign: 'center',
                fontFamily: Fonts.FiraSans,
                marginTop: Margins.top.mt5
            },
            homeDescriptionButton: {
                marginTop: Margins.top.mt5
            },
            PartCalendar: {
                backgroundColor: props.theme.color,
                borderRadius: 10,
                marginLeft: Margins.left.ml20,
                marginRight: Margins.right.mr20,
                marginTop: Margins.top.mt20,
                marginBottom: Margins.bottom.mb5,
                height: 60
            },
            PartNoData: {
                textAlign: 'center',
                color: '#F5F5F5',
                marginTop: Margins.top.mt10,
                paddingLeft: Paddings.left.pl10,
                paddingRight: Paddings.right.pr10,
                fontSize: 14,
                fontFamily: Fonts.FiraSans
            },
            categoryFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 180,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            categoryFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 180,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            subCategoryFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 180,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            subCategoryFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 180,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 555,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 515,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolWorkerFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 865,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolWorkerFormBoxReturn: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 1100,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            workerFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 855,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            workerFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 855,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            scheduleFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 925,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            scheduleFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt10,
                height: 765,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            absenceFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt10,
                height: 700,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            absenceFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt10,
                height: 610,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            imageFrame: {
                borderWidth: 2,
                borderColor: props.theme.color,
                width: 315,
                height: 500
            },
            themeImageFrame: {
                borderWidth: 2,
                borderColor: props.theme.color,
                width: 330,
                height: 230
            },
        },
        "@media (min-device-width: 321) and (max-device-width: 480)": {
            logoImage: {
                width: 275,
                height: 270,
            },
            headerTitle: {
                marginLeft: -Margins.left.ml5,
            },
            vectorIcon: {
                fontSize: 23
            },
            videoView: {
                width,
                height: width * .6,
                backgroundColor: '#52616B',
            },
            PartCalendar: {
                backgroundColor: props.theme.color,
                borderRadius: 10,
                marginLeft: Margins.left.ml20,
                marginRight: Margins.right.mr20,
                marginTop: Margins.top.mt20,
                marginBottom: Margins.bottom.mb5,
                height: 60
            },
            PartNoData: {
                textAlign: 'center',
                color: '#F5F5F5',
                marginTop: Margins.top.mt20,
                paddingLeft: Paddings.left.pl10,
                paddingRight: Paddings.right.pr10,
                fontSize: 14,
                fontFamily: Fonts.FiraSans
            },
            categoryFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 180,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            categoryFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 180,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            subCategoryFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 180,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            subCategoryFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 180,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 555,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 515,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolWorkerFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 865,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolWorkerFormBoxReturn: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 1100,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            workerFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 855,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            workerFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 855,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            scheduleFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 925,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            scheduleFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt10,
                height: 765,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            absenceFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt10,
                height: 700,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },

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
                marginTop: Margins.top.mt150,
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
            /* /NFC/ */
        },
        "@media (min-device-width: 600) and (max-device-width: 1024)": {
            logoImage: {
                width: 320,
                height: 320
            },
            headerTitle: {
                marginLeft: -Margins.left.ml60,
                fontSize: 23
            },
            headerTitleStyle: {
                color: '#F5F5F5',
            },
            vectorIcon: {
                fontSize: 35
            },
            drawerLabel: {
                color: props.theme.textColor,
                fontSize: 20
            },
            PartCalendar: {
                backgroundColor: props.theme.color,
                borderRadius: 10,
                marginLeft: Margins.left.ml20,
                marginRight: Margins.right.mr20,
                marginTop: Margins.top.mt20,
                marginBottom: Margins.bottom.mb5,
                height: 60
            },
            PartNoData: {
                textAlign: 'center',
                color: '#F5F5F5',
                marginTop: Margins.top.mt20,
                paddingLeft: Paddings.left.pl10,
                paddingRight: Paddings.right.pr10,
                fontSize: 14,
                fontFamily: Fonts.FiraSans
            },
            categoryFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 180,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            categoryFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 180,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            subCategoryFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 180,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            subCategoryFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 180,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 555,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 515,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolWorkerFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 865,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolWorkerFormBoxReturn: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 1100,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            workerFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 855,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            workerFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 855,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            scheduleFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 925,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            scheduleFormBoxUpdate: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt10,
                height: 765,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            absenceFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt10,
                height: 700,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            homeDescriptionText: {
                color: props.theme.anotherTextColor,
                fontSize: 25,
                textAlign: 'center',
                fontFamily: Fonts.FiraSans
            },
            homeDescriptionButton: {
                marginTop: Margins.top.mt50,
                width: 500
            },
            videoView: {
                width,
                height: width * .6,
                backgroundColor: '#52616B',
            },

            /* Settings */
            settingsText: {
                color: props.theme.textColor,
                fontSize: 23
            },
            /* /Settings/ */

            /* Global */
            imageFrame: {
                borderWidth: 2,
                borderColor: props.theme.color,
                width: 525,
                height: 850
            },
            descriptionText: {
                textAlign: 'center',
                color: props.theme.anotherTextColor,
                fontSize: 23,
                fontFamily: Fonts.FiraSansMedium
            },
            /* /Global/ */
        },
    }
);
