import React, { useState } from 'react';
import axios from 'axios';
import './Formulario.css';  // Importando o arquivo CSS

function App() {
  const [form, setForm] = useState({
    data: new Date().toISOString().split("T")[0],
    dia: new Date().toISOString().split("T")[0].split("-")[2],
    mes: getNomeMes(new Date().toISOString().split("T")[0].split("-")[1]),
    ano: new Date().toISOString().split("T")[0].split("-")[0],
    nome: '',
    ra: '',
    curso: '',
    orientador: '',
    coorientador: '',
    avaliador1: '',
    avaliador2: '',
    titulo: '',
    tipoVinculo: '',
    choice_dp: '',
    choice_conv: '',
    aprovacao: '',
    choice_aprovado: '',
    choice_reprovado: '',
    indicacao: '',
  });

  const [checkboxCheckedCoorientador, setCheckboxCheckedCoorientador] = useState(false);
  const [checkboxIndicacao, setCheckboxChekedIndicacao] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => {
      let updates = { [name]: value };

      if (name === 'tipoVinculo') {
        updates.choice_dp = value === 'desenvolvimento_pesquisa' ? 'X' : '';
        updates.choice_conv = value === 'convalidacao' ? 'X' : '';
      } else if (name === 'aprovacao') {
        updates.choice_aprovado = value === 'aprovado' ? 'X' : '';
        updates.choice_reprovado = value === 'reprovado' ? 'X' : '';
      }

      return { ...prevForm, ...updates };
    });

  };


  const handleData = (e) => {
    const data = e.target.value.split("-");
    setForm({ ...form, dia: data[2], mes: getNomeMes(data[1]), ano: data[0] });
  };

  function getNomeMes(mes) {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    if (mes >= 1 && mes <= 12) {
      return meses[mes - 1];
    } else {
      return 'Mês inválido';
    }
  }

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;

    if (name === 'indicacaoTrabalho') {
      setCheckboxChekedIndicacao(checked);
      setForm((prevForm) => ({
        ...prevForm,
        indicacao: checked ? 'X' : '',
      }));
    } else if (name === 'coorientador') {
      setCheckboxCheckedCoorientador(checked);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Definir a URL dependendo do estado do checkbox

    const url = checkboxCheckedCoorientador
      ? 'http://localhost:3001/TCC_02_Ficha_de_Avaliacao-pdf-coorientador-pdf'  // Rota para incluir coorientador
      : 'http://localhost:3001/TCC_02_Ficha_de_Avaliacao-pdf';  // Rota sem coorientador


    try {
      const response = await axios.post(url, form, {
        responseType: 'blob'
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `02_Ficha_de_Autorizacao - ${form.nome}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Erro ao gerar o PDF', error);
    }
  };

  return (
    <div className="form-container">
      <div className='header'>
        <div>
          <img src="utfpr.svg" width="180px" alt="UTFPR logo" />
        </div>
        <div className='header-title'>
          <span>Universidade Tecnológica Federal do Paraná</span><br />
          <span>Câmpus Cornélio Procópio</span><br />
          <span>Departamento de Computação</span>
        </div>
      </div>
      <hr />
      <h2>TCC2 - Ficha de Autorização de Defesa</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Data:</label>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleData}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Nome completo:</label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>RA:</label>
          <input
            type="number"
            name="ra"
            value={form.ra}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Curso:</label>
          <input
            name="curso"
            value={form.curso}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Título do trabalho:</label>
          <textarea
            name="titulo"
            value={form.titulo}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Tipo do trabalho:</label>
          <div>
            <label>
              <input
                type="radio"
                name="tipoVinculo"
                value="desenvolvimento_pesquisa"
                checked={form.tipoVinculo === 'desenvolvimento_pesquisa'}
                onChange={handleChange}
                required
              />
              DESENVOLVIMENTO/PESQUISA
            </label>

            <label>
              <input
                type="radio"
                name="tipoVinculo"
                value="convalidacao"
                checked={form.tipoVinculo === 'convalidacao'}
                onChange={handleChange}
                required
              />
              CONVALIDAÇÃO
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="indicacaoTrabalho"
              checked={checkboxIndicacao}
              onChange={handleCheckboxChange}
            />
            Indicação de trabalho destaque para participação de eventuais premiações e concursos de TCC oferecidos pela UTFPR e outros órgãos da área
          </label>
        </div>

        <fieldset>
          <legend>Banca avaliadora</legend>
          <div className="form-group">
            <label>Nome orientador:</label>
            <input
              name="orientador"
              value={form.orientador}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>
              Você tem co-orientador?
            </label>
            <input
              type="checkbox"
              name="coorientador"
              checked={checkboxCheckedCoorientador}
              onChange={handleCheckboxChange}
            />
          </div>

          {checkboxCheckedCoorientador && (
            <div className="form-group">
              <label>Nome coorientador:</label>
              <input
                name="coorientador"
                value={form.coorientador}
                onChange={handleChange}
                required={checkboxCheckedCoorientador} // Torna obrigatório se o checkbox estiver marcado
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <label>Avaliador 1:</label>
            <input
              name="avaliador1"
              value={form.avaliador1}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Avaliador 2:</label>
            <input
              name="avaliador2"
              value={form.avaliador2}
              onChange={handleChange}
              className="form-input"
            />
          </div>
        </fieldset>

        <div className="form-group">
          <label>Resultado da avaliação:</label>
          <div>
            <label>
              <input
                type="radio"
                name="aprovacao"
                value="aprovado"
                checked={form.aprovacao === 'aprovado'}
                onChange={handleChange}
                required
              />
              APROVADO
            </label>

            <label>
              <input
                type="radio"
                name="aprovacao"
                value="reprovado"
                checked={form.aprovacao === 'reprovado'}
                onChange={handleChange}
                required
              />
              REPROVADO
            </label>
          </div>
        </div>

        <button type="submit" className="form-button">
          <span className="button-text">Gerar PDF</span>
        </button>
      </form>
    </div>
  );
}

export default App;
