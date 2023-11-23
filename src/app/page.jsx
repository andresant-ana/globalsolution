"use client";
import Slider from '@/components/Slider/Slider';
import Image from 'next/image';
import { useState } from 'react';
import { useEffect } from 'react'

export default function Home() {

  const [imagens, setImagens] = useState([
    {
      src: 'https://via.placeholder.com/230x284',
      alt: 'Imagem 1',
    },
    {
      src: 'https://via.placeholder.com/230x284',
      alt: 'Imagem 2',
    }
  ]);

  useEffect(() => {
  }, []);

  return (
    <>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        
        <Slider/>









        <div className="mt-10">
          <h2 className="text-2xl text-center font-extrabold">Pacotes/Ofertas</h2>
          <div className="flex flex-row justify-content-center">
            {imagens.map((imagem, index) => (
              <div key={index} className="w-1/2 p-4">
                <div className="flex flex-col justify-content-center">
                  <Image
                    src={imagem.src}
                    alt={imagem.alt}
                    className="object-fit-contain"
                    width="230"
                    height="284"
                    />
                  <h3 className="text-lg font-bold mb-3">
                    {imagem.alt}
                  </h3>
                  <p className="text-base">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                  <a href="#" className="btn btn-primary">Saiba mais</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}