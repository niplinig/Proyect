const title = document.getElementById("poke_title")
const select = document.querySelector("select");
const chart_css = document.getElementById("ChartCSS");
const div_canvas = document.getElementById("ChartJS");
const div_image = document.getElementById("poke_img")
const ul = document.getElementById("poke_info");
const h1 = document.getElementById("poke_name");
const table_moves = document.getElementById("poke_moves");
const url = "https://pokeapi.co/api/v2/pokemon/";

document.body.onload = async () => {
	const pokemon_name = select.options[select.selectedIndex].value;
	const response = await fetch(url + pokemon_name);
	const pokemon = await response.json();
	loadPokemonName(pokemon);
	loadPokemonInfo(pokemon);
	loadPokemonMoves(pokemon);
	loadPokemonImages(pokemon);
	loadPokemonStats(pokemon);
	loadChartCSS(pokemon);
};

select.addEventListener("change", async () => {
	const pokemon_name = select.options[select.selectedIndex].value;
	const response = await fetch(url + pokemon_name);
	const pokemon = await response.json();
	loadPokemonName(pokemon);
	loadPokemonInfo(pokemon);
	loadPokemonMoves(pokemon);
	loadPokemonImages(pokemon);
	loadPokemonStats(pokemon);
	loadChartCSS(pokemon);
});

function loadPokemonName(pokemon) {
	const name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
	h1.textContent = name + " # " + pokemon.id;
}

function loadPokemonInfo(pokemon) {
	ul.innerHTML = `<li class="list-group-item"> weight : ${pokemon.weight}</li>`;
	ul.innerHTML += `<li class="list-group-item"> height : ${pokemon.height}</li>`;
	for (let i = 0; i < pokemon.types.length; i++) {
		ul.innerHTML += `<li class="list-group-item"> type : ${pokemon.types[i].type.name}</li>`;
	}
	for (let i = 0; i < pokemon.types.length; i++) {
		ul.innerHTML += `<li class="list-group-item"> abilitie : ${pokemon.abilities[i].ability.name}</li>`;
	}
}

function loadPokemonMoves(pokemon) {
	table_moves.innerHTML = "";
	for (let i = 0; i < pokemon.moves.length; i++) {
		let level_learned = pokemon.moves[i].version_group_details.pop().level_learned_at;
		if (level_learned == 0)
			continue;
		let move_name = pokemon.moves[i].move.name;
		table_moves.innerHTML += `<tr><td>${level_learned}</td><td>${move_name}</td></tr>`;
	}
}

function loadPokemonImages(pokemon) {

	div_image.innerHTML = `
	<div class="carousel-item active">
		<img src="${pokemon.sprites.other.home.front_default}" class="d-block w-100" alt="${pokemon.sprites.other.home.front_default}">
	</div>`;

	div_image.innerHTML += `
	<div class="carousel-item active">
		<img src="${pokemon.sprites.other.home.front_shiny}" class="d-block w-100" alt="${pokemon.sprites.other.home.front_shiny}">
	</div>`;
}

function loadChartCSS(pokemon) {
	chart_css.innerHTML = "";
	for (let i = 0; i < pokemon.stats.length; i++) {
		
		chart_css.innerHTML += `<tr scope="row">
			<th scope="row">${pokemon.stats[i].stat.name}</th>
			<td style="--size: calc(${pokemon.stats[i].base_stat}/150)">${pokemon.stats[i].base_stat}</td>
		</tr>`;
	}
};

function loadPokemonStats(pokemon) {
	const labels = [
		pokemon.stats[0].stat.name.toUpperCase(),
		pokemon.stats[1].stat.name.toUpperCase(),
		pokemon.stats[2].stat.name.toUpperCase(),
		pokemon.stats[3].stat.name.toUpperCase(),
		pokemon.stats[4].stat.name.toUpperCase(),
		pokemon.stats[5].stat.name.toUpperCase(),
	];
	const data = {
		labels: labels,
		datasets: [{
			label: pokemon.name,
			data: [
				pokemon.stats[0].base_stat,
				pokemon.stats[1].base_stat,
				pokemon.stats[2].base_stat,
				pokemon.stats[3].base_stat,
				pokemon.stats[4].base_stat,
				pokemon.stats[5].base_stat
			],
			backgroundColor: 'rgba(255, 99, 132, 0.2)',
			borderColor: 'rgb(255, 99, 132)',
			pointBackgroundColor: 'rgb(255, 99, 132)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgb(255, 99, 132)'
		}]
	};
	const config = {
		type: 'radar',
		data: data,
		options: {
			elements: {
				line: {
					borderWidth: 3
				}
			}
		}
	};
	const newCanvas = document.createElement("canvas");
	newCanvas.id = "myChart";
	const myChart = new Chart(newCanvas, config);
	div_canvas.replaceChild(newCanvas, document.getElementById('myChart'));
};