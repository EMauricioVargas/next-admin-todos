import prisma from "@/app/lib/prisma";
import { Todo } from "@prisma/client";
import { NextResponse } from "next/server";
import * as yup from 'yup';

interface Segments {
    params: {
        id: string
    }
}

const getTodo = async (id: string): Promise<Todo | null> => {

    const todo = await prisma.todo.findFirst({ where: { id } });

    return todo;
}

export async function GET(request: Request, { params: { id } }: Segments) {
    const res = await prisma.todo.findFirst({ where: { id } });
    if (!res) return NextResponse.json({ message: 'todo with this id does not exist' }, { status: 404 })
    return NextResponse.json(res)
}

const putSchema = yup.object({
    complete: yup.boolean().optional(),
    description: yup.string().optional(),
})

export async function PUT(request: Request, { params }: Segments) {

    try {
        const { id } = await params
        const body = await putSchema.validate(await request.json());
        const updatedTodo = await prisma.todo.update({
            where: { id },
            data: { ...body }
        })

        return NextResponse.json(updatedTodo);

    } catch (error) {
        return NextResponse.json(error, { status: 400 });
    }
}
