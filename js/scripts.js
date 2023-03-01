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
errorMessage.style.cssText = 'display: none';
errorMessage.innerText = 'Item Not Found';
section.appendChild(errorMessage);

const button = document.createElement('button');
button.innerHTML = 'Go';
aside.appendChild(button);

function generateMusic(getArtist, getGenere) {
	const section = document.querySelector('section'),
		container = document.createElement('div');
	section.appendChild(container);

	const createList = document.createElement('ul');
	container.appendChild(createList);

	const artistName = document.createElement('li');
	artistName.innerHTML = `Artist name: ${getArtist}`;
	createList.appendChild(artistName);

	const genereName = document.createElement('li');
	genereName.innerHTML = getGenere;
	createList.appendChild(genereName);
}

async function getData(searchURL) {
	const response = await axios.get(searchURL),
		showError = document.querySelector('p');
	response.data.results.length == 0
		? (showError.style.display = 'block')
		: (showError.style.display = 'none');
	clearAllChildren();
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
				const getArtist = artist.artistName,
					getGenere = artist.primaryGenreName,
					genereList = document.querySelectorAll('li:nth-child(2)');
				for (let i = 0; i < genereList.length; i++) {
					if (genereList[i].innerText == 'undefined') {
						genereList[i].innerText = 'No Genere';
					}
				}
				generateMusic(getArtist, getGenere);
			});
			const artistsShown = document.querySelectorAll('li');
			if (artistsShown) {
				errorMessage.classList.add('invisible');
			}
		} else {
			errorMessage.style.cssText = 'display: block';
			clearAllChildren();
		}
	}
}

initArtists();
