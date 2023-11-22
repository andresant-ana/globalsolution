"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Cabecalho() {
  //No momento de recuperar o objeto da sessão, é necessário converter o JSON para objeto novamente.
  const usuario = JSON.parse(sessionStorage.getItem("obj-user"));
  const [userLogado] = useState(usuario);

  const handleLogout = () => {
    sessionStorage.removeItem("obj-user");
    sessionStorage.removeItem("token-user");
    window.location.href = "/";
  };

  const usuarioNaoLogado = sessionStorage.getItem("token-user") != null;

  return (
    <header className="cabecalho">
      <div className="cabecalho__logo">
        <Image
        src="/notredame_logo.png"
        alt=""
        width="116"
        height="32"/>
      </div>
      <nav className="cabecalho__navegacao">
        <ul className="menu">
          <li className="menu__item">
            <Link href="/" className="menu__item__link">HOME</Link>
          </li>
          <li className="menu__item">
            <Link href="/sobre" className="menu__item__link">SOBRE</Link>
          </li>
          {
            usuarioNaoLogado ? (
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
      </nav>
      <div className="cabecalho__usuario">
        <Image className="cabecalho__usuario__foto-de-perfil" 
        src="/perfil_icone.svg" 
        alt="" 
        width="50" 
        height="50" />
        <p className="cabecalho__usuario__email">{usuario != null ? `${usuario.email}` : "undefined"}</p>
      </div>
    </header>
  )
}
