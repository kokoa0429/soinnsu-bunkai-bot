const { randomInt } = require("crypto")
const Discord = require("discord.js")
const fs = require('fs')


const client = new Discord.Client()
const token = JSON.parse(fs.readFileSync('token.json', 'utf8')).token

let num = new Map()
let dnum = new Map()
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

        if (msg.startsWith("!i")) {
            console.log(msg)
            const args = msg.slice(2).trim().split(/ +/)
            if (args[0] === "new") {
                gameStart(channel, args[1])
            } else if (args[0] === "help") {
                channel.send("!i new でげーむがかいしできます。!i new [数字]にすると数字以下の合成数でスタートします。 \n!i [数字]か[数字]で因数分解できます")
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
                        gameEnd(channel)
                        gameStart(channel)
                    }
                }
            } else {
                message.reply("???")
                return
            }
        } else {
            const args = msg.split(/ +/)
            if (!isNaN(args[0]) && gaming.get(channel.id)) {
                console.log(msg)
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
                        gameEnd(channel)
                        gameStart(channel)
                    }
                }
            }
        }
    }
})

client.login(token)

function gameStart(channel, max = 10000) {
    const n = (isNaN(max) || typeof max == "undefined" || Number(max) > 9007199254740992 || Number(max) <= 4) ? 10000 : Number(max)
    const w = newNumber(n)
    num.set(channel.id, w)
    dnum.set(channel.id, w)

    channel.send(num.get(channel.id) + "を素因数分解してください")
    score.set(channel.id, new Map())
    gaming.set(channel.id, true)
}

function gameEnd(channel) {
    scoreObj = score.get(channel.id)

    s = "ゲームクリアー わーい\n"

    // console.log(scoreObj)
    let soi = dnum.get(channel.id)
    s += (soi + " = ")
    for (i = 2; i <= soi; i++) {
        if (soi === i) {
            // console.log("sushi")
            s += i + "\n";
        } else
            if (soi % i === 0) {
                s += i + " * ";
                soi /= i;
                i = 1;
            }
    }
    for (ss of scoreObj) {
        s += ss[0] + ":" + (ss[1]) + "pt \n"
    }
    channel.send(s)
    gaming.set(channel.id, false)
    score.set(channel.id, new Map())
}

function newNumber(max) {
    for (; ;) {
        const num = Math.floor(Math.random() * Math.floor(max) + 2)
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
    } else if (num % 2 == 0) {
        return false;
    } else {
        for (i = 3; i <= Math.floor(Math.sqrt(num) + 1); i++) {
            if (num % i === 0) {
                return false;
            }
        }
        return true;
    }
}
