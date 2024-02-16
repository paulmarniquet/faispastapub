import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    try {
        const referer = event.headers.get('Referer');
        if (!referer || !referer.includes(config.public.API_URL)) {
            return new Response('Unauthorized', {status: 401});
        }
        const body = await readBody(event);
        const payment = await prisma.payments.findFirst({
            where: {
                payment: parseInt(body.pid),
            },
        });
        if (!payment) {
            return new Response('Payment not found', {status: 404});
        }

        // Delete the payment from the database if it exists
        if (payment) {
            const idPayment = JSON.stringify(payment.id);
            await prisma.payments.delete({
                where: {
                    id: parseInt(idPayment),
                },
            });
        }
        return new Response("OK", {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (e) {
        console.error(e);
        return new Response('Error', {status: 500});
    } finally {
        await prisma.$disconnect();
    }
});
