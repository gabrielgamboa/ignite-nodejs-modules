#App

GymPass style app.

## RFs (Requisitos funcionais)

- [ ] Deve ser possível se cadastrar;
- [ ] Deve ser possível se autenticar;
- [ ] Deve ser possível obter o perfil de um usuário logado
- [ ] Deve ser possível obter o número de checkins realizados pelo usuário logado
- [ ] Deve ser possível o usuário obter seu histórico de checkins
- [ ] Deve ser possível o usuário buscar academias mais próximas 
- [ ] Deve ser possível o usuário buscar academias pelo nome
- [ ] Deve ser possível o usuário realizar checkin em uma academia
- [ ] Deve ser possível validar o checkin de um usuário
- [ ] Deve ser possível cadastrar uma academia;

## RNs (Regras de negócio)

- [ ] O usuário não deve poder se cadastrar com um email duplicado
- [ ] O usuário não pode fazer dois check-ins no mesmo dia
- [ ] O usuário não pode fazer check-in se não estiver perto (100m) da academia
- [ ] O check-in só pode ser validado até 20 minutos após criado
- [ ] O check-in só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## RNFs (Requisitos não funcionais)

- [ ] A senha do usuário precisa estar criptografada
- [ ] Os dados da aplicação precisa estar persistidos em um banco postgres
- [ ] Todas listas de dados precisa estar paginados em 20 itens por pagina
- [ ] O usuário deve ser identificado por um JWT (JSON WEB TOKEN)