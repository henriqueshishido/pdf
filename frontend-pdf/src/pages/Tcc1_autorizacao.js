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
    titulo: '',
    avaliador1: '',
    avaliador2: '',
    avaliador3: '',
    avaliador4: '',
  });

  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    setCheckboxChecked(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Definir a URL dependendo do estado do checkbox
    const url = 'http://localhost:3001/TCC_01_Ficha_de_Autorizacao-pdf';

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
      <h2>TCC1 - Ficha de Autorização de Defesa</h2>
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
            checked={checkboxChecked}
            onChange={handleCheckboxChange}
          />
        </div>

        {checkboxChecked && (
          <div className="form-group">
            <label>Nome coorientador:</label>
            <input
              name="coorientador"
              value={form.coorientador}
              onChange={handleChange}
              required={checkboxChecked} // Torna obrigatório se o checkbox estiver marcado
              className="form-input"
            />
          </div>
        )}

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

        <fieldset>
          <legend>Avaliadores</legend>
          <span className='obs-avaliador'>Indique 4 avaliadores que possam contribuir com o seu tema</span>
          <div className="form-group">
            <input
              name="avaliador1"
              placeholder='Avaliador 1'
              value={form.avaliador1}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              name="avaliador2"
              placeholder='Avaliador 2'
              value={form.avaliador2}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              name="avaliador3"
              placeholder='Avaliador 3'
              value={form.avaliador3}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              name="avaliador4"
              placeholder='Avaliador 4'
              value={form.avaliador4}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </fieldset>

        <button type="submit" className="form-button">
          <span className="button-text">Gerar PDF</span>
        </button>
      </form>
    </div>
  );
}

export default App;
