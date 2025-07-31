var animals = [
    { name: 'Fluffykins', species: 'rabbit' },
    { name: 'Caro', species: 'dog' },
    { name: 'Hamilton', species: 'dog' },
    { name: 'Harold', species: 'fish' },
    { name: 'Ursula', species: 'cat' },
    { name: 'Jimmy', species: 'fish' }
]

/*
var names = []
for (let i = 0; i < animals.length; i++) {
    names.push(animals[i].name)
}
*/

var names = animals.map(a => a.name)

console.log(names);