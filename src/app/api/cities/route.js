import { NextResponse } from 'next/server'
import cities from '@/lib/city.list.json'
export async function GET(req) {
        
        
    return NextResponse.json({ city: cities })

}