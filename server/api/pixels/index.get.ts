import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    try {
        const referer = event.headers.get('Referer');
        if (!referer || !referer.includes(config.public.API_URL)) {
            return new Response('Unauthorized', {status: 401});
        }

        const pixels = await prisma.pixels.findMany({
            orderBy: {
                id: 'asc'
            }
        });

        return new Response(JSON.stringify(pixels), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
            statusText: 'OK',
        });
    } catch (e) {
        console.error(e);
        return new Response('Error', {status: 500});
    } finally {
        await prisma.$disconnect();
    }
});
