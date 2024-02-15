import {PrismaClient} from '@prisma/client';

export default defineEventHandler(async (event) => {
        const prisma = new PrismaClient();
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
