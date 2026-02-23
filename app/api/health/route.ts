import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    status: 'ok',
    app: 'FORMA',
    version: '1.0.0',
    description: 'Privacy-First Image & PDF Tools',
    processing: 'client-side-only',
    dataTransmitted: '0KB',
  })
}
