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
    email: '',
    endereco: '',
    curso: '',
    orientador: '',
    coorientador: '',
    titulo: '',
  });

  const [checkboxChecked, setCheckboxChecked] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleData = (e) => {
    const data = e.target.value.split("-");
    setForm({ ...form, dia: data[2], mes: getNomeMes(data[1]), ano: data[0], data: e.target.value });
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
    const url = checkboxChecked
      ? 'http://localhost:3001/TCC_01_Ficha_de_Vinculo-com-coorientador-pdf'  // Rota para incluir coorientador
      : 'http://localhost:3001/TCC_01_Ficha_de_Vinculo-pdf';  // Rota sem coorientador

    try {
      const response = await axios.post(url, form, {
        responseType: 'blob'
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', `01_Ficha_de_Vinculo - ${form.nome}.pdf`);
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
      <h2>TCC1 - Ficha de Vínculo</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Data da ficha:</label>
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
            type="number"
            name="ra"
            placeholder='RA (Registro Acadêmico)'
            value={form.ra}
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
          <textarea
            name="endereco"
            placeholder='Endereço completo (rua, número, bairro, cidade, estado, cep)'
            value={form.endereco}
            onChange={handleChange}
            required
            className="form-textarea"
          />
        </div>
        <div className="form-group">
          <input
            name="telefone"
            placeholder='Telefone/Celular'
            type="tel"
            value={form.telefone}
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
            name="orientador"
            placeholder='Nome do orientador'
            value={form.orientador}
            onChange={handleChange}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>
            Incluir coorientador?
          </label>
          <input
            type="checkbox"
            checked={checkboxChecked}
            onChange={handleCheckboxChange}
          />
        </div>

        {checkboxChecked && (
          <div className="form-group">
            <input
              name="coorientador"
              placeholder='Nome do co-orientador'
              value={form.coorientador}
              onChange={handleChange}
              required={checkboxChecked} // Torna obrigatório se o checkbox estiver marcado
              className="form-input"
            />
          </div>
        )}

        <div className="form-group">
          <textarea
            name="titulo"
            placeholder='Título do trabalho'
            value={form.titulo}
            onChange={handleChange}
            required
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
