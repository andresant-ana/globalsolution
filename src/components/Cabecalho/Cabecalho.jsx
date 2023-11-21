"use client";
import Link from "next/link";
import { useState } from "react";

export default function Cabecalho() {
    //No momento de recuperar o objeto da sessão, é necessário converter o JSON para objeto novamente.
    const usuario = JSON.parse(sessionStorage.getItem("obj-user"));
    const [userLogado] = useState(usuario);
  
    const handleLogout = () => {
      sessionStorage.removeItem("obj-user");
      sessionStorage.removeItem("token-user");
      window.location.href = "/";
    }
  
    if(sessionStorage.getItem("token-user") != null){
    return (
      <header className='cabecalho'>
        <div>
          <p>{usuario != null ? `Olá ${usuario.email}`:""}</p>
        </div>
      <nav>
        <ul>
          <li><Link href="/">HOME</Link></li>
          <li><Link href="/ia">IA</Link></li>
          <li><Link href="/sobre">SOBRE</Link></li>
          <li><Link href="/contato">CONTATO</Link></li>
          <li><Link href="/" onClick={handleLogout}>LOGOUT</Link></li>
        </ul>
      </nav>
    </header>
    )
    }else{
      return (
        <header className='cabecalho'>
        <nav>
          <ul>
            <li><Link href="/">HOME</Link></li>
            <li><Link href="/sobre">SOBRE</Link></li>
            <li><Link href="/login">LOGIN</Link></li>
            <li><Link href="/cadastro">CADASTRE-SE</Link></li>
          </ul>
        </nav>
      </header>
      )
    }
  }