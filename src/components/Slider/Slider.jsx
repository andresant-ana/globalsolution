import { 
    BsChevronCompactLeft as LeftArrow, 
    BsChevronCompactRight as RightArrow
} from "react-icons/bs";

import {VscCircle, VscCircleFilled} from "react-icons/vsc"
import Link from "next/link";
import { useState } from "react";

export default function Slider() {

    const slides = [
        {
            "titulo": "IA diagnostica doença de pele",
            "texto": "Inteligência Artifical criada pela FIAP, auxilia pacientes com doença de pele.",
            "botao_texto": "Saiba mais",
            "botao_url": "/wiki/doencas-de-pele",
            "imagem_src": "/imgs/home-slider-img-ia.png",
            "private": true,
            "is_video": false
        },
        {
            "titulo": "YouTube video player",
            "video_src": "https://www.youtube.com/embed/rXm9dhFMU_g?si=0Mjgxfgxly78ir0Q",
            "is_video": true
        }
    ];

    const [slideIndiceAtual, setSlideIndiceAtual] = useState(0);

    const nextSlide = ()=> {
        const ultimoSlide = slideIndiceAtual === slides.length -1;
        const novoIndice = ultimoSlide ? 0 : slideIndiceAtual +1;
        setSlideIndiceAtual(novoIndice);
    };

    const prevSlide = ()=> {
        const primeiroSlide = slideIndiceAtual === 0;
        const novoIndice = primeiroSlide ? slides.length -1 : slideIndiceAtual -1;
        setSlideIndiceAtual(novoIndice);
    };

    const alterarSlide = (slideIndice)=> setSlideIndiceAtual(slideIndice);

    return (
        <>
        <section className="container">
            <div className="container__arrow container__arrow--left"><LeftArrow size={60} onClick={prevSlide}/></div>
            <div className="container__arrow container__arrow--right"><RightArrow size={60} onClick={nextSlide}/></div>
            {
                !slides[slideIndiceAtual].is_video ? (
                    <div className="container__fundo" style={{backgroundImage: `url(${slides[slideIndiceAtual].imagem_src})`}}>
                        <div className="container__fundo__dados">
                            <h2 className="container__fundo__dados__titulo">Novidades</h2>
                            <h3 className="container__fundo__dados__subtitulo">{slides[slideIndiceAtual].titulo}</h3>
                            <p className="container__fundo__dados__texto">{slides[slideIndiceAtual].texto}</p>
                            <Link className="container__fundo__dados__link" href={slides[slideIndiceAtual].private ? "/cadastro" : slides[slideIndiceAtual].botao_url}>{slides[slideIndiceAtual].botao_texto}</Link>
                        </div>

                    </div>
                ) : (
                    <div className="container__fundo">
                        <iframe 
                        className="w-full h-full"
                            src={slides[slideIndiceAtual].video_src} 
                            title={slides[slideIndiceAtual].titulo}
                            frameborder="0" 
                            allow="
                            accelerometer; 
                            autoplay; 
                            clipboard-write; 
                            encrypted-media; 
                            gyroscope; 
                            picture-in-picture; 
                            web-share" 
                            allowfullscreen 
                        />

                    </div>
                )
            }

            <div className="container__dots">
                {slides.map((slide, indice)=> (
                    <div key={indice} onClick={()=>alterarSlide(indice)}>
                        {indice === slideIndiceAtual ? 
                        <VscCircleFilled size={30} className="container__dots__dot--selecionado"/> : 
                        <VscCircle size={30} className="container__dots__dot"/>}
                    </div>
                ))}
            </div>

        </section>
        </>
    )
}
