import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { db } from '@/lib/DB';
import { guestbookTable } from '@/models/Schema';
import {
  AddGuestbookSchema,
  DeleteGuestbookSchema,
} from '@/validations/Guestbook';

export const POST = async (request: Request) => {
  try {
    const json = await request.json();
    const body = AddGuestbookSchema.parse(json);

    await db.insert(guestbookTable).values(body).run();

    return NextResponse.json({});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.format(), { status: 422 });
    }

    return NextResponse.json({}, { status: 500 });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const json = await request.json();
    const body = DeleteGuestbookSchema.parse(json);

    await db.delete(guestbookTable).where(eq(guestbookTable.id, body.id)).run();

    return NextResponse.json({});
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(error.format(), { status: 422 });
    }

    return NextResponse.json({}, { status: 500 });
  }
};
