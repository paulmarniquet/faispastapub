import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const referer = event.headers.get('Referer');
    if (!referer || !referer.includes(config.public.API_URL)) {
        return new Response('Unauthorized', {status: 401});
    }

        const body = await readBody(event);
        for (const pixel of body) {
            const updatedPixel = await prisma.pixels.update({
                where: {
                    id: parseInt(pixel.id),
                },
                data: {
                    color: pixel.color,
                    url: pixel.url,
                },
            });
        }
        return new Response("Pixels updated !", {status: 200, headers: {'Content-Type': 'application/json'}});
    }
);
