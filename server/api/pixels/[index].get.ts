import {PrismaClient} from '@prisma/client';

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();

    try {
        const pixel = await prisma.pixels.findUnique({
            where: {
                id: parseInt(event.context.params!.index),
            },
        });
        if (!pixel) {
            return new Response('Pixel not found', {status: 404});
        }
        return new Response(JSON.stringify(pixel), {status: 200, headers: {'Content-Type': 'application/json'}});
    } catch (e) {
        console.error(e);
        return new Response('Error', {status: 500});
    } finally {
        await prisma.$disconnect();
    }
});
