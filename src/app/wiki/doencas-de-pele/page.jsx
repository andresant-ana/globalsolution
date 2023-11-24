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
        <div className=''>

            <div className=''>

                <ul className=''>
                    {doencasDePele.map((doenca)=> (
                        <li key={doenca.id}>
                            <div className=''>
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
