# STI
Lucas Sampaio Franco - GRR20166836
Nicolas Dencker de Marco - GRR20171605
## Sobre o projeto
Projeto baseado no boilerplate [Typescript Starter](https://github.com/nea/Typescript-Starter/).

Como rodar:

```
yarn start
```


Exercício 1: "Envie as mudanças para o repositório remoto (origin) na branc master."

steps:
    git add .
    git commit -m "<msg>" 
    git push origin master

dicas: 
"Dica: Adicione os arquivos na área temporária (stage)"
"Dica Termine de enviar as alterações para o git."
"Dica: Envie as alterações para o respositório remoto"

Exercício 2: "Crie uma nova branch e adicione ela no repositório remoto"

steps:
    git checkout -b <nome-branch>
    git push origin <nome-branch> 

dicas:
"Dica: Mude de branch utilizando uma flag que cria essa nova branch"
"Dica: Dê push nessa nova branch"

Exercício 3: Digamos que você já possui um projeto local sem Git e quer adicionar esse projeto à nova branch master em um repositório existente remoto do Git. Esse repositório possui o link https://github.com/demarco-sampaio/exercicio.git. Como podemos fazer isso?

steps:
    git init
    git remote add origin <link>
    git push -u origin master

dicas:
"Dica: Crie um novo repositório do Git"
"Dica: Crie uma nova conexão com o repositório remoto passando a origem e a url do repositório ao comando."
"Dica: Dê push ao repositório para a nova branch master. Por essa branch não existir no repositório remoto é preciso adicionar uma flag junto ao comando." 


Exercício 4: "Digamos que você está na branch master no repositório local (não está atualizado com o repositório remoto), você quer atualizar sua branch "feature/exercicio-mescla" com a branch master. Como podemos fazer isso?"

steps:
    git fetch
    git pull
    git checkout <feature>
    git merge origin master

dicas:
"Dica: Atualize todo o seu repositório local com o seu repositório remoto."
"Dica: Atualize a sua branch master do repositório local com a branch master do repositório remoto."
"Dica: Mude da branch master para a branch 'feature/exercicio-mescla'"
"Dica: Faça a mescla da sua branch master dentro da branch 'feature/exercicio-mescla'"

Exercício 5: "Digamos que vc tem um último commit já pushado na branch do seu repositório remoto, mas percebeu que precisa adicionar novas mudanças nesse commit já pushado. Como vc pode fazer isso?

steps:
    git add .
    git commit --amend --no-edit
    git push --force-with-lease

dicas: 
"Dica: Adicione os arquivos na área temporária (stage)"
"Dica: Termine de enviar as alterações para o git usando flags para juntar o commit atual com o último feito e sinalizar que não tem mensagem nova."
"Dica: De push nesse commit com uma flag que força a alteração, mas apenas quando não tem outros novos commits no repositório remoto."