const express = require('express');
const cors = require('cors');
const fs = require('fs');
const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const { exec } = require('child_process');
const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post('/TCC_01_Ficha_de_Vinculo-pdf', (req, res) => {
  const { dia, mes, ano, nome, ra, endereco, telefone, email, curso, orientador, coorientador, titulo } = req.body;
  const filename = nome.replaceAll(" ", "_")

  // Carrega o template do docx
  const content = fs.readFileSync('./templates/tcc1_01_vinculo.docx', 'binary');

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '[[', end: ']]' }
  });

  try {
    doc.render({ dia, mes, ano, nome, ra, endereco, telefone, email, curso, orientador, coorientador, titulo });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar o documento');
    return;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Define os arquivos temporários com o ID único
  const tempDocx = `./templates/temp_${filename}.docx`;
  const tempPdf = `./output/temp_${filename}.pdf`;
  const finalPdf = `./output/01_Ficha_de_Vinculo_${filename}.pdf`;

  fs.writeFileSync(tempDocx, buf);

  // Converte o docx para PDF (usando LibreOffice instalado na máquina)
  exec(`libreoffice --headless --convert-to pdf --outdir ./output ${tempDocx}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao converter para PDF');
      return;
    }

    // Agora, renomeie o arquivo PDF temporário para o nome desejado
    fs.rename(tempPdf, finalPdf, (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.status(500).send('Erro ao renomear o arquivo PDF');
        return;
      }

      // Agora, ao invés de usar res.send, use res.download() para garantir o nome correto
      res.download(finalPdf, `01_Ficha_de_Vinculo_${nome}.pdf`, (err) => {
        if (err) {
          console.error('Erro no download:', err);
          res.status(500).send('Erro ao enviar o arquivo');
        }

        // Limpeza de arquivos temporários
        fs.unlinkSync(tempDocx);
        fs.unlinkSync(finalPdf);  // Remove o arquivo PDF renomeado
      });
    });
  });
});

app.post('/TCC_01_Ficha_de_Vinculo-com-coorientador-pdf', (req, res) => {
  const { dia, mes, ano, nome, ra, endereco, telefone, email, curso, orientador, coorientador, titulo } = req.body;
  const filename = nome.replaceAll(" ", "_")

  // Carrega o template do docx
  const content = fs.readFileSync('./templates/tcc1_01_vinculo-coorientador.docx', 'binary');

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '[[', end: ']]' }
  });

  try {
    doc.render({ dia, mes, ano, nome, ra, endereco, telefone, email, curso, orientador, coorientador, titulo });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar o documento');
    return;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Define os arquivos temporários com o ID único
  const tempDocx = `./templates/temp_${filename}.docx`;
  const tempPdf = `./output/temp_${filename}.pdf`;
  const finalPdf = `./output/01_Ficha_de_Vinculo_${filename}-coorientador.pdf`;

  fs.writeFileSync(tempDocx, buf);

  // Converte o docx para PDF (usando LibreOffice instalado na máquina)
  exec(`libreoffice --headless --convert-to pdf --outdir ./output ${tempDocx}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao converter para PDF');
      return;
    }

    // Agora, renomeie o arquivo PDF temporário para o nome desejado
    fs.rename(tempPdf, finalPdf, (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.status(500).send('Erro ao renomear o arquivo PDF');
        return;
      }

      // Agora, ao invés de usar res.send, use res.download() para garantir o nome correto
      res.download(finalPdf, `01_Ficha_de_Vinculo_${filename}.pdf`, (err) => {
        if (err) {
          console.error('Erro no download:', err);
          res.status(500).send('Erro ao enviar o arquivo');
        }

        // Limpeza de arquivos temporários
        fs.unlinkSync(tempDocx);
        fs.unlinkSync(finalPdf);  // Remove o arquivo PDF renomeado
      });
    });
  });
});

app.post('/TCC_01_Ficha_de_Autorizacao-pdf', (req, res) => {
  const { dia, mes, ano, nome, ra, curso, orientador, coorientador, titulo, avaliador1, avaliador2, avaliador3, avaliador4 } = req.body;
  const filename = nome.replaceAll(" ", "_")

  // Carrega o template do docx
  const content = fs.readFileSync('./templates/tcc1_02_autorizacao.docx', 'binary');

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '[[', end: ']]' }
  });

  try {
    doc.render({ dia, mes, ano, nome, ra, curso, orientador, coorientador, titulo, avaliador1, avaliador2, avaliador3, avaliador4 });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar o documento');
    return;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Define os arquivos temporários com o ID único
  const tempDocx = `./templates/temp_${filename}.docx`;
  const tempPdf = `./output/temp_${filename}.pdf`;
  const finalPdf = `./output/01_Ficha_de_Autorizacao_${filename}.pdf`;

  fs.writeFileSync(tempDocx, buf);

  // Converte o docx para PDF (usando LibreOffice instalado na máquina)
  exec(`libreoffice --headless --convert-to pdf --outdir ./output ${tempDocx}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao converter para PDF');
      return;
    }

    // Agora, renomeie o arquivo PDF temporário para o nome desejado
    fs.rename(tempPdf, finalPdf, (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.status(500).send('Erro ao renomear o arquivo PDF');
        return;
      }

      // Agora, ao invés de usar res.send, use res.download() para garantir o nome correto
      res.download(finalPdf, `01_Ficha_de_Vinculo_${nome}.pdf`, (err) => {
        if (err) {
          console.error('Erro no download:', err);
          res.status(500).send('Erro ao enviar o arquivo');
        }

        // Limpeza de arquivos temporários
        fs.unlinkSync(tempDocx);
        fs.unlinkSync(finalPdf);  // Remove o arquivo PDF renomeado
      });
    });
  });
});

app.post('/TCC_03_Ficha_de_Convalidacao-pdf', (req, res) => {
  const { dia, mes, ano, nome, ra, curso, orientador, endereco, telefone, email, inicio_curso, coorientador, titulo, doc1_name, doc2_name, doc1_explanation, doc2_explanation, experiencia_meses, experiencia_inicio, experiencia_fim } = req.body;
  const filename = nome.replaceAll(" ", "_")

  // Carrega o template do docx
  const content = fs.readFileSync('./templates/tcc1_03_convalidacao.docx', 'binary');

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '[[', end: ']]' }
  });

  try {
    doc.render({ dia, mes, ano, nome, ra, curso, orientador, telefone, endereco, email, inicio_curso, coorientador, titulo, doc1_name, doc2_name, doc1_explanation, doc2_explanation, experiencia_meses, experiencia_inicio, experiencia_fim });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar o documento');
    return;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Define os arquivos temporários com o ID único
  const tempDocx = `./templates/temp_${filename}.docx`;
  const tempPdf = `./output/temp_${filename}.pdf`;
  const finalPdf = `./output/03_Ficha_de_Convalidacao_${filename}.pdf`;

  fs.writeFileSync(tempDocx, buf);

  // Converte o docx para PDF (usando LibreOffice instalado na máquina)
  exec(`libreoffice --headless --convert-to pdf --outdir ./output ${tempDocx}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao converter para PDF');
      return;
    }

    // Agora, renomeie o arquivo PDF temporário para o nome desejado
    fs.rename(tempPdf, finalPdf, (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.status(500).send('Erro ao renomear o arquivo PDF');
        return;
      }

      // Agora, ao invés de usar res.send, use res.download() para garantir o nome correto
      res.download(finalPdf, `01_Ficha_de_Vinculo_${nome}.pdf`, (err) => {
        if (err) {
          console.error('Erro no download:', err);
          res.status(500).send('Erro ao enviar o arquivo');
        }

        // Limpeza de arquivos temporários
        fs.unlinkSync(tempDocx);
        fs.unlinkSync(finalPdf);  // Remove o arquivo PDF renomeado
      });
    });
  });
});

app.post('/TCC1_declaracao_supervisor_atividades-pdf', (req, res) => {
  const { dia, mes, ano, nome, ra, curso, email, periodo, empresa_nome, empresa_endereco, empresa_telefone, convalidacao_inicio, convalidacao_fim, empresa_supervisor, atividades_desenvolvidas } = req.body;
  const filename = nome.replaceAll(" ", "_")

  // Carrega o template do docx
  const content = fs.readFileSync('./templates/tcc1_declaração_supervisor_atividades.docx', 'binary');

  console.log("cheguei aqui")

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '[[', end: ']]' }
  });

  try {
    doc.render({ dia, mes, ano, nome, ra, curso, email, periodo, empresa_nome, empresa_endereco, empresa_telefone, convalidacao_inicio, convalidacao_fim, empresa_supervisor, atividades_desenvolvidas });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar o documento');
    return;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Define os arquivos temporários com o ID único
  const tempDocx = `./templates/temp_${filename}.docx`;
  const tempPdf = `./output/temp_${filename}.pdf`;
  const finalPdf = `./output/04_Declaracao_Supervisor_Atividades_${filename}.pdf`;

  fs.writeFileSync(tempDocx, buf);

  // Converte o docx para PDF (usando LibreOffice instalado na máquina)
  exec(`libreoffice --headless --convert-to pdf --outdir ./output ${tempDocx}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao converter para PDF');
      return;
    }

    // Agora, renomeie o arquivo PDF temporário para o nome desejado
    fs.rename(tempPdf, finalPdf, (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.status(500).send('Erro ao renomear o arquivo PDF');
        return;
      }

      // Agora, ao invés de usar res.send, use res.download() para garantir o nome correto
      res.download(finalPdf, `01_Ficha_de_Vinculo_${nome}.pdf`, (err) => {
        if (err) {
          console.error('Erro no download:', err);
          res.status(500).send('Erro ao enviar o arquivo');
        }

        // Limpeza de arquivos temporários
        fs.unlinkSync(tempDocx);
        fs.unlinkSync(finalPdf);  // Remove o arquivo PDF renomeado
      });
    });
  });
});


app.post('/TCC2_Ficha_de_Convalidacao-pdf', (req, res) => {
  const { dia, mes, ano, nome, ra, curso, orientador, endereco, telefone, email, inicio_curso, coorientador, titulo, doc1_name, doc2_name, doc1_explanation, doc2_explanation, experiencia_meses, experiencia_inicio, experiencia_fim } = req.body;
  const filename = nome.replaceAll(" ", "_")

  // Carrega o template do docx
  const content = fs.readFileSync('./templates/tcc2_convalidacao.docx', 'binary');

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '[[', end: ']]' }
  });

  try {
    doc.render({ dia, mes, ano, nome, ra, curso, orientador, telefone, endereco, email, inicio_curso, coorientador, titulo, doc1_name, doc2_name, doc1_explanation, doc2_explanation, experiencia_meses, experiencia_inicio, experiencia_fim });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar o documento');
    return;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Define os arquivos temporários com o ID único
  const tempDocx = `./templates/temp_${filename}.docx`;
  const tempPdf = `./output/temp_${filename}.pdf`;
  const finalPdf = `./output/Ficha_de_Convalidacao_${filename}.pdf`;

  fs.writeFileSync(tempDocx, buf);

  // Converte o docx para PDF (usando LibreOffice instalado na máquina)
  exec(`libreoffice --headless --convert-to pdf --outdir ./output ${tempDocx}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao converter para PDF');
      return;
    }

    // Agora, renomeie o arquivo PDF temporário para o nome desejado
    fs.rename(tempPdf, finalPdf, (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.status(500).send('Erro ao renomear o arquivo PDF');
        return;
      }

      // Agora, ao invés de usar res.send, use res.download() para garantir o nome correto
      res.download(finalPdf, `Ficha_de_Convalidacao_${nome}.pdf`, (err) => {
        if (err) {
          console.error('Erro no download:', err);
          res.status(500).send('Erro ao enviar o arquivo');
        }

        // Limpeza de arquivos temporários
        fs.unlinkSync(tempDocx);
        fs.unlinkSync(finalPdf);  // Remove o arquivo PDF renomeado
      });
    });
  });
});

app.post('/TCC2_declaracao_supervisor_atividades-pdf', (req, res) => {
  const { dia, mes, ano, nome, ra, curso, email, periodo, empresa_nome, empresa_endereco, empresa_telefone, convalidacao_inicio, convalidacao_fim, empresa_supervisor, atividades_desenvolvidas } = req.body;
  const filename = nome.replaceAll(" ", "_")

  // Carrega o template do docx
  const content = fs.readFileSync('./templates/tcc2_declaração_supervisor_atividades.docx', 'binary');

  console.log("cheguei aqui")

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '[[', end: ']]' }
  });

  try {
    doc.render({ dia, mes, ano, nome, ra, curso, email, periodo, empresa_nome, empresa_endereco, empresa_telefone, convalidacao_inicio, convalidacao_fim, empresa_supervisor, atividades_desenvolvidas });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar o documento');
    return;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Define os arquivos temporários com o ID único
  const tempDocx = `./templates/temp_${filename}.docx`;
  const tempPdf = `./output/temp_${filename}.pdf`;
  const finalPdf = `./output/04_Declaracao_Supervisor_Atividades_${filename}.pdf`;

  fs.writeFileSync(tempDocx, buf);

  // Converte o docx para PDF (usando LibreOffice instalado na máquina)
  exec(`libreoffice --headless --convert-to pdf --outdir ./output ${tempDocx}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao converter para PDF');
      return;
    }

    // Agora, renomeie o arquivo PDF temporário para o nome desejado
    fs.rename(tempPdf, finalPdf, (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.status(500).send('Erro ao renomear o arquivo PDF');
        return;
      }

      // Agora, ao invés de usar res.send, use res.download() para garantir o nome correto
      res.download(finalPdf, `01_Ficha_de_Vinculo_${nome}.pdf`, (err) => {
        if (err) {
          console.error('Erro no download:', err);
          res.status(500).send('Erro ao enviar o arquivo');
        }

        // Limpeza de arquivos temporários
        fs.unlinkSync(tempDocx);
        fs.unlinkSync(finalPdf);  // Remove o arquivo PDF renomeado
      });
    });
  });
});


app.post('/TCC_02_Ficha_de_Autorizacao-pdf', (req, res) => {
  const { dia, mes, ano, nome, ra, curso, orientador, coorientador, titulo, choice_dp, choice_conv } = req.body;
  const filename = nome.replaceAll(" ", "_")

  // Carrega o template do docx
  const content = fs.readFileSync('./templates/tcc2_01_Ficha_de_autorização.docx', 'binary');

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '[[', end: ']]' }
  });

  try {
    doc.render({ dia, mes, ano, nome, ra, curso, orientador, coorientador, titulo, choice_dp, choice_conv });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar o documento');
    return;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Define os arquivos temporários com o ID único
  const tempDocx = `./templates/temp_${filename}.docx`;
  const tempPdf = `./output/temp_${filename}.pdf`;
  const finalPdf = `./output/01_Ficha_de_Autorizacao_${filename}.pdf`;

  fs.writeFileSync(tempDocx, buf);

  // Converte o docx para PDF (usando LibreOffice instalado na máquina)
  exec(`libreoffice --headless --convert-to pdf --outdir ./output ${tempDocx}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao converter para PDF');
      return;
    }

    // Agora, renomeie o arquivo PDF temporário para o nome desejado
    fs.rename(tempPdf, finalPdf, (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.status(500).send('Erro ao renomear o arquivo PDF');
        return;
      }

      // Agora, ao invés de usar res.send, use res.download() para garantir o nome correto
      res.download(finalPdf, `01_Ficha_de_Autorizacao_${nome}.pdf`, (err) => {
        if (err) {
          console.error('Erro no download:', err);
          res.status(500).send('Erro ao enviar o arquivo');
        }

        // Limpeza de arquivos temporários
        fs.unlinkSync(tempDocx);
        fs.unlinkSync(finalPdf);  // Remove o arquivo PDF renomeado
      });
    });
  });
});



app.post('/TCC_02_Ficha_de_Avaliacao-pdf', (req, res) => {
  const { dia, mes, ano, nome, ra, curso, orientador, coorientador, titulo, choice_dp, choice_conv, avaliador1, avaliador2, choice_aprovado, choice_reprovado, indicacao } = req.body;
  const filename = nome.replaceAll(" ", "_")

  // Carrega o template do docx
  const content = fs.readFileSync('./templates/tcc2_avaliacao.docx', 'binary');

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '[[', end: ']]' }
  });

  try {
    doc.render({ dia, mes, ano, nome, ra, curso, orientador, coorientador, titulo, choice_dp, choice_conv, avaliador1, avaliador2, choice_aprovado, choice_reprovado, indicacao });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar o documento');
    return;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Define os arquivos temporários com o ID único
  const tempDocx = `./templates/temp_${filename}.docx`;
  const tempPdf = `./output/temp_${filename}.pdf`;
  const finalPdf = `./output/01_Ficha_de_Avaliacao_${filename}.pdf`;

  fs.writeFileSync(tempDocx, buf);

  // Converte o docx para PDF (usando LibreOffice instalado na máquina)
  exec(`libreoffice --headless --convert-to pdf --outdir ./output ${tempDocx}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao converter para PDF');
      return;
    }

    // Agora, renomeie o arquivo PDF temporário para o nome desejado
    fs.rename(tempPdf, finalPdf, (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.status(500).send('Erro ao renomear o arquivo PDF');
        return;
      }

      // Agora, ao invés de usar res.send, use res.download() para garantir o nome correto
      res.download(finalPdf, `01_Ficha_de_Avaliacao_${nome}.pdf`, (err) => {
        if (err) {
          console.error('Erro no download:', err);
          res.status(500).send('Erro ao enviar o arquivo');
        }

        // Limpeza de arquivos temporários
        fs.unlinkSync(tempDocx);
        fs.unlinkSync(finalPdf);  // Remove o arquivo PDF renomeado
      });
    });
  });
});


app.post('/TCC_02_Ficha_de_Avaliacao-pdf-coorientador-pdf', (req, res) => {
  const { dia, mes, ano, nome, ra, curso, orientador, coorientador, titulo, choice_dp, choice_conv, avaliador1, avaliador2, choice_aprovado, choice_reprovado, indicacao } = req.body;
  const filename = nome.replaceAll(" ", "_")

  // Carrega o template do docx
  const content = fs.readFileSync('./templates/tcc2_avaliacao-coorientador.docx', 'binary');

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '[[', end: ']]' }
  });

  try {
    doc.render({ dia, mes, ano, nome, ra, curso, orientador, coorientador, titulo, choice_dp, choice_conv, avaliador1, avaliador2, choice_aprovado, choice_reprovado, indicacao });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar o documento');
    return;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Define os arquivos temporários com o ID único
  const tempDocx = `./templates/temp_${filename}.docx`;
  const tempPdf = `./output/temp_${filename}.pdf`;
  const finalPdf = `./output/01_Ficha_de_Avaliacao_${filename}.pdf`;

  fs.writeFileSync(tempDocx, buf);

  // Converte o docx para PDF (usando LibreOffice instalado na máquina)
  exec(`libreoffice --headless --convert-to pdf --outdir ./output ${tempDocx}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao converter para PDF');
      return;
    }

    // Agora, renomeie o arquivo PDF temporário para o nome desejado
    fs.rename(tempPdf, finalPdf, (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.status(500).send('Erro ao renomear o arquivo PDF');
        return;
      }

      // Agora, ao invés de usar res.send, use res.download() para garantir o nome correto
      res.download(finalPdf, `01_Ficha_de_Avaliacao_${nome}.pdf`, (err) => {
        if (err) {
          console.error('Erro no download:', err);
          res.status(500).send('Erro ao enviar o arquivo');
        }

        // Limpeza de arquivos temporários
        fs.unlinkSync(tempDocx);
        fs.unlinkSync(finalPdf);  // Remove o arquivo PDF renomeado
      });
    });
  });
});



app.post('/TCC_Declaracao_Correcao-pdf', (req, res) => {
  const { dia, mes, ano, nome, ra, curso, orientador, coorientador, titulo, choice_dp, choice_conv, avaliador1, avaliador2, choice_aprovado, choice_reprovado, indicacao } = req.body;
  const filename = nome.replaceAll(" ", "_")

  // Carrega o template do docx
  const content = fs.readFileSync('./templates/tcc2_declaração_correcao.docx', 'binary');

  const zip = new PizZip(content);
  const doc = new Docxtemplater(zip, {
    paragraphLoop: true,
    linebreaks: true,
    delimiters: { start: '[[', end: ']]' }
  });

  try {
    doc.render({ dia, mes, ano, nome, ra, curso, orientador, coorientador, titulo, choice_dp, choice_conv, avaliador1, avaliador2, choice_aprovado, choice_reprovado, indicacao });
  } catch (error) {
    console.error(error);
    res.status(500).send('Erro ao gerar o documento');
    return;
  }

  const buf = doc.getZip().generate({ type: 'nodebuffer' });

  // Define os arquivos temporários com o ID único
  const tempDocx = `./templates/temp_${filename}.docx`;
  const tempPdf = `./output/temp_${filename}.pdf`;
  const finalPdf = `./output/Declaracao_Correcao_${filename}.pdf`;

  fs.writeFileSync(tempDocx, buf);

  // Converte o docx para PDF (usando LibreOffice instalado na máquina)
  exec(`libreoffice --headless --convert-to pdf --outdir ./output ${tempDocx}`, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Erro ao converter para PDF');
      return;
    }

    // Agora, renomeie o arquivo PDF temporário para o nome desejado
    fs.rename(tempPdf, finalPdf, (renameErr) => {
      if (renameErr) {
        console.error(renameErr);
        res.status(500).send('Erro ao renomear o arquivo PDF');
        return;
      }

      // Agora, ao invés de usar res.send, use res.download() para garantir o nome correto
      res.download(finalPdf, `Declaracao_Correcao_${nome}.pdf`, (err) => {
        if (err) {
          console.error('Erro no download:', err);
          res.status(500).send('Erro ao enviar o arquivo');
        }

        // Limpeza de arquivos temporários
        fs.unlinkSync(tempDocx);
        fs.unlinkSync(finalPdf);  // Remove o arquivo PDF renomeado
      });
    });
  });
});


app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
