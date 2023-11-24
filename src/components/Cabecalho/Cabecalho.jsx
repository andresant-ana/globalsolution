"use client";
import { useState } from "react";

// Icones
import { RxHamburgerMenu, RxEnter, RxExit } from 'react-icons/rx';
import { CgProfile } from 'react-icons/cg';
import { VscClose, VscHome } from 'react-icons/vsc';
import { MdPeopleAlt, MdArticle } from "react-icons/md";

import Link from "next/link";
import Image from "next/image";


export default function Cabecalho() {
  const usuario = JSON.parse(sessionStorage.getItem("obj-user"));
  const usuarioToken = sessionStorage.getItem("token-user");
  const usuarioLogado = usuarioToken != null;

  const handleLogout = () => {
    sessionStorage.removeItem("obj-user");
    sessionStorage.removeItem("token-user");
    window.location.href = "/";
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menu = () => {

    const menuUsuario = () => (
      <>
        <Link href='/' onClick={handleLogout} className="cabecalho__menu__navbar__link">
          <RxExit />
          Logout
        </Link>

        <Link href='/wiki' className="cabecalho__menu__navbar__link">
          <MdArticle />
          WIKI
        </Link>
      </>
    )

    const menuVisitante = () => (
      <>
        <Link href='/cadastro' className="cabecalho__menu__navbar__link">
          <RxEnter />
          Cadastre-se
        </Link>

        <Link href='/login' className="cabecalho__menu__navbar__link">
          <RxEnter />
          Login
        </Link>
      </>
    )

    if (isMenuOpen) {
      return (
        <div className="cabecalho__menu__screen">
          <div className="cabecalho__menu__navbar">
            <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <VscClose size={30} className="cabecalho__menu__navbar__close-icon" />
            </div>
            <Link href='/' className="cabecalho__menu__navbar__link ">
              <VscHome />
              Página Inicial
            </Link>
            <Link href='/' className="cabecalho__menu__navbar__link">
              <MdPeopleAlt />
              Sobre nós
            </Link>

            {usuarioLogado ? menuUsuario() : menuVisitante()}

          </div >

          <div className="exit" onClick={() => setIsMenuOpen(!isMenuOpen)} />

        </div >
      )
    }
  }

  return (
    <header className="cabecalho">
      <div className="cabecalho__menu">
        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <RxHamburgerMenu size={30} className="cabecalho__menu__menu-icon" />

        </div>
        {menu()}
      </div>
      <div className="cabecalho__logo">
        <Link href='/'>
          <Image
            src="/imgs/logo-NotreDameIntermedica.png"
            alt=""
            width="116"
            height="32" />
        </Link>
      </div>
      {
        usuario != null ? (
          <Link className="cabecalho__usuario" href={`/usuario/${usuario.nome}/${usuarioToken}`}>
            {
              usuario.foto_perfil ?
                <Image src={usuario.foto_perfil} alt="" width={30} height={30} /> :
                <CgProfile size={30} />
            }
            <p className="cabecalho__usuario__email">
              {usuario.nome}
            </p>
          </Link>
        ) : (
          <div className="cabecalho__usuario">
            <CgProfile size={30} />
          </div>
        )
      }

    </header>
  )
}