import {promises as fs} from "fs";
import { NextResponse } from "next/server";

export async function GET(request, {params}) {
    // Obtendo arquivo db.json em forma de string
    const file = await fs.readFile(process.cwd() + "/src/app/api/base/db.json", "utf-8");

    // Transformando arquivo em um objeto e armazenando na variavel lista
    const lista = await JSON.parse(file);

    // Obtendo o id informado na url
    const id = params.id;

    // Lógica de GET-ALL / GET-BY-ID
    if(id > 0 && id <= lista.doencas_de_pele.length) {
        return NextResponse.json(lista.doencas_de_pele.find((doenca)=> doenca.id = id));
    } else {
        return id == 0 ? NextResponse.json(lista.doencas_de_pele) : NextResponse.redirect("https://localhost:3000/error");
    }
}