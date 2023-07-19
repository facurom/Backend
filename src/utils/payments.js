const Stripe = require('stripe')

class PaymentService {
    constructor(){
        this.stripe = Stripe(process.env.STRIPE_SECRET_KEY)
    }

    async createPaymentIntent(data){
        const paymentIntent = await this.stripe.paymentIntents.create(data)
        return paymentIntent
    }
}

module.exports = PaymentService