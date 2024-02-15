/*
import Stripe from 'stripe';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const stripe = new Stripe(config.STRIPE_SECRET_KEY);

    const session = async () => {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'T-shirt',
                        },
                        unit_amount: 2000,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.BASE_URL}/success`,
            cancel_url: `${process.env.BASE_URL}/cancel`,
        });

        return {
            statusCode: 200,
            body: JSON.stringify({
                sessionId: session.id,
            }),
        };
    }
});
*/
