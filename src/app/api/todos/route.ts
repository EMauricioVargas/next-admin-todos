import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import * as yup from 'yup';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const take = searchParams.get('take') ?? 10;
    const skip = searchParams.get('skip') ?? 0;
    if (isNaN(+take)) return NextResponse.json({ message: 'Take tiene que ser un número' }, { status: 400 });
    if (isNaN(+skip)) return NextResponse.json({ message: 'Skip tiene que ser un número' }, { status: 400 });

    const todos = await prisma.todo.findMany({
        take: +take,
        skip: +skip
    });
    return NextResponse.json(todos);
}

const postSchema = yup.object({
    description: yup.string().required(),
    done: yup.boolean().optional().default(false)
})
export async function POST(request: Request) {
    try {
        const body = await postSchema.validate(await request.json());
        const result = await prisma.todo.create({
            data: body
        });
        return NextResponse.json(result)
    } catch (err) {
        return NextResponse.json(err, { status: 400 })
    }
}