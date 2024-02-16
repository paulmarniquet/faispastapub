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
        for (let i = 0; i < 1000; i++) {
        const pixel = await prisma.pixels.create({
            data: {
                color: body.color,
                url: body.url,
            },
        });
        }
        return new Response(null, {status: 201, headers: {'Content-Type': 'application/json'}});
    } catch (e) {
        console.error(e);
        return new Response('Error', {status: 500});
    } finally {
        await prisma.$disconnect();
    }
});
