/* Imports */
import {MediaQueryStyleSheet} from "react-native-responsive";
import {Fonts} from "@app/utils/Fonts";
import { Margins, Paddings } from "@app/utils/Spacing";
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
            fontFamily: Fonts.FiraSans
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
            height: 900,
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
        toolWorkerFormReturnBox: {
            backgroundColor: props.theme.color,
            paddingLeft: Paddings.left.pl15,
            paddingRight: Paddings.right.pr15,
            marginTop: Margins.top.mt30,
            height: 1125,
            borderRadius: 10,
            marginBottom: Margins.bottom.mb30
        },
        toolWorkerFormReturnBoxView: {
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            borderBottomWidth: 1,
            borderColor: '#F5F5F5',
            backgroundColor: '#F5F5F5',
            marginTop: Margins.top.mt10,
            borderRadius: 5
        },
    },
    {
        "@media (min-device-width: 320) and (max-device-width: 480)": {
            logoImage: {
                width: 275,
                height: 270,
            },
            headerTitle: {
                marginLeft: -Margins.left.ml25,
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
            workerFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 865,
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
            toolWorkerFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 900,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
            toolWorkerFormReturnBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 1125,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
        },
        "@media (min-device-width: 768) and (max-device-width: 1024)": {
            logoImage: {
                width: 320,
                height: 300
            },
            headerTitle: {
                marginLeft: -Margins.left.ml125
            },
            workerFormBox: {
                backgroundColor: props.theme.color,
                paddingLeft: Paddings.left.pl15,
                paddingRight: Paddings.right.pr15,
                marginTop: Margins.top.mt30,
                height: 610,
                borderRadius: 10,
                marginBottom: Margins.bottom.mb30
            },
        },
    }
);
