const { randomInt } = require("crypto")
const Discord = require("discord.js")
const fs = require('fs')


const client = new Discord.Client()
const token = JSON.parse(fs.readFileSync('token.json', 'utf8')).token

let num = new Map()
let score = new Map()
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

        if (message.content.startsWith("!i")) {
            const args = message.content.slice(2).trim().split(/ +/)
            if (args[0] === "new") {
                num.set(channel.id, newNumber(typeof args[1] == "undefined" ? 10000 : !isNaN(args[1]) ? Number(args[1]) > 9007199254740992 || Number(args[1]) <= 2 ? 10000 : Number(args[1]) : 10000))
                channel.send(num.get(channel.id) + "を素因数分解してください")
                score.set(channel.id, new Map())
                gaming.set(channel.id, true)
            } else if (args[0] === "help") {
                channel.send("!i new でげーむがかいしできます \n!i [数字]か[数字]で因数分解できます")
            }
            else if (!isNaN(args[0]) && gaming.get(channel.id)) {
                const n = Number(args[0])
                let nnum = num.get(channel.id)
                if (n <= 1) {
                    return
                }
                else {
                    if (nnum % n == 0) {
                        if (!isPrimeNumber(n)) {
                            channel.send("素数じゃないようです。。。")
                        } else {
                            nnum /= n
                            channel.send(args[0] + "で割れました。(" + author + ") 商:" + nnum)

                            scoreMap = score.get(channel.id)
                            if (typeof scoreMap.get(author) == "undefined") {
                                scoreMap.set(author, 1)
                            } else {
                                s = scoreMap.get(author)
                                scoreMap.set(author, s + 1)
                            }
                            score.set(channel.id, scoreMap)
                            num.set(channel.id, nnum)
                        }
                    }
                    if (nnum == 1) {
                        scoreObj = score.get(channel.id)
                        // console.log(scoreObj)
                        s = "ゲームクリアー わーい\n"
                        for (ss of scoreObj) {
                            s += ss[0] + ":" + (ss[1]) + "pt \n"
                        }
                        channel.send(s)
                        gaming.set(channel.id, false)
                        score.set(channel.id, new Map())
                    }
                }
            }
            else {
                message.reply("???")
                return
            }
        } else {
            const args = message.content.split(/ +/)
            if (!isNaN(args[0]) && gaming.get(channel.id)) {
                const n = Number(args[0])
                let nnum = num.get(channel.id)
                if (n <= 1) {
                    return
                }
                else {
                    if (nnum % n == 0) {
                        if (!isPrimeNumber(n)) {
                            channel.send("素数じゃないようです。。。")
                        } else {
                            nnum /= n
                            channel.send(args[0] + "で割れました。(" + author + ") 商:" + nnum)
                            scoreMap = score.get(channel.id)
                            if (typeof scoreMap.get(author) == "undefined") {
                                scoreMap.set(author, 1)
                            } else {
                                s = scoreMap.get(author)
                                scoreMap.set(author, s + 1)
                            }
                            score.set(channel.id, scoreMap)
                            num.set(channel.id, nnum)
                        }
                    }
                    if (nnum == 1) {
                        scoreObj = score.get(channel.id)
                        // console.log(scoreObj)
                        s = "ゲームクリアー わーい\n"
                        for (ss of scoreObj) {
                            s += ss[0] + ":" + (ss[1]) + "pt \n"
                        }
                        channel.send(s)
                        gaming.set(channel.id, false)
                        score.set(channel.id, new Map())
                    }
                }
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
