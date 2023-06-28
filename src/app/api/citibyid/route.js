import { NextResponse } from 'next/server'
import cities from '@/lib/city.list.json'
export async function GET(req) {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        let citi 
        for(let x of cities)
        {
            if (x.id==id)
            {
                citi = x;
                break;
            }
        }
        
    return NextResponse.json(citi)

}