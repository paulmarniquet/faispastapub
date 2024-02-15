import {PrismaClient} from '@prisma/client';

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();

    try {
        /*        const body = await readBody(event);
                const payment = await prisma.payments.findUnique({
                    where: {
                        id: body.paymentId,
                    },
                });

                if (!payment) {
                    return new Response('Payment not found', { status: 404 });
                }
                return new Response(JSON.stringify(payment), { status: 200, headers: { 'Content-Type': 'application/json' } });*/
    } catch (e) {
        console.error(e);
        return new Response('Error', {status: 500});
    } finally {
        await prisma.$disconnect();
    }
});
