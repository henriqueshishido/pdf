import React, { useState } from 'react';
import axios from 'axios';
import './Formulario.css';  // Importando o arquivo CSS

function App() {
  const [form, setForm] = useState({
    data: new Date().toISOString().split("T")[0],
    dia: new Date().toISOString().split("T")[0].split("-")[2],
    mes: getNomeMes(new Date().toISOString().split("T")[0].split("-")[1]),
    ano: new Date().toISOString().split("T")[0].split("-")[0],
    empresa_nome: '',
    empresa_endereco: '',
    empresa_telefone: '',
    nome: '',
    email: '',
    curso: '',
    periodo: '',
    convalidacao_inicio: '',
    convalidacao_fim: '',
    empresa_supervisor: '',
    atividades_desenvolvidas: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "convalidacao_inicio" || name === "convalidacao_fim") {
      setForm({ ...form, [name]: formatarDataParaState(value) });
    } else if (name === "data") {
      const data = value.split("-");
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
  };


  function formatarDataParaState(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`; // Converte para dd/mm/aaaa
  }

  function getDataParaInput(data) {
    if (!data) return "";
    const [dia, mes, ano] = data.split("/");
    return `${ano}-${mes}-${dia}`; // Converte para aaaa-mm-dd
  }

  function getNomeMes(mes) {
    const meses = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    return meses[parseInt(mes, 10) - 1] || 'Mês inválido';
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = 'http://localhost:3001/TCC2_declaracao_supervisor_atividades-pdf';

    try {
      const response = await axios.post(url, form, {
        responseType: 'blob'
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `TCC2 - Declaracao Supervisor - ${form.nome}.pdf`);
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
      <h2>TCC1 - Declaração do Supervisor/Cliente</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label className="form-label">Data da declaração:</label>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>

        <fieldset>
          <legend>Empresa</legend>

          <div className="form-group">
            <input
              type="text"
              placeholder='Nome da empresa'
              name="empresa_nome"
              value={form.empresa_nome}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <textarea
              type="text"
              placeholder='Endereço completo da empresa (rua, número, bairro, cidade, estado, cep)'
              name="empresa_endereco"
              value={form.empresa_endereco}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="tel"
              placeholder='Telefone de contato'
              name="empresa_telefone"
              value={form.empresa_telefone}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              name="empresa_supervisor"
              placeholder='Supervisor na empresa'
              value={form.empresa_supervisor}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Aluno</legend>

          <div className="form-group">
            <input
              type="text"
              placeholder='Nome completo'
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder='E-mail'
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              name="curso"
              placeholder='Curso'
              value={form.curso}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              name="periodo"
              placeholder='Período atual no curso'
              value={form.periodo}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Dados da convalidação</legend>
          <div className="form-group">
            <label>Início do período de convalidação:</label>
            <input
              name="convalidacao_inicio"
              placeholder='Data de início do trabalho/estágio'
              title='Data do início do trabalho/estágio'
              type="date"
              value={getDataParaInput(form.convalidacao_inicio)}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Término do período de convalidação:</label>
            <input
              name="convalidacao_fim"
              placeholder='Data do fim do trabalho/estágio'
              title='Data do fim do trabalho/estágio'
              type="date"
              value={getDataParaInput(form.convalidacao_fim)}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <textarea
              name="atividades_desenvolvidas"
              placeholder='Atividades desenvolvidas na empresa'
              value={form.atividades_desenvolvidas}
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
