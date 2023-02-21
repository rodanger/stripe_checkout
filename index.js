// 1. IMPORT 
const express = require('express')
const app = express()
require("dotenv").config()
const stripe = require("stripe")(process.env.STRIPE_KEY)
const cors = require("cors")


// 2. MIDDLEWARE
app.use(express.json({extended: true}))

app.use(cors())

// 3. ROUTING
app.get("/", async (request, response) => {
    

    const productId = "price_1MdkvDDgcQtx6EHYpLuqAJgE"

    const session = await stripe.checkout.sessions.create({

        // PRODUCTS LINE 
        line_items: [
            { // 1. PRODUCT
                price:productId,
                quantity: 1
            
            }],
            payment_method_types: [ // 2. Payment method
                "card",
                "alipay",
            ], 
            mode: "payment", // 3. Payment type
            success_url: `http://localhost:3000/success`,
            cancel_url: `http://localhost:3000/cancelled=true`

    })

    //console.log(session)


    response.json({
        stripe_info: session
    })
    
})


// 4. SERVER //. Enviroment variable
app.listen(process.env.PORT, () => {
    console.log("Server running on http://127.0.0.1:3000/")
})


