import Stripe from 'stripe';
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        const stripeEvent = await readBody<Stripe.Event>(event);
        if (stripeEvent.type === 'checkout.session.completed') {
            const stripeEventData = stripeEvent.data.object;
            if (typeof stripeEventData.client_reference_id === "string") {
                await prisma.payments.create({
                    data: {
                        payment: parseInt(stripeEventData.client_reference_id),
                    }
                });
            }
        }
        return new Response('OK', {status: 200});
    } catch (e) {
        console.error(e);
        return new Response('Error', {status: 500});
    } finally {
        await prisma.$disconnect();
    }
});
