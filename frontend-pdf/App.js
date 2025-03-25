import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [form, setForm] = useState({
        nome: '',
        email: '',
        mensagem: ''
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/gerar-pdf', form, {
                responseType: 'blob' // importante para pegar o PDF como arquivo
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'documento.pdf');
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Erro ao gerar o PDF', error);
        }
    };

    return (
        <div style={{ padding: '50px' }}>
            <h2>Formulário para gerar PDF</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nome:</label>
                    <input type="text" name="nome" value={form.nome} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Mensagem:</label>
                    <textarea name="endereco" value={form.endereco} onChange={handleChange} required />
                </div>
                <button type="submit">Gerar PDF</button>
            </form>
        </div>
    );
}

export default App;
