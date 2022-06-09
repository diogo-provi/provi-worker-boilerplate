<p align="center">
  <img src="https://media-exp1.licdn.com/dms/image/C4E0BAQHNbnUnjosPdQ/company-logo_200_200/0/1575397110783?e=2159024400&v=beta&t=mRJfaeQQLAtvpo3PBGCoW27owyWY-x2nRUHskUVsI8o" alt="Logo Provi" width="80" height="80">
</p>
<h1 align="center">
  Queue Boilerplate
</h1>

Este é um projeto com um *Boilerplate* de uma aplicação Back-end para tratar filas no SQS da AWS utilizando NodeJS.

A ideia deste projeto é demonstrar uma estrutura para a criação de mensagens na fila (producer) e consumo dessas mensagens (consumer).

## Motivação

Muitas aplicações podem implementar estratégias diferentes para publicar e consumir as mensagens na fila do SQS.

Com isso, podemos ter aplicações que tratam ou não, por exemplo, o sistema de retentativas.

A ideia deste projeto é apresentar uma solução bastante simples, que pode ser replicada nas aplicações que precisarem deste tipo de comunicação.


# Estrutura da Aplicação

Essa aplicação possui a seguinte estrutura

```
.
├── README.md <- É este arquivo
├── package.json <- É onde estão definidas as configurações da aplicação
├── src
│   ├── clients <- Padrão para clients do projeto
│   │   └── queue
│   │       ├── queueConsumerClient.ts <- Interface para um client de fila (consumidor)
│   │       ├── queueConsumerClientSQS.ts <- Implementação AWS SQS (consumidor)
│   │       ├── queueProducerClient.ts <- Interface para um client de fila (produtor)
│   │       ├── queueProducerClientSQS.ts <- Implementação AWS SQS (produtor)
│   │       └── queueTypes.ts <- São os tipos definidos para as filas
│   ├── config
│   │   ├── awsSQS.ts <- Configuração do SQS
│   │   └── configQueue.ts <- Configuração das Filas
│   ├── consumer.ts <- Aquivo de exemplo de utilização de um consumidor
│   ├── jobs
│   │   ├── baseJob.ts <- Estrutura base de um Job
│   │   ├── index.ts <- Exportação de todos os Jobs
│   │   └── jobCreateResouceSample.ts <- Exemplo de como construir um Job
│   └── producer.ts <- Aquivo de exemplo de utilização de um produtor
└── .env.example <- Variáveis que precisam ser preenchidas
```

# Instalação

Para instalar a aplicação, execute:

```bash
npm install
```

# Tecnologias utilizadas

Este projeto foi desenvolvido utilizando TypeScript.

Além disso são dependências deste projeto:

- aws-sdk
- sqs-consumer

# Comandos disponíveis

Os seguintes scripts estão disponíveis:

- `npm run clean` - Limpa as builds anteriores;
- `npm run build` - Cria uma nova Build;
- `npm run consumer:dev` - Executa em ambiente de desenvolvimento o consumer;
- `npm run producer:dev` - Executa em ambiente de desenvolvimento o producer;
- `npm run consumer` - Executa o consumer;
- `npm run producer` - Executa o producer;


# Configurações do Projeto

Este projeto já está configurado com as tecnologias comuns para manter uma desenvolvimento consistente entre diferentes desenvolvedores.

Certifique-se que seu ambiente de desenvolvimento está preparado para ler corretamente as tecnologias:

- `.editorconfig`
- `.eslintrc.js`
- `.tsconfig.json`

É importante também preencher as variáveis no arquivo `.env`

Para isso, duplique o `.env.example` e preencha as informações:

```
AWS_SQS_REGION=
AWS_QUEUE_NAME=
AWS_ACCOUNT_ID=
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_SQL_BASE_PATH=
```

# O que essa aplicação faz?

O produtor da aplicação irá criar 5 mensagens na fila com o seguinte payload:

```js
const payload = {
  id: crypto.randomUUID(),
  message: crypto.randomUUID(),
}
```

O consumidor desta aplicação irá ficar escutando essa fila.

Neste exemplo, pretende-se mostrar o que acontece caso ocorra um erro as ações que devem ser executadas após a leitura da fila.

Para isso, criou-se uma probabilidade de 1 em 5 para gerar um erro na tratativa desta mensagem:

No arquivo `./src/jobs/jobCreateResouceSample.ts` é possível encontrar:

```js
private async handler(message: Message): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      const messageBody = JSON.parse(message.Body || "");
      console.log(`Mensagem capturada: ${messageBody.id}`);
      const key = Math.floor(Math.random() * 5 + 1);
      console.log(`Falhou? ${key === 1}`);
      if (key === 1) throw new Error();
      console.log(`\n-------------------------------\n`);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
```

Este é o handler que será o responsável por tratar a mensagem recebida.

Utilizou-se no projeto a lib https://github.com/BBC/sqs-consumer (consulte a documentação completa).

Entretanto, basta saber que: se este handler retornar uma promise `resolved`, então a mensagem é consumida e sairá da fila.

Caso ela retorne um `reject` então a mensagem volta para a fila tentará ser processada novamente.

**TODO**: Como melhoria neste projeto podemos tratar a quantidade de erros que foram capturados por uma tentativa de processamento de uma mensagem, e após X tentativas enviar para uma DLX.

# Histórico de Release

- 1.0.0 - Primeira versão do Boilerplate;

# Contribuições

- Faça o clone do repositório do monorepo (https://github.com/provicapital/provi);
- Crie a sua feature branch (`git checkout -b feat/foo`);
- Realize os ajustes;
- Faça o commit (`git commit -am 'add foo'`);
- Faça o push (`git push origin feat/foo`);
- Crie um novo Pull Request;
