"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {RxHamburgerMenu, RxEnter, RxExit} from 'react-icons/rx';
import {CgProfile} from 'react-icons/cg';
import {VscClose} from 'react-icons/vsc';

export default function Cabecalho() {
  const usuario = JSON.parse(sessionStorage.getItem("obj-user"));
  const usuarioToken = sessionStorage.getItem("token-user");

  const [userLogado] = useState(usuario);

  const handleLogout = () => {
    sessionStorage.removeItem("obj-user");
    sessionStorage.removeItem("token-user");
    window.location.href = "/";
  };

  const usuarioLogado = usuarioToken != null;

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const openMenu = ()=>{
    setIsMenuOpen(!isMenuOpen);
    console.log(isMenuOpen);
  };

  return (
    <header className="cabecalho">
      <div className="cabecalho__menu">
        <div onClick={()=>openMenu()}>
          <RxHamburgerMenu size={30} className="cabecalho__menu__menu-icon"/>

        </div>
        {isMenuOpen ? (
          <div className="cabecalho__menu__screen">
            <div className="cabecalho__menu__navbar">
              <div onClick={()=>openMenu()}>
                <VscClose size={30} className="cabecalho__menu__navbar__close-icon" />
              </div>
              <Link href='/' className="cabecalho__menu__navbar__link ">
                Página Inicial
              </Link>
              <Link href='/' className="cabecalho__menu__navbar__link">
                Sobre nós
              </Link>
              {
                usuarioLogado ? (
                  <>
                    <Link href='/' onClick={handleLogout} className="cabecalho__menu__navbar__link">
                      <RxExit/>
                      Logout
                    </Link>
                    <Link href='/wiki' className="cabecalho__menu__navbar__link">
                      WIKI
                    </Link>

                  </>
                ) : (
                  <>
                    <Link href='/cadastro' className="cabecalho__menu__navbar__link">
                      <RxEnter/>
                      Cadastre-se
                    </Link>
                    <Link href='/login' className="cabecalho__menu__navbar__link">
                      <RxEnter/>
                      Login
                    </Link>
                  </>
                )
              }
            </div>
            <div className="exit" onClick={()=>openMenu()}></div>
          </div>
          )
          : (<></>)
        }
      </div>
      <div className="cabecalho__logo">
        <Link href='/'>
          <Image
          src="/imgs/logo-NotreDameIntermedica.png"
          alt=""
          width="116"
          height="32"/>
        </Link>
      </div>
      {/* <nav className="cabecalho__navegacao">
        <ul className="menu">
          <li className="menu__item">
            <Link href="/" className="menu__item__link">HOME</Link>
          </li>
          <li className="menu__item">
            <Link href="/sobre" className="menu__item__link">SOBRE</Link>
          </li>
          {
            usuarioLogado ? (
              <>
                <li className="menu__item">
                  <Link href="/ia" className="menu__item__link">IA</Link>
                </li>
                
                <li className="menu__item">
                  <Link href="/" onClick={handleLogout} className="menu__item__link">LOGOUT</Link>
                </li>
              </>
            ) : (
              <>
                <li className="menu__item">
                  <Link href="/cadastro" className="menu__item__link">CADASTRE-SE</Link>
                </li>

                <li className="menu__item">
                  <Link href="/login" className="menu__item__link">LOGIN</Link>
                </li>
              </>
            )
          }
        </ul>
      </nav> */}
      <Link className="cabecalho__usuario" href={usuario != null ? `/usuario/${usuario.nome}/${usuarioToken}` : '/'}>
        { 
        usuario != null ? 
        usuario.foto_perfil ? <Image src={usuario.foto_perfil} alt=""  width={30} height={30}/> : 
        <CgProfile size={30}/> : <CgProfile size={30}/>
        }
        <p className="cabecalho__usuario__email">
          {usuario != null ? `${usuario.nome}` : "undefined"}
        </p>
      </Link>
    </header>
  )
}