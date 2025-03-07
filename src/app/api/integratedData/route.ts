import { fetchData } from '../../lib/mergedData';

export async function GET() {
    const mergedData = await fetchData();

    return new Response(JSON.stringify(mergedData), {
        headers: { 'Content-Type': 'application/json' }
    });
}
