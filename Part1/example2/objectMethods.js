const arto = {
    name: 'Arto Hellas',
    age: 35,
    education: 'PhD',
    greet: function () {
        console.log('Hello, my name is ' + this.name);
    },
    doAddition: function (a, b) {
        console.log(a + b);
    }
}

arto.greet()

setTimeout(arto.greet.bind(arto), 1000)