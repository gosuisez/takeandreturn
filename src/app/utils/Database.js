/* Imports */
import { openDatabase } from 'react-native-sqlite-storage';
/* /Imports/ */

const db = openDatabase({ name: 'database.db', createFromLocation: '~database.db' });

/* Exports */
export default db;
/* /Exports/ */
