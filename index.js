const { randomInt } = require("crypto")
const Discord = require("discord.js")
const fs = require('fs')


const client = new Discord.Client()
const token = JSON.parse(fs.readFileSync('token.json', 'utf8')).token

let num = 0
let gaming = false

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
                num = newNumber(10000)
                channel.send(num + "を素因数分解してください")
                gaming = true
            }
            else if (!isNaN(args[0]) && gaming) {
                const n = Number(args[0])
                if (n <= 1) {
                    return;
                }
                else {
                    if (num % n == 0) {
                        if (!isPrimeNumber(n)) {
                            channel.send("素数じゃないようです。。。")
                        } else {
                            num /= n
                            channel.send(args[0] + "で割れました。商:" + num)
                        }
                    }
                    if (num == 1) {
                        channel.send("ゲームクリアー わーい")
                        gaming = false
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
        const num = Math.floor(Math.random() * Math.floor(max - 2)) + 2;
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

        for (i = 2; i < (num / 2) + 1; i++) {

            if (num % i === 0) {
                return false;
                break;
            }

            if (i + 1 > (num / 2) + 1) {
                return true;
            }
        }
    }
}
