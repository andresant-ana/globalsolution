import { 
    BsChevronCompactLeft as LeftArrow, 
    BsChevronCompactRight as RightArrow
} from "react-icons/bs";
import Link from "next/link";
import { useState } from "react";

export default function Slider() {

    const slides = [
        {
            "titulo": "IA diagnostica doença de pele",
            "texto": "Inteligência Artifical criada pela FIAP, auxilia pacientes com doença de pele.",
            "botao_texto": "Saiba mais",
            "botao_url": "/ia",
            "imagem_src": "/Slider.jpg",
            "private": true
        }
    ];

    const [slideIndice, setSlideIndice] = useState(0);

    return (
        <>
        <section className="container">
            <div className="container__fundo" style={{backgroundImage: `url(${slides[slideIndice].imagem_src})`}}>
                <div className="container__fundo__dados">
                    <h2 className="container__fundo__dados__titulo">Novidades</h2>
                    <h3 className="container__fundo__dados__subtitulo">{slides[slideIndice].titulo}</h3>
                    <p className="container__fundo__dados__texto">{slides[slideIndice].texto}</p>
                    <Link className="container__fundo__dados__link" href={slides[slideIndice].private ? "/cadastro" : slides[slideIndice].botao_url}>{slides[slideIndice].botao_texto}</Link>
                </div>

            </div>


        </section>
        </>
    )
}
