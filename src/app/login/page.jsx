"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const navigate = useRouter();

  const [usuario, setUsuario] = useState({
    email: "",
    cpf: "",
  });

  const [msg, setMsg] = useState("");
  const [classeLoginMsg, setClasseLoginMsg] = useState("");

  useEffect(() => {
    if (msg === "Usuário Validado com Sucesso!") {
      setClasseLoginMsg("login-sucesso");
    } else if (msg === "Usuário e ou Senha inválidos!!") {
      setClasseLoginMsg("login-erro");
    } else {
      setClasseLoginMsg("login-none");
    }
  }, [msg]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "cpf") {
      formattedValue = formatCPF(value);
    }

    setUsuario({ ...usuario, [name]: formattedValue });
  };

  const formatCPF = (value) => {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/base/base-users/0",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.status) {
          const token =
            Math.random().toString(36).substring(2) +
            Math.random().toString(36).substring(2);
          sessionStorage.setItem("token-user", token);

          sessionStorage.setItem("obj-user", JSON.stringify(data.user));

          setMsg("Usuário Validado com Sucesso!");

          setTimeout(() => {
            setMsg("");
            navigate.push("/");
          }, 5000);
        } else {
          setMsg("Usuário e ou Senha inválidos!!");
          setTimeout(() => {
            setMsg("");
            setUsuario({
              email: "",
              cpf: "",
            });
          }, 5000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>

      <h2 className={classeLoginMsg}>{msg}</h2>

      <div>

        <div>
          <p>
            Ainda não possui uma conta? {" "}
          </p>
          <p>
            <Link href="/cadastro">Clique aqui para se cadastrar!</Link>
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Login</legend>
            <div>
              <label htmlFor="idEmail">Email:</label>
              <input
                type="email"
                name="email"
                id="idEmail"
                placeholder="Digite seu e-mail"
                value={usuario.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="idCPF">CPF:</label>
              <input
                type="text"
                name="cpf"
                id="idCPF"
                placeholder="Digite seu CPF"
                value={usuario.cpf}
                onChange={handleChange}
              />
            </div>
            <div>
              <button>Entrar</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
