import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {

    const config = useRuntimeConfig;
    try {
        const pixels = await prisma.pixels.findMany({
            orderBy: {
                id: 'asc'
            }
        });
        return new Response(JSON.stringify(pixels), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            }
        });
    } catch (e) {
        console.error(e);
        return new Response('Error', {status: 500});
    } finally {
        await prisma.$disconnect();
    }
});
