# 🏥 CRUD de Pacientes

Este projeto é um **sistema CRUD de pacientes** desenvolvido em JavaScript, com controle de acesso via **token**, validações de formulário e navegação simples entre áreas do sistema.

O foco é praticar **manipulação de DOM, lógica de validação, estados da interface e organização de fluxo de telas**, simulando um sistema real de cadastro.

---

## ✨ Funcionalidades

### 🔐 Controle de acesso por token

* Existe um **container inicial** que exige um token para liberar o sistema.
* O sistema:

  * Verifica se o token foi informado
  * Valida se o token está correto
* Apenas com o token válido o **container de pacientes** é exibido.

---

### 👤 Cadastro de pacientes

* Formulário com validações para:

  * **Nome**
  * **Idade**
  * **Gênero**
  * **Sintomas**
* Não permite cadastro com campos inválidos ou vazios.
* Após validação, o paciente é adicionado à lista.

---

### 📋 Listagem de pacientes

* Botão **"Pacientes"** exibe todos os pacientes cadastrados.
* Se **não houver pacientes cadastrados**:

  * O sistema exibe um aviso
  * Retorna automaticamente para o início da página

---

### ✏️ Edição de pacientes

* É possível **editar os dados** de um paciente já cadastrado.
* Os campos voltam preenchidos para facilitar a alteração.

---

### 🗑️ Remoção de pacientes

* É possível **remover pacientes da lista**.
* O sistema atualiza a interface imediatamente após a exclusão.

---

### 🧑‍⚕️ Área de médicos

* Área separada do sistema dedicada aos **médicos**.
* Exibe uma página com informações de médicos cadastrados.
* Funciona como um detalhe extra para enriquecer o sistema.

---

## 🛠️ Tecnologias utilizadas

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla JS)**

---

## 🎯 Objetivo do projeto

* Praticar:

  * CRUD completo
  * Validação de dados
  * Manipulação do DOM
  * Controle de fluxo entre telas
  * Organização de código JavaScript

* Simular um sistema de cadastro real com regras claras de acesso.

---

