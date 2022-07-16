const dbQueries = {
  modules: {
    db: 'modules',
    modules: {
      create:
        'CREATE TABLE IF NOT EXISTS modules (name TEXT NOT NULL, type TEXT NOT NULL, lang TEXT, description TEXT, filename TEXT, last_modified TIMESTAMP, size INTEGER, created_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL, updated_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL, PRIMARY KEY (name, type))',
      insert:
        'INSERT INTO modules(name, type, lang, description, filename, last_modified, size) VALUES (?, ?, ?, ?, ?, ?, ?) ON CONFLICT(name, type) DO UPDATE SET (lang, description, filename, last_modified, size, updated_at)=(excluded.lang, excluded.description, excluded.filename, excluded.last_modified, excluded.size, CURRENT_TIMESTAMP) WHERE last_modified != excluded.last_modified',
    },
  },
  dictionariesLookup: {
    db: 'dictionaries_lookup',
    dictionaries: {
      create:
        'CREATE TABLE IF NOT EXISTS dictionaries (id INTEGER PRIMARY KEY, name TEXT NOT NULL, type TEXT NOT NULL, lang TEXT, matching_type INTEGER, dictionary_rows INTEGER, words_rows INTEGER, last_modified TIMESTAMP, is_changed INTEGER, is_indexed_successfully INTEGER, created_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL, updated_at TIMESTAMP default CURRENT_TIMESTAMP NOT NULL, UNIQUE(name, type))',
      insert:
        'INSERT INTO dictionaries(name, type, lang, matching_type, dictionary_rows, words_rows, last_modified, is_changed, is_indexed_successfully) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?) ON CONFLICT(name, type) DO UPDATE SET (dictionary_rows, words_rows, last_modified, is_changed, is_indexed_successfully, updated_at)=(excluded.dictionary_rows, excluded.words_rows, excluded.last_modified, 1, 0, CURRENT_TIMESTAMP) WHERE last_modified != excluded.last_modified',
    },
  },
}

export default dbQueries
