import { openDatabase } from 'react-native-sqlite-storage';
const db = openDatabase({ name: 'database.db', createFromLocation: '~database.db' });

export default db;