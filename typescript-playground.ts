import readline from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"

const rl = readline.createInterface({ input, output })

class Pessoa {
    dinheiroEmMao: number;
    private preso: boolean;
    private nome: string;
    private vivo: boolean;

    constructor(name: string) {
        this.nome = name;
        this.dinheiroEmMao = 10;
        this.preso = false;
        this.vivo = true;
        console.log(`Bem vindo a vida, ${this.nome}!`);
    }
    
    serPreso(): void {
        this.preso = true;
    }

    morrer(): void {
        console.log("Infelizmente, você morreu");
    }

    esta_preso(): boolean {
        return this.preso;
    }

    async roubar(): Promise<void> {
        let resposta = await rl.question("Vai mesmo roubar na tora? [S/N] ");
        if (resposta == "S") {
            let num = Math.floor(Math.random() * 8) + 1;
            let num_azar = Math.floor(Math.random() * 8) + 1;
            
            if (num == num_azar) {
                console.log("Infelizmente, você foi pego e foi preso");
                this.serPreso();
            } else {
                console.log(`você escapou por pouco! ${num} | ${num_azar} e saiu com ${num} reais!`);
                this.dinheiroEmMao += num;
            }
        } else {
            console.log("Muito bem!")
        }
    }
}

class ContaBancaria {
    private saldo: number;
    private pessoa: Pessoa;
    private extrato: Array<string>;

    constructor(pessoa: Pessoa) {
        this.pessoa = pessoa;
        this.saldo = 0;
        this.extrato = [];
    }
    
    verExtrato(): void {
        for (const ex of this.extrato) {
            console.log(`${ex} \n`)
        }
    }

    verificar_situacao(): boolean {
        return this.pessoa.esta_preso()
    }
}

async function main() {
    var nome = await rl.question("Qual o seu nome? ")
    var p = new Pessoa(nome)
    var c = new ContaBancaria(p)
    
    while (true) {
        var escolha = await rl.question("Bom dia Magnata, o que voce deseja fazer? \n1 - Roubar \n2 - Ver extrato \n3 - Sair \n")
        switch (escolha) {
            case "1":
                await p.roubar();
                break;
            case "2":
                c.verExtrato();
                break;
            case "3":
                console.log("Até mais!")
                rl.close();
                return;
            default:
                console.log("Opção inválida!")
        }
    }
}

main()