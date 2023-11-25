
import Image from "next/image"

export default function DropdownContainer({ nome, descricao, sintomas, imagemSintomas, causas, imagemCausas, tratamentos }) {

    return (
        <article className='w-full rounded-[10px] flex flex-col gap-[25px] p-[25px] pb-[50px] bg-white shadow-sm'>
            <section className='w-full flex gap-[5px]'>
                <p><strong className='font-semibold text-base text-[#080708]'>Nome:</strong></p>
                <p className='font-normal text-base text-[#080708]'>{nome}</p>
            </section>

            <section className='w-full flex flex-col gap-[5px]'>
                <p><strong className='font-semibold text-base text-[#080708]'>Descrição:</strong></p>
                <p className='font-normal text-base text-[#080708]'>{descricao}</p>
            </section>

            <section className='w-full flex flex-wrap gap-x-[20px] gap-y-[25px]'>
                <div className='w-full flex flex-col gap-[5px]'>
                    <p><strong className='font-semibold text-base text-[#080708]'>Sintomas:</strong></p>
                    <ul className='pl-[25px]'>
                        {
                            sintomas.map((sintoma) => (
                                <>
                                    <li className='break-words font-normal text-base text-[#080708] list-disc'>{sintoma}</li>
                                </>
                            ))
                        }
                    </ul>
                </div>
                <div className='w-full'>
                    <Image src={imagemSintomas} alt="" width="365" height="225" />

                </div>
            </section>

            <section className='w-full flex flex-wrap gap-x-[20px] gap-y-[25px]'>
                <div className='w-full flex flex-col gap-[5px]'>
                    <p><strong className='font-semibold text-base text-[#080708]'>Causas:</strong></p>
                    <ul className='pl-[25px]'>
                        {
                            causas.map((causa) => (
                                <>
                                    <li className='font-normal text-base text-[#080708] list-disc'>{causa}</li>
                                </>
                            ))
                        }
                    </ul>
                </div>
                <div className='w-full'>
                    <Image src={imagemCausas} alt="" width="365" height="225" />

                </div>
            </section>

            <section className='w-full flex flex-col gap-[5px]'>
                <p><strong className='font-semibold text-base text-[#080708]'>Tratamentos:</strong></p>
                <ul className='pl-[25px]'>
                    {
                        tratamentos.map((tratamento) => (
                            <>
                                <li className='font-normal text-base text-[#080708] list-disc'>{tratamento}</li>
                            </>
                        ))
                    }
                </ul>
            </section>
        </article>
    )
}
