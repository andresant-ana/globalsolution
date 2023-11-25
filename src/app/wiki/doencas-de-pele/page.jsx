"use client";
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import DropdownContainer from '@/components/WikiDropdownContainer/DropdownContainer';
import { useEffect, useState } from 'react';

export default function DoencasDePele() {

    const [doencasDePele, setDoencasDePele] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/base/base-doencas/0');
                const data = await response.json();
                setDoencasDePele(data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const [doencasAbertas, setDoencasAbertas] = useState({});

    const toggleContainer = (id) => {
        setDoencasAbertas(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    return (
        <main className='w-full h-full p-[20px] pb-[50px] flex flex-col items-center gap-[25px] bg-[#EDF7F6]'>
            <article className='w-full max-w-[800px] flex flex-col items-center gap-[25px]'>
                {
                    doencasDePele.map((doenca) => (
                        <section key={doenca.id} className='w-full flex flex-col gap-[10px]'>
                            <div onClick={() => toggleContainer(doenca.id)} className='w-full px-[25px] py-[13px] flex justify-between items-center bg-white rounded-[10px] shadow-sm cursor-pointer'>
                                <h2 className=' font-bold text-[1.2rem] text-[#080708]'>{doenca.nome}</h2>
                                {doencasAbertas[doenca.id] ? <IoMdArrowDropup className='text-[1.2rem]' /> : <IoMdArrowDropdown className='text-[1.2rem]' />}
                            </div>

                            {
                                doencasAbertas[doenca.id] ?
                                    <DropdownContainer
                                        nome={doenca.nome}
                                        descricao={doenca.descricao}
                                        sintomas={doenca.sintomas}
                                        imagemSintomas={doenca.imagemSintomas}
                                        causas={doenca.causas}
                                        imagemCausas={doenca.imagemCausas}
                                        tratamentos={doenca.tratamentos}
                                    /> :
                                    null
                            }
                        </section>
                    ))
                }
            </article>
        </main>
    );
}
