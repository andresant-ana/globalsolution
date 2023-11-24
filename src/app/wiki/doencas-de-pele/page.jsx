import {IoMdArrowDropdown, IoMdArrowDropup} from 'react-icons/io'


export default async function DoencasDePele() {

    let doencasDePele;
    try {
        const response = await fetch('http://localhost:3000/api/base/base-doencas/0');
        doencasDePele = await response.json();

    } catch(error) {
        console.log(error);
    }


    return (
        <div className='w-full h-full min-h-[80vh] p-[25px] pb-[50px] bg-[#EDF7F6]'>

            <div className='flex flex-col'>

                <ul className='max-w-[800px] flex flex-col gap-[25px] items-center'>
                    {doencasDePele.map((doenca)=> (
                        <li key={doenca.id}>
                            <div className="w-full h-[50px] px-[25px] py-[13px] flex justify-between items-center text-[1.2rem] bg-[#fff] rounded-[10px] cursor-pointer">
                                <h2 className=" font-bold text-[#080708]">{doenca.titulo}</h2>
                                <IoMdArrowDropdown/>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
