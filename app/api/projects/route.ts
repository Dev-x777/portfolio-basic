import { NextResponse } from 'next/server';
import { getDynamicProjects } from '@/lib/github';

export async function GET() {
  try {
    const data = await getDynamicProjects();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
      },
    });
  } catch (error) {
    console.error('API /api/projects error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub projects' },
      { status: 500 }
    );
  }
}
