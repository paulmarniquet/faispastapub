import Stripe from 'stripe';
import {PrismaClient} from "@prisma/client";

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();
    try {
        const stripeEvent = await readBody<Stripe.Event>(event);
        if (stripeEvent.type === 'checkout.session.completed') {
            const stripeEventData = stripeEvent.data.object;
            console.log(stripeEventData.client_reference_id);
            prisma.payments.create({
                data: {
                    payment: stripeEventData.client_reference_id,
                },
            });
        }
        return new Response('OK', {status: 200});
    } catch (e) {
        console.error(e);
        return new Response('Error', {status: 500});
    }
});