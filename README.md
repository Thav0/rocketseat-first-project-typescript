# Recuperação de senha

**RF**

- O usuário deve poder recuperar sua senha informando o seu e-mail;
- O usuário deve receber um e-mail com instruções de recuperação de senha;
- O usuário deve poder resetar sua senha;


**RNF**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento
- Utilizar Amazon SES para envios em produção
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**

- O link enviado por email para resetar a senha, deve expirar em 2h
- O usuário precisa confirmar a nova senha ao reseta-la

# Atualização do Perfil

**RF**

- O usu+ario deve poder atualizar seu nome, email e senha

**RN**

- O usuário não pode alterar seu email para um email já utilizado
- Para atualizar sua senha, deve ser informado a senha antiga
- Para atualizar sua senha, deve informar a senha atual

# Painel do prestador

**RF**
- O usuario deve poder listar os agendamentos num dia especifico
- O prestador deve receber uma notificação sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificações não lidas

**RNF**

- Os agendamentos do prestador no dia devem ser armazenados em cache
- As notificações do prestador devem ser armazenadas no MongoDB
- As notificações do prestador devem ser enviadas em tempo-real utilizando Socket.io

**RN**
- A notificação deve ter um status de lida ou não-lida para que o prestador possa controlar

# Agendamento de serviços

**RF**

- O usuario deve poder lsitar todos prestadores de serviço cadastrados
- O usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador
- O usuario deve poder listar horarios disponiveis num dia especifico de um prestador
- O usuario deve poder realizar um novo agendamento com um prestador


**RNF**

- A listagem de prestadores deve ser armazenada em cache

**RN**

- Cada agendamento deve durar 1h exatamente
- Os agendamentos devem estar disponiveis entre as 8h às 18h (Primeiro às 8h, último às 17h)
- O usuário não pode agendar num horário já ocupado
- O usuário não pode agendar num horário que já passou
- O usuário não pode agendar serviços consigo mesmo
