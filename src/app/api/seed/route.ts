import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    await prisma.todo.deleteMany();

    await prisma.todo.createMany({
        data: [
            {
                description: 'Piedra del alma', complete: true
            },
            {
                description: 'Piedra del tiempo',
            },
            {
                description: 'Piedra de la mente',
            },
            {
                description: 'Piedra de la realidad',
            },
            {
                description: 'Piedra del poder',
            },
            {
                description: 'Piedra del espacio',
            }
        ]
    })


    return NextResponse.json({ message: 'Seed Executed' })
}