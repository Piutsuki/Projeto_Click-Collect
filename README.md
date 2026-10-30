# Click & Collect

Protótipo de uma vitrine de produtos com carrinho e painel demonstrativo de pedidos para retirada na loja.

## O que está implementado

- Catálogo com três produtos de exemplo e imagens locais.
- Inclusão de produtos no carrinho.
- Ajuste de quantidade, remoção de itens e cálculo do total.
- Botão **Agendar Retirada**, que cria um número de pedido e o guarda no navegador.
- Painel de funcionário que lista pedidos locais, permite buscar por número/nome e mudar o status de **Pendente** para **Pronto** e **Finalizado**.

## Como funciona

O projeto usa HTML, CSS e JavaScript. O carrinho e os pedidos são guardados no `localStorage` do navegador, nas chaves `cc_cart_v1` e `cc_orders_v1`. Não há servidor, banco de dados ou sincronização entre dispositivos.

Para acompanhar um pedido nas diferentes telas, abra-as no mesmo navegador e na mesma origem. Se o armazenamento não compartilhar dados ao abrir os arquivos diretamente com `file://`, sirva a pasta por um servidor HTTP estático.

### Páginas

- Catálogo: `Click & Collect/cliente/cliente.html`
- Carrinho: `Click & Collect/carrinho/carrinho.html`
- Painel do funcionário: `Click & Collect/funcionario/funcionario.html`

## Limitações atuais

Este repositório contém um protótipo demonstrativo, não um sistema pronto para operar uma loja:

- O campo de busca do catálogo e o botão **Ver** ainda não filtram nem exibem detalhes reais dos produtos.
- O agendamento é apenas um registro local; não coleta dados do cliente nem data ou horário de retirada.
- O painel usa pedidos de exemplo quando ainda não existem pedidos locais. Não recebe pedidos de outros navegadores ou dispositivos.
- Não há login, controle de estoque, pagamento, backend, banco de dados ou persistência compartilhada.

Use dados fictícios durante demonstrações. Não registre informações reais de clientes neste protótipo.

## Estrutura

- `cliente/`: catálogo, estilos e lógica para adicionar produtos ao carrinho.
- `carrinho/`: itens, quantidades, total e criação local de pedidos.
- `funcionario/`: listagem, busca e atualização de status dos pedidos.
- `assets/imagens/`: imagens dos produtos de exemplo.
