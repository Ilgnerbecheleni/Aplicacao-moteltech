import { getConnection } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
  const { id } = params;
  const conn = await getConnection();

  try {
    const [rows] = await conn.execute('SELECT * FROM tblsuites WHERE id = ?', [id]);
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Suíte não encontrada' }, { status: 404 });
    }
    return NextResponse.json(rows[0]);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Erro ao consultar suíte' }, { status: 500 });
  } finally {
    await conn.end();
  }
}
