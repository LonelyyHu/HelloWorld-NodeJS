// test
// test2
// test3

const express = require('express')
const app = express()
const stripe = require("stripe")("sk_test_Ng7u88sF7itap0aIDhjR3plp")

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.post('/card/:cardToken', async (req, res) => {

    const customer = await stripe.customers.create({
        source: req.params.cardToken,
        email: 'paying.user@example.com'
    })

    console.log(customer)

    res.send('success!')
})

app.post('/customer/:customerId/addCard/:cardToken', async (req, res) => {

    const { customerId, cardToken } = req.params

    const newCard = await stripe.customers.createSource(
        customerId,
        { source: cardToken }
    )

    console.log(newCard)

    res.send('success!')
})

app.get('/customer/:customerId/cards', async (req, res) => {

    const { customerId } = req.params

    const cardList = await stripe.customers.listCards(customerId)

    console.log(cardList)

    res.send('success!')
})

app.listen(8000, function () {
  console.log('Example app listening on port 8000!')
})
