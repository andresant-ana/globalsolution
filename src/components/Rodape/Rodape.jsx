import React from 'react'

export default function Rodape() {

  const listaParticipantes = [
    {"id": 1, "rm": "RM551575", "nome": "Andre Sant’ana", "funcao": "RWD"},
    {"id": 2, "rm": "RM99632", "nome": "Gabriel Eringer", "funcao": "RWD"},
    {"id": 3, "rm": "RM93364", "nome": "Guilherme Tavares", "funcao": "SD&TX"},
    {"id": 4, "rm": "RM98251", "nome": "Marcelo Dias", "funcao": "Python"},
    {"id": 5, "rm": "RM99697", "nome": "Matheus Leite", "funcao": "DB, AI, Java, Python"}
  ];


  return (
    <footer className="rodape">
      <h2 className='rodape__titulo'>Equipe</h2>
      <section className='rodape__equipe'>
        <h3 className='rodape__equipe__turma'>Turma 1TDSPG</h3>
        <ul className='rodape__equipe__membros'>
          {listaParticipantes.map((membro)=> (

            <li key={membro.id} className='membro'>
              <strong className='membro__rm'>{membro.rm}</strong>
              <p className='membro__nome'>{membro.nome}</p>
              <p className='membro__funcao'>{membro.funcao}</p>
            </li>

          ))}
        </ul>
      </section>
      <p className='rodape__copyright'>&copy; 2023 - Global Solution - Desenvolvido por .</p>
    </footer>
  )
}