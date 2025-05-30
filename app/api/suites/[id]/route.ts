// app/api/suites/[id]/route.ts
import { getConnection } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

interface Params {
  params: {
    id: string;
  };
}

export async function GET(req: NextRequest, { params }: Params) {
  const { id } = params;
  const conn = await getConnection();

  try {
    const [rows] = await conn.execute('SELECT * FROM tblsuites WHERE id = ?', [id]);
    
    if (!Array.isArray(rows) || rows.length === 0) {
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
