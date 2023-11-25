"use client";
import { IoMdArrowDropdown, IoMdArrowDropup } from 'react-icons/io';
import DropdownContainer from '@/components/WikiDropdownContainer/DropdownContainer';
import { useEffect, useState } from 'react';

export default function DoencasDePele() {

    const [doencasDePele, setDoencasDePele] = useState([]);

    useEffect(()=> {
        const fetchData = async ()=> {
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

    const [containerOpen, setContainerOpen] = useState(false);

    return (
        <main className='w-full h-full p-[20px] pb-[50px] flex flex-col items-center gap-[25px] bg-[#EDF7F6]'>
            <article className='w-full max-w-[800px] flex flex-col items-center gap-[25px]'>
                {
                    doencasDePele.map((doenca) => (
                        <>
                            <section key={doenca.id} className='w-full flex flex-col gap-[10px]'>
                                <div onClick={()=> setContainerOpen(!containerOpen)} className='w-full px-[25px] py-[13px] flex justify-between items-center bg-white rounded-[10px] shadow-sm cursor-pointer'>
                                    <h2 className=' font-bold text-[1.2rem] text-[#080708]'>{doenca.nome}</h2>
                                    <IoMdArrowDropdown className='text-[1.2rem]' />
                                </div>

                                {
                                    containerOpen ?
                                    <DropdownContainer 
                                    nome={doenca.nome} 
                                    descricao={doenca.descricao} 
                                    sintomas={doenca.sintomas} 
                                    imagemSintomas={doenca.imagemSintomas} 
                                    causas={doenca.causas}
                                    imagemCausas={doenca.imagemCausas}
                                    tratamentos={doenca.tratamentos}
                                    /> :
                                    <></>
                                
                                }

                                {/* <article className='w-full rounded-[10px] flex flex-col gap-[25px] p-[25px] pb-[50px] bg-white shadow-sm'>
                                    <section className='w-full flex gap-[5px]'>
                                        <p><strong className='font-semibold text-base text-[#080708]'>Nome:</strong></p>
                                        <p className='font-normal text-base text-[#080708]'>{doenca.nome}</p>
                                    </section>

                                    <section className='w-full flex flex-col gap-[5px]'>
                                        <p><strong className='font-semibold text-base text-[#080708]'>Descrição:</strong></p>
                                        <p className='font-normal text-base text-[#080708]'>{doenca.descricao}</p>
                                    </section>

                                    <section className='w-full flex flex-wrap gap-x-[20px] gap-y-[25px]'>
                                        <div className='w-full flex flex-col gap-[5px]'>
                                            <p><strong className='font-semibold text-base text-[#080708]'>Sintomas:</strong></p>
                                            <ul className='pl-[25px]'>
                                                {
                                                    doenca.sintomas.map((sintoma)=> (
                                                        <>
                                                        <li className='break-words font-normal text-base text-[#080708] list-disc'>{sintoma}</li>
                                                        </>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <div className='w-full'>
                                            <Image src={doenca.imagemSintomas} alt="" width="365" height="225"/>

                                        </div>
                                    </section>

                                    <section className='w-full flex flex-wrap gap-x-[20px] gap-y-[25px]'>
                                        <div className='w-full flex flex-col gap-[5px]'>
                                            <p><strong className='font-semibold text-base text-[#080708]'>Causas:</strong></p>
                                            <ul className='pl-[25px]'>
                                                {
                                                    doenca.causas.map((causa)=> (
                                                        <>
                                                        <li className='font-normal text-base text-[#080708] list-disc'>{causa}</li>
                                                        </>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                        <div className='w-full'>
                                            <Image src={doenca.imagemCausas} alt="" width="365" height="225"/>

                                        </div>
                                    </section>

                                    <section className='w-full flex flex-col gap-[5px]'>
                                        <p><strong className='font-semibold text-base text-[#080708]'>Tratamentos:</strong></p>
                                        <ul className='pl-[25px]'>
                                            {
                                                doenca.tratamentos.map((tratamento)=> (
                                                    <>
                                                    <li className='font-normal text-base text-[#080708] list-disc'>{tratamento}</li>
                                                    </>
                                                ))
                                            }
                                        </ul>
                                    </section>
                                </article> */}

                            </section>
                        </>
                    ))
                }

            </article>

        </main>
    )
}
