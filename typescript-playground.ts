import readline from "node:readline/promises"
import { stdin as input, stdout as output } from "node:process"

const rl = readline.createInterface({ input, output })

class Pessoa {
    dinheiroEmMao: number;
    private preso: boolean;
    private nome: string;

    constructor(name: string) {
        this.nome = name;
        this.dinheiroEmMao = 10;
        this.preso = false;
        console.log(`Bem vindo a vida, ${this.nome}!`);
    }
    
    serPreso(): void {
        this.preso = true;
    }

    esta_preso(): boolean {
        return this.preso;
    }

    async roubar(): Promise<void> {
        let resposta = await rl.question("Vai mesmo roubar na tora? [S/N] ");
        if (resposta == "S") {
            let num = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            let num_azar = Math.floor(Math.random() * (5 - 1 + 1)) + 1;
            
            if (num == num_azar) {
                console.log("Infelizmente, você foi pego e foi preso");
                this.serPreso();
            } else {
                console.log(`você escapou por pouco! ${num} | ${num_azar}`)
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
    var p = new Pessoa("Neptune")
    var c = new ContaBancaria(p)
    await p.roubar();
    c.verExtrato();
    rl.close()
}

main()