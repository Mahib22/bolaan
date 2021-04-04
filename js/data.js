// menampilkan standing
function showStanding(data) {
	let standings = '';
	const standingElement = document.getElementById('klasemen');

	// looping data
	data.standings.forEach(standing => {
		standings += `
            <table class="highlight">
            <tr>
                <th></th>
                <th>Klub</th>
                <th>Main</th>
                <th>M</th>
                <th>S</th>
                <th>K</th>
                <th>P</th>
            </tr>
        `;
        standing.table.forEach(table => {
            standings += `
              <tr>
                  <td><img src="${table.team.crestUrl.replace(/^http:\/\//i, 'https://')}" width="30px" alt="img"/></td>
                  <td><a class="linked" href="#team?id=${table.team.id}">${table.team.name}</a></td>
                  <td>${table.playedGames}</td>
                  <td>${table.won}</td>
                  <td>${table.draw}</td>
                  <td>${table.lost}</td>
                  <td>${table.points}</td>
              </tr>
            
            `;
	});
    standings += ` </table>`;
    standingElement.innerHTML = standings;
	});
	
    document.querySelectorAll('.linked').forEach(function (lnk) {
		lnk.addEventListener('click', function (event) {
			urlTeamParam = event.target.getAttribute('href').substr(9);
			loadPage();
		});
	});
}


// menampilkan match
function showMatch(data) {
	let matches = '';
	const matchElement = document.getElementById('match');

	// looping data
	data.matches.forEach(match => {
        matches += `
            <div class="col s6 card-panel">
				<p><center>Matchday ${match.matchday} | ${match.utcDate.substring(0,10)}</center></p>
				<p><center>${match.status}</center></p>
                <p><center>${match.homeTeam.name} (${match.score.fullTime.homeTeam == null ? '-' : match.score.fullTime.homeTeam}) vs (${match.score.fullTime.awayTeam == null ? '-' : match.score.fullTime.awayTeam}) ${match.awayTeam.name}</center></p>
            </div>
        `;
    
    matchElement.innerHTML = matches;
    })
}


// menampilkan tim
function showTeam(team) {
	const teamx = document.getElementById('teams');
	let pemain = '';

	// Looping data 
	team.squad.forEach((pemainx) => {
		pemain += `
		<ul class="collapsible">
			<li>
				<div class="collapsible-header"> > ${pemainx.name}</div>
					<div class="collapsible-body">
						<ul class="collection">
							<li class="collection-item">Posisi : ${pemainx.position == null ? '-' : pemainx.position}</li>
							<li class="collection-item">Negara Kelahiran : ${pemainx.countryOfBirth}</li>
							<li class="collection-item">Kebangsaan : ${pemainx.nationality}</li>
							<li class="collection-item">Nomor Pakaian : ${pemainx.shirtNumber == null ? '-' : pemainx.shirtNumber}</li>
							<li class="collection-item">Sebagai : ${pemainx.role}</li>
						</ul>
					</div>
				</div>
			</li>
		</ul>
	  `;
	});

	teamx.innerHTML = `
	<div class="card">
	  <div class="card-image">
		<img class="img-tim" src="${team.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="img">
		<a class="btn-floating btn-large halfway-fab waves-effect waves-light red" id="simpan" href=${team.id}><i class="material-icons" id="ikonx">star</i></a>
        <hr>
        </div>
      <div class="card-content">
        <center><span class="card-title">${team.name}</span></center>
	  </div>
	</div>

	<ul class="collapsible">
		<li>
			<div class="collapsible-header"> > Informasi Tim</div>
				<div class="collapsible-body">
					<ul class="collection">
						<li class="collection-item">Didirikan pada tahun : ${team.founded}</li>
						<li class="collection-item">Stadion kebanggan : ${team.venue}</li>
						<li class="collection-item">Warna khas : ${team.clubColors}</li>
						<li class="collection-item">Alamat : ${team.address}</li>
						<li class="collection-item">No. Telp : ${team.phone}</li>
						<li class="collection-item">Website : ${team.website == null ? '-' : team.website}</li>
						<li class="collection-item">Email : ${team.email == null ? '-' : team.email}</li>
					</ul>
				</div>
			</div>
		</li>
	</ul>
	
	<div class="card blue-grey darken-1">
        <div class="card-content lime white-text">
          <center><span class="card-title">Daftar Pemain</span></center>
        </div>
    </div>
	${pemain}
	`;


	const ikonxx = document.getElementById('ikonx');
	async function dataxx() {
		if (await isFav(parseInt(window.location.hash.substr(9)))) {
			ikonxx.innerHTML = 'delete';
		}
	}
	dataxx();


	$('.collapsible').collapsible();
	$('#simpan').on('click', async (e) => {
		e.preventDefault();
		const teamId = parseInt(e.currentTarget.getAttribute('href'));

		if (await isFav(teamId)) {
			deleteTeamFav(teamId);
			ikonxx.innerHTML = 'star';
			M.toast({ html: `${team.name} Telah Dihapus Dari Tim Favorit` });
		} else {
			M.toast({ html: `${team.name} Telah Ditambahkan Ke Tim Favorit` });
			ikonxx.innerHTML = 'delete';
			addTeamFav(team);
		}
	});
}


// menampilkan team favorite
function showFavTeam() {
	getTeamFav().then((favs) => {
		let data = '';
		let datas = '';

		// looping data dari db
		favs.forEach((favs) => {
			datas += `
			<div class="card">
	  			<div class="card-image">
					<img class="img-tim" src="${favs.crestUrl.replace(/^http:\/\//i, 'https://')}" alt="logo"/>
				</div>
      			<div class="card-content">
					<center><span class="card-title"><a class="simpanan" href="#team?id=${favs.id}">${favs.name}</a></span></center> 
			</div></div>
			`;
		});

		data += `
			<div class="card">
      			<div class="card-content">
    			<span class="black-text"><h6><center>${datas === '' ? 'Tidak Ada Tim Favorit' : datas}</center></h6></span>
			</div></div>
			`;

		document.getElementById('teamSaved').innerHTML = data;
		document.querySelectorAll('.simpanan').forEach(function (lnk) {
			lnk.addEventListener('click', function (event) {
				urlTeamParam = event.target.getAttribute('href').substr(9);
				loadPage();
			});
		});
	});
}
