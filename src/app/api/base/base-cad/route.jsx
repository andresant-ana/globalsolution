import {promises as fs} from "fs";
import { NextResponse } from "next/server";

export async function POST(request, response) {
    try {
        const userRequest = await request.json();

        // Obtendo arquivo db.json em forma de string
        const file = await fs.readFile(process.cwd() + '/src/app/api/base/db.json', 'utf-8');

        // Transformando arquivo em um objeto e armazenando na variavel lista
        const lista = await JSON.parse(file);

        // Obtendo o maior id na lista e alterando id recebido pelo usuário
        const newId = lista.usuarios.length > 0 ? lista.usuarios[lista.usuarios.length - 1].id + 1 : 1;
        userRequest.id = newId;

        // Adcionando userRequest a lista e reescrevendo arquivo com essa nova lista
        lista.usuarios.push(userRequest);
        fs.writeFile(process.cwd() + '/src/app/api/base/db.json', JSON.stringify(lista));

        return NextResponse.json(userRequest);
    } catch(error) {
        console.log(error);
    }

    return NextResponse.json({"status": false});
}