/* Here We Import And Export Our Components */

/* Visible */
import HomeView from '@app/views/Home/HomeView';
import CategoriesView from '@app/views/Categories/CategoriesView';
import SubCategoriesView from '@app/views/SubCategories/SubCategoriesView';
import ToolsView from '@app/views/Tools/ToolsView';
import ToolsWorkersView from '@app/views/ToolsWorkers/ToolsWorkersView';
import WorkersView from '@app/views/Workers/WorkersView';
import ScheduleView from '@app/views/Schedules/ScheduleView';
import AbsencesView from '@app/views/Аbsences/АbsencesView';
import SettingsView from '@app/views/Settings/SettingsView';
/* /Visible/ */

/* Invisible */

/* Categories */
import createCategory from '@app/views/Category/createCategory';
import updateCategory from '@app/views/Category/updateCategory';
import deleteCategory from '@app/views/Category/deleteCategory';
import searchCategory from '@app/views/Category/searchCategory';
/* /Categories/ */

/* SubCategories */
import createSubCategory from '@app/views/SubCategory/createSubCategory';
import updateSubCategory from '@app/views/SubCategory/updateSubCategory';
import deleteSubCategory from '@app/views/SubCategory/deleteSubCategory';
import searchSubCategory from '@app/views/SubCategory/searchSubCategory';
/* /SubCategories/ */

/* Tools */
import createTool from '@app/views/Tool/createTool';
import readTool from '@app/views/Tool/readTool';
import updateTool from '@app/views/Tool/updateTool';
import deleteTool from '@app/views/Tool/deleteTool';
import searchTool from '@app/views/Tool/searchTool';
/* /Tools/ */

/* Tools in Workers */
import createToolWorker from '@app/views/ToolWorker/createToolWorker';
import readToolWorker from '@app/views/ToolWorker/readToolWorker';
import returnToolWorker from '@app/views/ToolWorker/returnToolWorker';
import deleteToolWorker from '@app/views/ToolWorker/deleteToolWorker';
import searchToolWorker from '@app/views/ToolWorker/searchToolWorker';
/* /Tools in Workers/ */

/* Workers */
import createWorker from '@app/views/Worker/createWorker';
import readWorker from '@app/views/Worker/readWorker';
import updateWorker from '@app/views/Worker/updateWorker';
import deleteWorker from '@app/views/Worker/deleteWorker';
import searchWorker from '@app/views/Worker/searchWorker';
/* /Workers/ */

/* Schedule */
import createSchedule from '@app/views/Schedule/createSchedule';
import readSchedule from '@app/views/Schedule/readSchedule';
import updateSchedule from '@app/views/Schedule/updateSchedule';
import deleteSchedule from '@app/views/Schedule/deleteSchedule';
/* /Schedule/ */

/* Absence */
import createAbsence from '@app/views/Absence/createAbsence';
import readAbsence from '@app/views/Absence/readAbsence';
import updateAbsence from '@app/views/Absence/updateAbsence';
import deleteAbsence from '@app/views/Absence/deleteAbsence';
/* /Absence/ */

/* Settings */
import ChangeTheme from '@app/views/Settings/ChangeTheme';
import AboutUs from '@app/views/Settings/AboutUs';
import AppIntro from '@app/views/Settings/AppIntro';
import AppVersion from '@app/views/Settings/AppVersion';
import ImportData from '@app/views/Settings/ImportData';
import ExportData from '@app/views/Settings/ExportData';
/* /Settings */

/* About */
import AboutApp from '@app/views/About/AboutApp';
import AboutHome from '@app/views/About/AboutHome/AboutHome';
import AboutCategories from '@app/views/About/AboutCategories/AboutCategories';
import AboutCategorySearch from '@app/views/About/AboutCategories/AboutCategorySearch';
import AboutCategoryCreate from '@app/views/About/AboutCategories/AboutCategoryCreate';
import AboutCategoryUpdate from '@app/views/About/AboutCategories/AboutCategoryUpdate';
import AboutCategoryDelete from '@app/views/About/AboutCategories/AboutCategoryDelete';
import AboutSubCategories from '@app/views/About/AboutSubCategories/AboutSubCategories';
import AboutSubCategorySearch from '@app/views/About/AboutSubCategories/AboutSubCategorySearch';
import AboutSubCategoryCreate from '@app/views/About/AboutSubCategories/AboutSubCategoryCreate';
import AboutSubCategoryUpdate from '@app/views/About/AboutSubCategories/AboutSubCategoryUpdate';
import AboutSubCategoryDelete from '@app/views/About/AboutSubCategories/AboutSubCategoryDelete';
import AboutTools from '@app/views/About/AboutTools/AboutTools';
import AboutToolSearch from '@app/views/About/AboutTools/AboutToolSearch';
import AboutToolCreate from '@app/views/About/AboutTools/AboutToolCreate';
import AboutToolRead from '@app/views/About/AboutTools/AboutToolRead';
import AboutToolUpdate from '@app/views/About/AboutTools/AboutToolUpdate';
import AboutToolDelete from '@app/views/About/AboutTools/AboutToolDelete';
import AboutToolsWorkers from '@app/views/About/AboutToolsWorkers/AboutToolsWorkers';
import AboutToolsWorkersReturn from '@app/views/About/AboutToolsWorkers/AboutToolsWorkersReturn';
import AboutToolsWorkersSearch from '@app/views/About/AboutToolsWorkers/AboutToolsWorkersSearch';
import AboutToolsWorkersCreate from '@app/views/About/AboutToolsWorkers/AboutToolsWorkersCreate';
import AboutToolsWorkersRead from '@app/views/About/AboutToolsWorkers/AboutToolsWorkersRead';
import AboutToolsWorkersDelete from '@app/views/About/AboutToolsWorkers/AboutToolsWorkersDelete';
import AboutWorkers from '@app/views/About/AboutWorkers/AboutWorkers';
import AboutWorkerSearch from '@app/views/About/AboutWorkers/AboutWorkerSearch';
import AboutWorkerCreate from '@app/views/About/AboutWorkers/AboutWorkerCreate';
import AboutWorkerRead from '@app/views/About/AboutWorkers/AboutWorkerRead';
import AboutWorkerUpdate from '@app/views/About/AboutWorkers/AboutWorkerUpdate';
import AboutWorkerDelete from '@app/views/About/AboutWorkers/AboutWorkerDelete';
import AboutSchedule from '@app/views/About/AboutSchedule/AboutSchedule';
import AboutScheduleCreate from '@app/views/About/AboutSchedule/AboutScheduleCreate';
import AboutScheduleRead from '@app/views/About/AboutSchedule/AboutScheduleRead';
import AboutScheduleUpdate from '@app/views/About/AboutSchedule/AboutScheduleUpdate';
import AboutScheduleDelete from '@app/views/About/AboutSchedule/AboutScheduleDelete';
import AboutAbsences from '@app/views/About/AboutAbsences/AboutAbsences';
import AboutAbsenceCreate from '@app/views/About/AboutAbsences/AboutAbsenceCreate';
import AboutAbsenceRead from '@app/views/About/AboutAbsences/AboutAbsenceRead';
import AboutAbsenceUpdate from '@app/views/About/AboutAbsences/AboutAbsenceUpdate';
import AboutAbsenceDelete from '@app/views/About/AboutAbsences/AboutAbsenceDelete';
import AboutSettings from '@app/views/About/AboutSettings/AboutSettings';
import AboutAppIntro from '@app/views/About/AboutSettings/AboutAppIntro';
import AboutAppChangeTheme from '@app/views/About/AboutSettings/AboutAppChangeTheme';
import AboutAppImportData from '@app/views/About/AboutSettings/AboutAppImportData';
import AboutAppExportData from '@app/views/About/AboutSettings/AboutAppExportData';
import AboutAppUs from '@app/views/About/AboutSettings/AboutAppUs';
import AboutAppContacts from '@app/views/About/AboutSettings/AboutAppContacts';
import AboutAppVersion from '@app/views/About/AboutSettings/AboutAppVersion';
/* /About/ */

/* /Invisible/ */

export {
    HomeView,
    CategoriesView,
    SubCategoriesView,
    ToolsView,
    ToolsWorkersView,
    WorkersView,
    ScheduleView,
    AbsencesView,
    SettingsView,
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
    deleteToolWorker,
    returnToolWorker,
    searchToolWorker,
    createWorker,
    readWorker,
    updateWorker,
    deleteWorker,
    searchWorker,
    createSchedule,
    readSchedule,
    updateSchedule,
    deleteSchedule,
    createAbsence,
    readAbsence,
    updateAbsence,
    deleteAbsence,
    AppIntro,
    ChangeTheme,
    ImportData,
    ExportData,
    AboutUs,
    AppVersion,
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
};

/* /Here We Import And Export Our Components/ */
