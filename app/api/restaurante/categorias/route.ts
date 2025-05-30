import { NextResponse } from 'next/server';
import { getConnection } from '@/lib/db';

export async function GET() {
  const conn = await getConnection();

  try {
    const [rows] = await conn.execute('SELECT * FROM tblproduct_categories');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Erro ao buscar suítes:', error);
    return NextResponse.json({ error: 'Erro ao buscar suítes' }, { status: 500 });
  } finally {
    await conn.end();
  }
}
