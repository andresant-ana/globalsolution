"use client";

import { useRouter } from "next/navigation";
import { CgProfile } from "react-icons/cg";
import {MdModeEditOutline} from "react-icons/md";
import Image from "next/image";

export default function Usuario({ params }) {
    const navigate = useRouter();
    const usuario = JSON.parse(sessionStorage.getItem("obj-user"));
    const usuarioToken = sessionStorage.getItem("token-user");

    const isURLvalida = () => {
        const URLvalida = params.nome === usuario.nome && params.token === usuarioToken;
        if (!URLvalida) {
            navigate.push("/error");
        }
        return URLvalida
    }

    if (isURLvalida) {
        return (
            <div className="w-full h-full flex flex-col items-center bg-[#EDF7F6]">
                <div className="w-full max-w-[600px] flex flex-col gap-[25px] p-[25px] pb-[50px]">
                    <div className="w-full relative flex flex-col items-center">
                        <div className="absolute top-0 right-0">
                            <button type="button">
                                <MdModeEditOutline size={25} />
                            </button>
                        </div>
                        <div className=" w-[120px] h-[120px] flex justify-center items-center">
                            {usuario.foto_perfil ? <Image src={usuario.foto_perfil} alt="" width={100} height={100} /> : <CgProfile size={100} />}

                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <p className=" font-semibold text-base text-center">{usuario.nome}</p>
                            <p className="font-light text-xs text-center">{usuario.dataNascimento}</p>
                        </div>
                    </div>

                    <section className="w-full p-[10px] bg-white border-[0.5px] border-black rounded-sm">
                        <p className="font-light text-xs text-left flex items-center gap-[5px]">
                            <strong className="font-semibold text-base text-left">E-mail:</strong>
                            {usuario.email}
                        </p>
                        <p className="font-light text-xs text-left flex items-center gap-[5px]">
                            <strong className="font-semibold text-base text-left">Telefone celular:</strong>
                            {usuario.telefone}
                        </p>
                    </section>

                    <section className="w-full p-[10px] bg-white border-[0.5px] border-black rounded-sm">
                        <p className="font-light text-xs text-left flex items-center gap-[5px]">
                            <strong className="font-semibold text-base text-left">CPF:</strong>
                            {usuario.cpf}
                        </p>
                        <p className="font-light text-xs text-left flex items-center gap-[5px]">
                            <strong className="font-semibold text-base text-left">CEP:</strong>
                            {usuario.cep}
                        </p>
                    </section>

                    <section className="w-full p-[10px] bg-white border-[0.5px] border-black rounded-sm">
                        <p><strong className="font-semibold text-base text-left">Alergias:</strong></p>
                        <ul>
                            <li>{usuario.alergia}</li>
                        </ul>
                    </section>

                    <section className="w-full p-[10px] bg-white border-[0.5px] border-black rounded-sm">
                        <p><strong className="font-semibold text-base text-left">Medicamentos:</strong></p>
                        <ul>
                            <li>{usuario.medicamento}</li>
                        </ul>
                    </section>

                    <section className="w-full flex flex-col items-end">
                        <button type="button" className="button button-black-outline">Desativar conta</button>
                    </section>
                </div>
            </div>
        )
    }
}
