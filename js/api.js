const base_url = 'https://api.football-data.org/v2/';
const API_KEY = '8a1dc169becf4d47be383afe3d7eecea';

const standings_epl = `${base_url}competitions/PL/standings?standingType=TOTAL`;
const match_epl = `${base_url}competitions/PL/matches`;

const fetchAPI = (url) => {
	return fetch(url, {
		headers: {
			'X-Auth-Token': API_KEY,
		},
	})
		.then((res) => {
			if (res.status !== 200) {
				console.log('Error: ' + res.status);
				return Promise.reject(new Error(res.statusText));
			} else {
				return Promise.resolve(res);
			}
		})
		.then((res) => res.json())
		.catch((err) => {
			console.log(err);
		});
};

// Klasemen
function getStanding() {
	if ('caches' in window) {
		caches.match(standings_epl).then(function (response) {
			if (response) {
				response.json().then(function (data) {
					console.log('Competition Data: ' + data);
					showStanding(data);
				});
			}
		});
	}

	fetchAPI(standings_epl)
		.then((data) => {
			showStanding(data);
		})
		.catch((error) => {
			console.log(error);
		});
}

// Jadwal
function getMatch() {
	if ('caches' in window) {
		caches.match(match_epl).then(function (response) {
			if (response) {
				response.json().then(function (data) {
					console.log('Match Data: ' + data);
					showMatch(data);
				});
			}
		});
	}

	fetchAPI(match_epl)
		.then((data) => {
			showMatch(data);
		})
		.catch((error) => {
			console.log(error);
		});
}

// Tim
function getTeam(id) {
	const url = `${base_url}teams/${id}`;

	if ('caches' in window) {
		caches.match(url).then(function (response) {
			if (response) {
				response.json().then(function (team) {
					console.log('Team Data: ' + team);
					showTeam(team);
				});
			}
		});
	}

	fetchAPI(url)
		.then((team) => {
			showTeam(team);
		})
		.catch((error) => {
			console.log(error);
		});
}
