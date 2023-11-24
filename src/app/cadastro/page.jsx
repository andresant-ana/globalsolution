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
    foto_perfil: "",
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
      const response = await fetch("http://localhost:3000/api/base/base-cad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        const obj = await response.json();
        if (obj) {
          setMsg("Cadastro realizado com sucesso!");

          //TODO: Após o usuário se cadastrar, manter o usuário logado com seus dados cadastrados automaticamente envia-lo para página inicial (agora logado em sua conta)
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
              foto_perfil: "",
            });
          }, 5000);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleLimpar = () => {
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
      foto_perfil: "",
    });
  };

  return (
    <article className="form-page">
      <h2 className={classeLoginMsg}>{msg}</h2>

      <section className="form-page__redirect">
        <p className="form-page__redirect__text">Possui uma conta?{" "}</p>
        <p><Link href="/login" className="form-page__redirect__link">Clique aqui para fazer login!</Link></p>
      </section>

      <form onSubmit={handleSubmit} className="form-page__form">
        <fieldset className="form-page__form__field">
          <legend className="form-page__form__field__titulo">Cadastro</legend>

          <input type="text" id="idNome" name="nome" className="input" placeholder="Primeiro nome" value={usuario.nome} onChange={handleChange} />
          <input type="email" id="idEmail" name="email" className="input" placeholder="E-mail" value={usuario.email} onChange={handleChange} />
          <input type="text" id="idCPF" name="cpf" className="input" placeholder="CPF" value={usuario.cpf} onChange={handleChange} />
          <input type="text" id="idDataNascimento" name="dataNascimento" className="input" placeholder="Data de nascimento" value={usuario.dataNascimento} onChange={handleChange} />

          <select id="idSexo" name="sexo" className="input" value={usuario.sexo} onChange={handleChange} >
            <option value="" disabled selected>Sexo</option>
            <option value="masculino">Masculino</option>
            <option value="feminino">Feminino</option>
          </select>

          <input type="text" id="idTelefone" name="telefone" className="input" placeholder="Telefone celular" value={usuario.telefone} onChange={handleChange} />
          <input type="text" id="idCEP" name="cep" className="input" placeholder="CEP" value={usuario.cep} onChange={handleChange} />

          <div className="input--checkbox">
            <input type="checkbox" id="idAlergico" name="alergico" checked={usuario.alergico} onChange={handleChange} />
            <label htmlFor="idAlergico">Alérgico a algo?</label>
          </div>
          {usuario.alergico && (
            <input type="text" name="alergia" className="input--tab" placeholder="Digite a alergia" value={usuario.alergia} onChange={handleChange} />
          )}

          <div className="input--checkbox">
            <input type="checkbox" id="idMedicamentoContinuo" name="medicamentoContinuo" checked={usuario.medicamentoContinuo} onChange={handleChange} />
            <label htmlFor="idMedicamentoContinuo">Faz uso de medicamento contínuo?</label>
          </div>
          {usuario.medicamentoContinuo && (
            <input type="text" name="medicamento" className="input--tab" placeholder="Digite o medicamento" value={usuario.medicamento} onChange={handleChange} />
          )}

          <section className="w-full flex justify-center gap-[75px]">
            <button type="button" onClick={handleLimpar} className="w-full button button-black-outline">Limpar</button>
            <button type="submit" className="w-full button button-color-filled">Cadastrar</button>
          </section>
        
        </fieldset>
      </form>
    </article>
  );
}
