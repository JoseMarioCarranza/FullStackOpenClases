var animals = [
    { name: 'Fluffykins', species: 'rabbit' },
    { name: 'Caro', species: 'dog' },
    { name: 'Hamilton', species: 'dog' },
    { name: 'Harold', species: 'fish' },
    { name: 'Ursula', species: 'cat' },
    { name: 'Jimmy', species: 'fish' }
]

/*
var dogs = []
for (let index = 0; index < animals.length; index++) {
    if (animals[index].species === 'dog') {
        dogs.push(animals[index])
    }
}
*/

var dogs = animals.filter(a => a.species === 'dog')

console.log(dogs)