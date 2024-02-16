import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
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
