const header = document.querySelector('header'),
	title = document.createElement('h1');
title.innerText = 'Artist Search API';
header.appendChild(title);

const aside = document.querySelector('aside'),
	search = document.createElement('input');
search.type = 'search';
search.placeholder = 'search';
aside.appendChild(search);

const errorMessage = document.createElement('p'),
	section = document.querySelector('section');
errorMessage.classList.add('invisible');
errorMessage.innerText = 'Item Not Found';
section.appendChild(errorMessage);

const button = document.createElement('button');
button.innerHTML = 'Go';
aside.appendChild(button);

function generateMusic(ArtistName, genere) {
	const section = document.querySelector('section'),
		container = document.createElement('div');
	section.appendChild(container);

	const createList = document.createElement('ul');
	container.appendChild(createList);

	const artistName = document.createElement('li');
	artistName.innerHTML = `Artist name: ${ArtistName}`;
	createList.appendChild(artistName);

	const genereName = document.createElement('li');
	genereName.innerHTML = genere;
	createList.appendChild(genereName);
}

async function getData(searchURL) {
	const response = await axios.get(searchURL);
	return response.data;
}

function clearAllChildren() {
	const list = document.querySelectorAll('div');
	list.forEach((item) => {
		item.innerHTML = '';
	});
}

async function initArtists(searchURL) {
	button.addEventListener('click', searchArtist);
	async function searchArtist() {
		if (search.value !== '') {
			clearAllChildren();
			const searchItem = search.value;
			searchURL = `https://itunes.apple.com/search?entity=allArtist&attribute=allArtistTerm&term=${searchItem}`;
			const artists = await getData(searchURL);
			artists.results.forEach((artist) => {
				const ArtistName = artist.artistName,
					genere = artist.primaryGenreName;

				generateMusic(ArtistName, genere);
			});

			const artistsShown = document.querySelectorAll('li');
			if (artistsShown) {
				errorMessage.classList.add('invisible');
			}
		} else {
			clearAllChildren();
			errorMessage.classList.remove('invisible');
		}
	}
}

initArtists();
