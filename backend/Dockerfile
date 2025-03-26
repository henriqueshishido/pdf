# Use uma imagem base oficial do Node.js
FROM node:14

# Instale o LibreOffice
RUN apt-get update && \
    apt-get install -y libreoffice

# Defina o diretório de trabalho
WORKDIR /usr/src/app

# Copie os arquivos do aplicativo
COPY package*.json ./
COPY . .

# Instale as dependências do aplicativo
RUN npm install

# Exponha a porta em que o aplicativo será executado
EXPOSE 3001

# Comando para iniciar o aplicativo
CMD ["node", "index.js"]

