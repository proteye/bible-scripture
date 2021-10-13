import sqlite3 from 'sqlite3'

const isProd: boolean = process.env.NODE_ENV === 'production'

export default isProd ? sqlite3 : sqlite3.verbose()
