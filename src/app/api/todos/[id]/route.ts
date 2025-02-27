import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

interface Segments {
    params: {
        id: string
    }
}

export async function GET(request: Request, { params: { id } }: Segments) {
    const res = await prisma.todo.findFirst({ where: { id } });
    if (!res) return NextResponse.json({ message: 'todo with this id does not exist' }, { status: 404 })
    return NextResponse.json(res)
}
