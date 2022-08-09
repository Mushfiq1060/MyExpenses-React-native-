
import * as SQLite from 'expo-sqlite'

export const DatabaseConnection = {
    getPendingConnection: () => SQLite.openDatabase("db.db"),
}