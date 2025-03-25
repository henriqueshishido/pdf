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
    inicio_curso: '',
    orientador: '',
    titulo: '',
    experiencia_inicio: '',
    experiencia_fim: '',
    experiencia_meses: '',
    doc1_name: '',
    doc1_explanation: '',
    doc2_name: '',
    doc2_explanation: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "convalidacao_inicio" || name === "convalidacao_fim") {
      setForm({ ...form, [name]: formatarDataParaState(value) });
    } else if (name === "data") {
      const data = value.split("-");
      console.log(data)
      setForm({
        ...form,
        data: value,
        dia: data[2],
        mes: getNomeMes(data[1]),
        ano: data[0]
      });
    } else {
      setForm({ ...form, [name]: value });
    }
  }

  function formatarDataParaState(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`; // Converte para dd/mm/aaaa
  }


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


  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:3001/TCC2_Ficha_de_Convalidacao-pdf'

    try {
      const response = await axios.post(url, form, {
        responseType: 'blob'
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `Ficha_de_Convalidacao - ${form.nome}.pdf`);
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
      <h2>TCC2 - Ficha de Convalidação</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Data de vínculo:</label>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
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
          <label>Orientador:</label>
          <input
            name="orientador"
            value={form.orientador}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Título:</label>
          <input
            name="titulo"
            value={form.titulo}
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
          <label>Data do Início do Curso:</label>
          <input
            name="inicio_curso"
            value={form.inicio_curso}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Data do Início da Experiência Profissional:</label>
          <input
            name="experiencia_inicio"
            value={form.experiencia_inicio}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Data do Término da Experiência Profissional:</label>
          <input
            name="experiencia_fim"
            value={form.experiencia_fim}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Total de meses da experiência:</label>
          <input
            name="experiencia_meses"
            value={form.experiencia_meses}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Nome do documento 1:</label>
          <input
            name="doc1_name"
            value={form.doc1_name}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Explicação do documento 1:</label>
          <textarea
            name="doc1_explanation"
            value={form.doc1_explanation}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Nome do documento 2:</label>
          <input
            name="doc2_name"
            value={form.doc2_name}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Explicação do documento 2:</label>
          <textarea
            name="doc2_explanation"
            value={form.doc2_explanation}
            onChange={handleChange}
            className="form-input"
          />
        </div>
        <button type="submit" className="form-button">
          <span className="button-text">Gerar PDF</span>
        </button>
      </form>
    </div>
  );
}

export default App;
