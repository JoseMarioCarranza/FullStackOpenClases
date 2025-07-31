var orders = [
    { amount: 250 },
    { amount: 400 },
    { amount: 100 },
    { amount: 325 }
]

/*
var total = 0;
for (let i = 0; i < orders.length; i++) {
    total = orders[i].amount + total
}
*/

var total = orders.reduce((t, o) => t + o.amount, 0)

console.log(total);