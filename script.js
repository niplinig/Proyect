const select = document.querySelector("select");
const div_canvas = document.getElementById("Chart");
const img = document.getElementById("poke_pic")
const ul = document.getElementById("poke_info");
const url = "https://pokeapi.co/api/v2/pokemon/";

document.body.onload = async () => {
	const pokemon_name = select.options[select.selectedIndex].value;
	const response = await fetch(url + pokemon_name);
	const pokemon = await response.json();
	//const name = pokemon.name[0].toUpperCase() + pokemon.name.substring(1);
	//select.innerHTML += `<option>${name}</option>`
	loadChart(pokemon);
}

function loadChart(pokemon) {
	ul.innerHTML = "";

	ul.innerHTML += `<li class="list-group-item"> weight ${pokemon.weight}</li>`;
	ul.innerHTML += `<li class="list-group-item"> height ${pokemon.height}</li>`;

	if (pokemon.types.lenght > 1) {
		for (let i = 0; i < pokemon.types.length; i++) {
			ul.innerHTML += `<li class="list-group-item"> type ${pokemon.types[i].type.name}</li>`;
		}
	}
	else {
		ul.innerHTML += `<li class="list-group-item"> type ${pokemon.types[0].type.name}</li>`
	}

	if (pokemon.abilities.lenght > 1) {
		for (let i = 0; i < pokemon.types.length; i++) {
			ul.innerHTML += `<li class="list-group-item"> abilitie ${pokemon.abilities[i].ability.name}</li>`;
		}
	}
	else {
		ul.innerHTML += `<li class="list-group-item"> ability ${pokemon.abilities[0].ability.name}</li>`
	}


	img.setAttribute("src", pokemon.sprites.other.home.front_default);

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

select.addEventListener("change", async () => {
	const pokemon_name = select.options[select.selectedIndex].value;
	const response = await fetch(url + pokemon_name);
	const pokemon = await response.json();

	loadChart(pokemon);
})