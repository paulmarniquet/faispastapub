import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    try {
        const body = await readBody(event);
        const pixel = await prisma.pixels.create({
            data: {
                color: body.color,
                url: body.url,
            },
        });
        return new Response(JSON.stringify(pixel), {status: 201, headers: {'Content-Type': 'application/json'}});
    } catch (e) {
        console.error(e);
        return new Response('Error', {status: 500});
    } finally {
        await prisma.$disconnect();
    }
});
