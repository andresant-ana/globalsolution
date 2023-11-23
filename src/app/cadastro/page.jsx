"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CadUser() {
  const navigate = useRouter();

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    cpf: "",
    dataNascimento: "",
    sexo: "",
    telefone: "",
    cep: "",
    alergico: false,
    alergia: "",
    medicamentoContinuo: false,
    medicamento: "",
  });

  const [msg, setMsg] = useState("");
  const [classeLoginMsg, setClasseLoginMsg] = useState("");

  useEffect(() => {
    if (msg === "Cadastro realizado com sucesso!") {
      setClasseLoginMsg("login-sucesso");
    } else if (msg === "Ocorreu um erro no preenchimento.") {
      setClasseLoginMsg("login-erro");
    } else {
      setClasseLoginMsg("login-none");
    }
  }, [msg]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let formattedValue = value;

    if (type === "checkbox") {
      formattedValue = checked;
    } else if (name === "cpf") {
      formattedValue = formatCPF(value);
    } else if (name === "dataNascimento") {
      formattedValue = formatDataNascimento(value);
    } else if (name === "telefone") {
      formattedValue = formatTelefone(value);
    } else if (name === "cep") {
      formattedValue = formatCEP(value);
    }

    setUsuario({ ...usuario, [name]: formattedValue });
  };

  const formatCPF = (value) => {
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  };

  const formatDataNascimento = (value) => {
    return value.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
  };

  const formatTelefone = (value) => {
    return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  };

  const formatCEP = (value) => {
    return value.replace(/(\d{5})(\d{3})/, "$1-$2");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:3000/api/base/base-cad",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(usuario),
        }
      );

      if (response.ok) {
        const obj = await response.json();
        if (obj) {
          setMsg("Cadastro realizado com sucesso!");

          setTimeout(() => {
            setMsg("");
            navigate.push("/");
          }, 5000);
        } else {
          setMsg("Ocorreu um erro no preenchimento.");
          setTimeout(() => {
            setMsg("");
            setUsuario({
              nome: "",
              email: "",
              cpf: "",
              dataNascimento: "",
              sexo: "",
              telefone: "",
              cep: "",
              alergico: false,
              alergia: "",
              medicamentoContinuo: false,
              medicamento: "",
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
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>CADASTRO</legend>
            <div>
              <label htmlFor="idNome">Nome:</label>
              <input
                type="text"
                name="nome"
                id="idNome"
                placeholder="Digite seu nome"
                value={usuario.nome}
                onChange={handleChange}
              />
            </div>
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
              <label htmlFor="idDataNascimento">Data de Nascimento:</label>
              <input
                type="text"
                name="dataNascimento"
                id="idDataNascimento"
                placeholder="Digite sua data de nascimento"
                value={usuario.dataNascimento}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="idSexo">Sexo:</label>
              <select
                name="sexo"
                id="idSexo"
                value={usuario.sexo}
                onChange={handleChange}
              >
                <option value="" disabled>
                  Selecione
                </option>
                <option value="masculino">Masculino</option>
                <option value="feminino">Feminino</option>
              </select>
            </div>
            <div>
              <label htmlFor="idTelefone">Telefone Celular:</label>
              <input
                type="text"
                name="telefone"
                id="idTelefone"
                placeholder="Digite seu telefone celular"
                value={usuario.telefone}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="idCEP">CEP:</label>
              <input
                type="text"
                name="cep"
                id="idCEP"
                placeholder="Digite seu CEP"
                value={usuario.cep}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="idAlergico">Alérgico a algo?</label>
              <input
                type="checkbox"
                name="alergico"
                id="idAlergico"
                checked={usuario.alergico}
                onChange={handleChange}
              />
              {usuario.alergico && (
                <input
                  type="text"
                  name="alergia"
                  placeholder="Digite a alergia"
                  value={usuario.alergia}
                  onChange={handleChange}
                />
              )}
            </div>
            <div>
              <label htmlFor="idMedicamentoContinuo">
                Faz uso de medicamento contínuo?
              </label>
              <input
                type="checkbox"
                name="medicamentoContinuo"
                id="idMedicamentoContinuo"
                checked={usuario.medicamentoContinuo}
                onChange={handleChange}
              />
              {usuario.medicamentoContinuo && (
                <input
                  type="text"
                  name="medicamento"
                  placeholder="Digite o medicamento"
                  value={usuario.medicamento}
                  onChange={handleChange}
                />
              )}
            </div>
            <div>
              <button>CADASTRAR</button>
            </div>
            <div>
              <p>
                Se você já possui registro.{" "}
                <Link href="/login">CLIQUE AQUI</Link>
              </p>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
