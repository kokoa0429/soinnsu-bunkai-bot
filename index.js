const { randomInt } = require("crypto")
const Discord = require("discord.js")
const fs = require('fs')


const client = new Discord.Client()
const token = JSON.parse(fs.readFileSync('token.json', 'utf8')).token

let num = new Map()
let gaming = new Map()

let connection

client.on("ready", () => {
    console.log("ready...")
})

client.on("message", message => {
    if (message.author.bot) {
        return
    } else {
        let msg = message.content
        let channel = message.channel
        let author = message.author.username

        if (message.content.startsWith(".i")) {
            const args = message.content.slice(2).trim().split(/ +/)
            if (args[0] === "new") {
                num.set(channel.id,newNumber(10000))
                channel.send(num.get(channel.id) + "を素因数分解してください")
                gaming.set(channel.id, true)
            } else if(args[0] === "help"){
                channel.send(".i new でげーむがかいしできます \n.i [数字]で因数分解できます")
            }
            else if (!isNaN(args[0]) && gaming.get(channel.id)) {
                const n = Number(args[0])
                let nnum = num.get(channel.id)
                if (n <= 1) {
                    return;
                }
                else {
                    if (nnum % n == 0) {
                        if (!isPrimeNumber(n)) {
                            channel.send("素数じゃないようです。。。")
                        } else {
                            nnum /= n
                            channel.send(args[0] + "で割れました。商:" + nnum)
                            num.set(channel.id,nnum)
                        }
                    }
                    if (nnum == 1) {
                        channel.send("ゲームクリアー わーい")
                        gaming.set(channel.id, false)
                    }
                }
            }
            else {
                message.reply("???")
            }
        }
    }
})

client.login(token)

function newNumber(max) {
    for (; ;) {
        const num = Math.floor(Math.random() * Math.floor(max)) + 2;
        if (isPrimeNumber(num)) {
            continue
        }
        else {
            return num
        }
    }
}

function isPrimeNumber(num) {
    if (num === 2) {
        return true;
    } else {
        for (i = 3; i < Math.floor(Math.sqrt(num) + 1); i+=2) {

            if (num % i === 0) {
                return false;
                break;
            }
        }
        return true;
    }
}
