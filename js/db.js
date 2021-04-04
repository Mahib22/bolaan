let dbPromise = idb.open('epl_db', 4, function (upgradeDB) {
	if (!upgradeDB.objectStoreNames.contains('teamFav')) {
		const teamStore = upgradeDB.createObjectStore('teamFav', {
			keyPath: 'id',
			autoIncrement: false,
		});
		teamStore.createIndex('id', 'id', {
			unique: true,
		});
	}
});


// Cread
function addTeamFav(data) {
	dbPromise.then((db) => {
		const tx = db.transaction('teamFav', 'readwrite');
		tx.objectStore('teamFav').put(data);
		return tx.complete;
	});
}


// READ 
function getTeamFav() {
	return dbPromise.then((db) => {
		const tx = db.transaction('teamFav', 'readonly');
		const store = tx.objectStore('teamFav');
		return store.getAll();
	});
}


// CHECK DATA 
function isFav(id) {
	return dbPromise.then(async (db) => {
		const tx = await db.transaction('teamFav', 'readonly');
		const data = await tx.objectStore('teamFav').get(id);
		return data == undefined ? false : true;
	});
}


// DELETE 
function deleteTeamFav(id) {
	dbPromise.then((db) => {
		const tx = db.transaction('teamFav', 'readwrite');
		tx.objectStore('teamFav').delete(id);
		return tx.complete;
	});
}
