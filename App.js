/* Imports */
import React from 'react';
import SplashScreen from 'react-native-splash-screen';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { fadeIn } from 'react-navigation-transitions';
import { withTheme } from './src/app/theme/themeProvider';
import { ThemeContextProvider } from './src/app/theme/themeProvider';
import { Navigation } from "./src/app/components/config";

import {
    HomeView,
    CategoriesView,
    SubCategoriesView,
    ToolsView,
    ToolsWorkersView,
    WorkersView,
    ScheduleView,
    AbsencesView,
    SettingsView,
    ChangeTheme,
    AboutUs,
    AppIntro,
    AppVersion,
    ImportData,
    ExportData,
    AboutApp,
    AboutHome,
    AboutCategories,
    AboutCategorySearch,
    AboutCategoryCreate,
    AboutCategoryUpdate,
    AboutCategoryDelete,
    AboutSubCategories,
    AboutSubCategorySearch,
    AboutSubCategoryCreate,
    AboutSubCategoryUpdate,
    AboutSubCategoryDelete,
    AboutTools,
    AboutToolSearch,
    AboutToolCreate,
    AboutToolRead,
    AboutToolUpdate,
    AboutToolDelete,
    AboutToolsWorkers,
    AboutToolsWorkersReturn,
    AboutToolsWorkersSearch,
    AboutToolsWorkersCreate,
    AboutToolsWorkersRead,
    AboutToolsWorkersDelete,
    AboutWorkers,
    AboutWorkerSearch,
    AboutWorkerCreate,
    AboutWorkerRead,
    AboutWorkerUpdate,
    AboutWorkerDelete,
    createWorker,
    readWorker,
    updateWorker,
    deleteWorker,
    searchWorker,
    createCategory,
    updateCategory,
    deleteCategory,
    searchCategory,
    createSubCategory,
    updateSubCategory,
    deleteSubCategory,
    searchSubCategory,
    createTool,
    readTool,
    updateTool,
    deleteTool,
    searchTool,
    createToolWorker,
    readToolWorker,
    returnToolWorker,
    deleteToolWorker,
    searchToolWorker,
    AboutSchedule,
    AboutScheduleCreate,
    AboutScheduleRead,
    AboutScheduleUpdate,
    AboutScheduleDelete,
    AboutAbsences,
    AboutAbsenceCreate,
    AboutAbsenceRead,
    AboutAbsenceUpdate,
    AboutAbsenceDelete,
    AboutSettings,
    AboutAppIntro,
    AboutAppChangeTheme,
    AboutAppImportData,
    AboutAppExportData,
    AboutAppUs,
    AboutAppContacts,
    AboutAppVersion,
    createSchedule,
    readSchedule,
    updateSchedule,
    deleteSchedule,
    createAbsence,
    readAbsence,
    updateAbsence,
    deleteAbsence,
} from './src/app/views/config';
/* /Imports/ */

export default class App extends React.Component {
    /* Component Did Mount Method - Here We Mount Component - Splash Screen */
    componentDidMount() {
        SplashScreen.hide();
    }
    /* /Component Did Mount Method - Here We Mount Component - Splash Screen/ */

    /* Render Method - Is Place Where You Can View All Content Of The Page */
    render() {
        return (
            <ThemeContextProvider>
                <AppContainerWithTheme />
            </ThemeContextProvider>
        );
    }
    /* /Render Method - Is Place Where You Can View All Content Of The Page/ */
}

const StackNavigator = createStackNavigator(
    {
        createCategory: { screen: createCategory },
        updateCategory: { screen: updateCategory },
        deleteCategory: { screen: deleteCategory },
        searchCategory: { screen: searchCategory },
        createSubCategory: { screen: createSubCategory },
        updateSubCategory: { screen: updateSubCategory },
        deleteSubCategory: { screen: deleteSubCategory },
        searchSubCategory: { screen: searchSubCategory },
        createTool: { screen: createTool },
        readTool: { screen: readTool },
        updateTool: { screen: updateTool },
        deleteTool: { screen: deleteTool },
        searchTool: { screen: searchTool },
        createToolWorker: { screen: createToolWorker },
        readToolWorker: { screen: readToolWorker },
        deleteToolWorker: { screen: deleteToolWorker },
        returnToolWorker: { screen: returnToolWorker },
        searchToolWorker: { screen: searchToolWorker },
        createWorker: { screen: createWorker },
        readWorker: { screen: readWorker },
        updateWorker: { screen: updateWorker },
        deleteWorker: { screen: deleteWorker },
        searchWorker: { screen: searchWorker },
        createSchedule: { screen: createSchedule },
        readSchedule: { screen: readSchedule },
        updateSchedule: { screen: updateSchedule },
        deleteSchedule: { screen: deleteSchedule },
        createAbsence: { screen: createAbsence },
        readAbsence: { screen: readAbsence },
        updateAbsence: { screen: updateAbsence },
        deleteAbsence: { screen: deleteAbsence },
        CategoriesView: { screen: CategoriesView },
        SubCategoriesView: { screen: SubCategoriesView },
        WorkersView: { screen: WorkersView },
        AbsencesView: { screen: AbsencesView },
        AppIntro: { screen: AppIntro },
        ChangeTheme: { screen: ChangeTheme },
        ImportData: { screen: ImportData },
        AboutUs: { screen: AboutUs },
        ExportData: { screen: ExportData },
        AppVersion: { screen: AppVersion },
        AboutApp: { screen: AboutApp },
        AboutHome: { screen: AboutHome },
        AboutCategories: { screen: AboutCategories },
        AboutCategorySearch: { screen: AboutCategorySearch },
        AboutCategoryCreate: { screen: AboutCategoryCreate },
        AboutCategoryUpdate: { screen: AboutCategoryUpdate },
        AboutCategoryDelete: { screen: AboutCategoryDelete },
        AboutSubCategories: { screen: AboutSubCategories },
        AboutSubCategorySearch: { screen: AboutSubCategorySearch },
        AboutSubCategoryCreate: { screen: AboutSubCategoryCreate },
        AboutSubCategoryUpdate: { screen: AboutSubCategoryUpdate },
        AboutSubCategoryDelete: { screen: AboutSubCategoryDelete },
        AboutTools: { screen: AboutTools },
        AboutToolSearch: { screen: AboutToolSearch },
        AboutToolCreate: { screen: AboutToolCreate },
        AboutToolRead: { screen: AboutToolRead },
        AboutToolUpdate: { screen: AboutToolUpdate },
        AboutToolDelete: { screen: AboutToolDelete },
        AboutToolsWorkers: { screen: AboutToolsWorkers },
        AboutToolsWorkersReturn: { screen: AboutToolsWorkersReturn },
        AboutToolsWorkersSearch: { screen: AboutToolsWorkersSearch },
        AboutToolsWorkersCreate: { screen: AboutToolsWorkersCreate },
        AboutToolsWorkersRead: { screen: AboutToolsWorkersRead },
        AboutToolsWorkersDelete: { screen: AboutToolsWorkersDelete },
        AboutWorkers: { screen: AboutWorkers },
        AboutWorkerSearch: { screen: AboutWorkerSearch },
        AboutWorkerCreate: { screen: AboutWorkerCreate },
        AboutWorkerRead: { screen: AboutWorkerRead },
        AboutWorkerUpdate: { screen: AboutWorkerUpdate },
        AboutWorkerDelete: { screen: AboutWorkerDelete },
        AboutSchedule: { screen: AboutSchedule },
        AboutScheduleCreate: { screen: AboutScheduleCreate },
        AboutScheduleRead: { screen: AboutScheduleRead },
        AboutScheduleUpdate: { screen: AboutScheduleUpdate },
        AboutScheduleDelete: { screen: AboutScheduleDelete },
        AboutAbsences: { screen: AboutAbsences },
        AboutAbsenceCreate: { screen: AboutAbsenceCreate },
        AboutAbsenceRead: { screen: AboutAbsenceRead },
        AboutAbsenceUpdate: { screen: AboutAbsenceUpdate },
        AboutAbsenceDelete: { screen: AboutAbsenceDelete },
        AboutSettings: { screen: AboutSettings },
        AboutAppIntro: { screen: AboutAppIntro },
        AboutAppChangeTheme: { screen: AboutAppChangeTheme },
        AboutAppImportData: { screen: AboutAppImportData },
        AboutAppExportData: { screen: AboutAppExportData },
        AboutAppUs: { screen: AboutAppUs },
        AboutAppContacts: { screen: AboutAppContacts },
        AboutAppVersion: { screen: AboutAppVersion }
    },
    {
        transitionConfig: () => fadeIn()
    }
);

const DrawerNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeView },
        Categories: { screen: CategoriesView },
        SubCategories: { screen: SubCategoriesView, navigationOptions: { drawerLabel: () => null } },
        Tools: { screen: ToolsView, navigationOptions: { drawerLabel: () => null } },
        ToolsWorkersView: { screen: ToolsWorkersView },
        Workers: { screen: WorkersView },
        Schedule: { screen: ScheduleView },
        Absences: { screen: AbsencesView },
        Settings: { screen: SettingsView },
        StackNavigator: { screen: StackNavigator, navigationOptions: { drawerLabel: () => null } }
    },
    {
        initialRouteName: 'Home',
        drawerOpenRoute: "DrawerOpen",
        drawerCloseRoute: "DrawerClose",
        drawerToggleRoute: "DrawerToggle",
        contentComponent: Navigation,
        contentOptions: {
            activeTintColor: 'transparent',
            activeBackgroundColor: '#2EBEE5',
            inactiveTintColor: 'transparent',
            inactiveBackgroundColor: 'transparent'
        },
        drawerType: 'front',
        statusBarAnimation: 'slide',
        minSwipeDistance: 5
    }
);

const AppContainer = createAppContainer(DrawerNavigator, StackNavigator);
const AppContainerWithTheme = withTheme(({ theme }) => {
    return <AppContainer screenProps={{ theme }} />;
});
