import {PrismaClient} from '@prisma/client';

export default defineEventHandler(async (event) => {
    const prisma = new PrismaClient();

    try {
        const pixels = await prisma.pixels.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        return new Response(JSON.stringify(pixels), {
            status: 200,
            headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}
        });
    } catch (e) {
        console.error(e);
        return new Response('Error', {status: 500, headers: {'Access-Control-Allow-Origin': '*'}});
    } finally {
        await prisma.$disconnect();
    }
});
