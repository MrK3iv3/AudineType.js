"use strict";

if(NodeList.prototype.forEach === undefined){
    NodeList.prototype.forEach = function(callback){
        [].forEach.call(this, callback)
    }
}
function toScrollX(){
    let supportPageOffset = window.pageXOffset !== undefined;
    let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    let x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? doc.documentElement.scrollLeft : doc.body.scrollLeft;
}
function toScrollY(){
    let supportPageOffset = window.pageXOffset !== undefined;
    let isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    let y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? doc.documentElement.scrollTop : doc.body.scrollTop;
}
class DiscordBot{
    constructor(game, prefixuse, token){
        const Discord = require("discord.js");
        const bot = new Discord.Client();
        let prefix = prefixuse
        bot.on('ready', function() {
            bot.user.setGame(game)
        })
        bot.login(token)
        this.bot = {
          listen: function(typeMessage, messageListen, messages){
            return bot.on('message', (message) => {
                if(message.content === messageListen){
                    if(typeMessage == 'custom'){
                        messages
                    }else if(typeMessage == 'message'){
                        message.channel.sendMessage(messages)
                    }
                }
            })
          },
          kick: function(notUser, notReason, messages){
            let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!kUser) return message.channel.send(notUser)
            let kReason = args.join(" ").slice(22);
            if(!kReason) return message.channel.send(notReason)
            if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`Tu n'as pas les permission requise pour kick ${kUser}.`)
            messages
            message.guild.member(kUser).kick(kReason)
            return;
          },
          ban: function(notUser, notReason, messages){
            let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
            if(!bUser) return message.channel.send(notUser)
            let bReason = args.join(" ").slice(22);
            if(!bReason) return message.channel.send(notReason)
            if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send(`Tu n'as pas les permission requise pour kick ${kUser}.`)
            messages
            message.guild.member(bUser).ban(bReason)
            return;
          }
        }
    }
}
class Audine{
  constructor(elements, all){
    this.all = all
    if(this.all === true){
      this.elements = document.querySelectorAll(elements)
    }
    this.Type = {
      data: {
        ago(replace, tab){
          let terms = tab
          document.querySelectorAll('[data-ago]').forEach(function(node){
            function setText(){
              let secondes = Math.floor((new Date()).getTime() / 1000 - parseInt(node.getAttribute('data-ago'), 10))
              let prefix = secondes >= 0 ?'Il y a ' : 'Dans '
              secondes = Math.abs(secondes)
              let term
              for(term of terms){
                if(secondes < term.time){
                  break
                }
              }
              node.innerHTML = prefix + term.text.replace(replace, Math.round(secondes / term.divide))
              let nextTick = secondes %  term.divide
              if(nextTick === 0){
                nextTick = term.divide
              }
              window.setTimeout(function(){
                if(node.parentNode){
                  setText()
                }
              }, nextTick*1000)
            }
            setText()
          })
        }
      },
      css: {
        addClass(Class){
          $A().elements.forEach((element) => element.NodeList.add(Class))
        },
        removeClass(Class){
          let elements = document.querySelectorAll(elements)
          elements.forEach((element) => {
            element.NodeList.remove(Class)
          })
        },
        toogleClass(Class){
          let elements = document.querySelectorAll(elements)
          elements.forEach((element) => {
            element.NodeList.toogle(Class)
          })
        }
      },
      type(value){ return typeof value},
      debounce(callback, delay){
        let timer
        return function(){
          let args = arguments;
          let context = this;
          clearTimeout(timer);
          timer = setTimeout(function(){
            callback.apply(context, args);
          }, delay)
        }
      },
      throttle(callback, delay){
        let last, timer
        return function(){
          var context = this;
          var now = +new Date();
          var args = arguments;
          if(last && now < last + delay){
            clearTimeout(timer);
            timer = setTimeout(function(){
              last = now;
              callback.apply(context, args);
            }, delay);
          }else{
            last = now;
            callback.apply(context, args);
          }
        }
      },
      dragDrop(elementParent, elementChild){
        const fill = document.querySelector(elementChild)
        const empties = doc.querySelectorAll(elementParent)
        fill.addEventListener('dragstart', start)
        fill.addEventListener('dragend', end)
        empties.forEach((empty => {
          empty.addEventListener('dragover', hover)
          empty.addEventListener('dragenter', enter)
          empty.addEventListener('dragleave', leave)
          empty.addEventListener('drop', drop)            
        }))
        function start(){
          this.className += ' hold'
          setTimeout(() => this.className = 'invisible', 0)
        }
        function end(){
          this.className = 'fill'
        }
        function hover(e) {
          e.preventDefault()
        }
        function enter(e) {
          e.preventDefault()
          this.className += ' hovered'
        }
        function leave() {
          this.className = 'empty'
        }
        function drop() {
          this.className = 'empty'
          this.append(fill)
        }
      },
      spoiler(classSpoiler, text, classSpan, classButton){
        let elements = document.querySelectorAll(classSpoiler)
        function spoilerBtn(element){
          let button = doc.createElement('button')
          button.classList.add(classButton)
          button.innerHTML = text
      
          let span = doc.createElement('span')
          span.classList.add(classSpan)
          span.innerHTML = element.innerHTML
      
          element.innerHTML = ''
          element.appendChild(button)
          element.appendChild(span)
      
          button.addEventListener('click', function(){
            button.parentNode.removeChild(button)
            span.classList.add('visible')
          })
        }
        for (let i = 0; i < elements.length; i++) {
          spoilerBtn(elements[i])
        }
      },
      on(eventstring, callback){
        if(eventstring === "ready"){
          return document.addEventListener("DOMContentLoaded", callback)
        }
        return doc.addEventListener(eventstring, callback)
      },
      observerItem(){
        let observer = new IntersectionObserver(function (observables) {
          observables.forEach(function (observable) {
            if (observable.intersectionRatio > 0.5) {
              observable.target.classList.remove('not-visible')
              observer.unobserve(observable.target)
            }
          })
        }, {
          threshold: [0.5]
        });
        let item = this.element
        item.classList.add('not-visible')
        observer.observe(item)
      },
      cap(string){
        return (string.slice(0, 1).toUpperCase()) + string.slice(1)
      },
      maj(string){
        return string.split(' ').map(mot => mot[0].toUpperCase() + mot.slice(1)).join((' '));
      },
      min(string){
        return string.split(' ').map(mot => mot[0].toLowerCase() + mot.slice(1)).join((' '));
      },
      newError(string){
        throw new Error(string);
      },
      random(valueMin, valueMax){
        if(valueMin != undefined){
          let numberRandom
          if(valueMin && valueMax != undefined || null){
            numberRandom = Math.round(Math.random()* valueMax)
            while(numberRandom < valueMin) numberRandom = Math.round(Math.random()* valueMax)
            return numberRandom
          }else if(valueMax == undefined && valueMin != undefined){
            return numberRandom = Math.round(Math.random()* valueMin)
          }
        }else console.error("[AudineType(random)]: Vous devez avoir une valeur par default")
      },
      time(callback, delay){
        let times;
        return times = setInterval(callback, delay)
      },
      colorPicker(options){
        function ColorPicker(settings) {
            function Layer() {
              scope = {};
              scope.size;
              scope.sizePercentage = 10;
              scope.position;
              scope.paddingY = 4;
              scope.paddingX = 4;
              scope.imageData = [];
              scope.lineWidth = 2;
              scope.color = "#c1ebf5";
              scope.updateSize = function() {
                this.size = parseInt(width - width / 100 * (100 - this.sizePercentage));
                if (16 > this.size) {
                  this.size = 16;
                }
                this.position = {
                  x : this.paddingX,
                  y : this.paddingY
                };
              };
              scope.draw = function() {
                var w;
                var y;
                if (this.imageData[n]) {
                  ctx.putImageData(this.imageData[n], this.position.x, this.position.y);
                } else {
                  var color = getColor(this.color);
                  canvas.width = this.size;
                  canvas.height = this.size;
                  context.clearRect(0, 0, this.size, this.size);
                  context.beginPath();
                  var r = "triangle";
                  if ("triangle" == n) {
                    r = "quad";
                  }
                  context.beginPath();
                  if (35 > this.size) {
                    y = w = canvas.width / 2;
                  } else {
                    w = canvas.width / 2 - this.lineWidth;
                    context.arc(this.size / 2, this.size / 2, w, 0, 2 * pi);
                    context.strokeStyle = "rgba(0, 0, 0, 0.4)";
                    context.lineWidth = this.lineWidth;
                    context.stroke();
                    y = w - 6;
                    context.closePath();
                    context.beginPath();
                    context.arc(this.size / 2, this.size / 2, y, 0, 2 * pi);
                    context.strokeStyle = "rgba(0, 0, 0, 0.4)";
                    context.lineWidth = this.lineWidth;
                    context.stroke();
                    context.closePath();
                  }
                  context.beginPath();
                  if ("quad" == r) {
                    r = Math.floor((2 * y - 4) / Math.sqrt(2));
                    y = (this.size - r) / 2;
                    w = y + r;
                    y = y + r / 2 - r / 2;
                    context.moveTo(w, y);
                    context.lineTo(w - r, y);
                    context.lineTo(w - r, y + r);
                    context.lineTo(w, y + r);
                  } else {
                    r = Math.floor((2 * y - 4) * Math.sin(pi / 180 * 60));
                    w = 2 * y + (w - y);
                    y = this.size / 2;
                    var radius = Math.sqrt(3) / 2 * r;
                    context.moveTo(w, y);
                    context.lineTo(w - radius, y - r / 2);
                    context.lineTo(w - radius, y + r / 2);
                    context.lineTo(w, y);
                  }
                  context.lineTo(w, y);
                  context.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + ", 1)";
                  context.fill();
                  context.lineWidth = this.lineWidth;
                  context.strokeStyle = "rgba(0, 0, 0, 0.6)";
                  context.stroke();
                  context.closePath();
                  this.imageData[n] = context.getImageData(0, 0, canvas.width, canvas.width);
                  ctx.drawImage(canvas, this.position.x, this.position.y);
                }
              };
              scope.isDotIn = function(e) {
                return e.x >= this.position.x && e.x <= this.position.x + this.size && e.y >= this.position.y && e.y <= this.position.y + this.size ? true : false;
              };
            }
            function update(value, i, val) {
              i = i ? true : false;
              var self = {};
              self.width;
              self.widthPercentage = 22;
              self.imageData = null;
              self.align = value;
              self.selected = i;
              self.color = "#ffffff";
              self.position;
              self.paddingY = -4;
              self.paddingX = 4;
              self.lineWidth = 1;
              self.selectSize = 4;
              if ("right" == value) {
                self.paddingX *= -1;
              }
              if (self.selected) {
                self.color = val;
              }
              if (val) {
                self.color = val;
              }
              self.updateSize = function() {
                this.width = parseInt(width - width / 100 * (100 - this.widthPercentage));
                if ("left" == this.align) {
                  this.position = {
                    x : 0,
                    y : width - this.width
                  };
                } else {
                  if ("right" == this.align) {
                    this.position = {
                      x : width - this.width,
                      y : width - this.width
                    };
                  }
                }
              };
              self.calcS = function(ns) {
                return Math.abs((ns[1].x - ns[0].x) * (ns[2].y - ns[0].y) - (ns[2].x - ns[0].x) * (ns[1].y - ns[0].y)) / 2;
              };
              self.isDotIn = function(p) {
                var recentTiles = [];
                if ("left" == this.align) {
                  recentTiles[0] = {
                    x : this.position.x,
                    y : this.position.y
                  };
                  recentTiles[1] = {
                    x : this.position.x,
                    y : this.position.y + this.width
                  };
                  recentTiles[2] = {
                    x : this.position.x + this.width,
                    y : this.position.y + this.width
                  };
                } else {
                  recentTiles[0] = {
                    x : this.position.x + this.width,
                    y : this.position.y
                  };
                  recentTiles[1] = {
                    x : recentTiles[0].x,
                    y : recentTiles[0].y + this.width
                  };
                  recentTiles[2] = {
                    x : recentTiles[0].x - this.width,
                    y : this.position.y + this.width
                  };
                }
                var i = 0;
                for (; i <= recentTiles.length - 1; ++i) {
                  recentTiles[i].x += this.paddingX;
                  recentTiles[i].y += this.paddingY;
                }
                i = this.calcS(recentTiles);
                p = [{
                  x : recentTiles[0].x,
                  y : recentTiles[0].y
                }, {
                  x : recentTiles[1].x,
                  y : recentTiles[1].y
                }, {
                  x : p.x,
                  y : p.y
                }];
                var y = this.calcS(p);
                p[1] = {
                  x : recentTiles[2].x,
                  y : recentTiles[2].y
                };
                y = y + this.calcS(p);
                p[0] = {
                  x : recentTiles[1].x,
                  y : recentTiles[1].y
                };
                y = y + this.calcS(p);
                return Math.ceil(y) == Math.ceil(i) ? true : false;
              };
              self.draw = function() {
                canvas.width = this.width;
                canvas.height = this.width;
                context.clearRect(0, 0, this.width, this.width);
                context.beginPath();
                if ("left" == this.align) {
                  context.moveTo(this.lineWidth / 2, this.width - this.lineWidth);
                  context.lineTo(this.width, this.width - this.lineWidth);
                  context.lineTo(this.lineWidth, this.lineWidth);
                  context.lineTo(this.lineWidth, this.width - this.lineWidth);
                }
                if ("right" == this.align) {
                  context.moveTo(this.lineWidth / 2, this.width - this.lineWidth);
                  context.lineTo(this.width - this.lineWidth, this.width - this.lineWidth);
                  context.lineTo(this.width - this.lineWidth, this.lineWidth);
                  context.lineTo(this.lineWidth, this.width - this.lineWidth);
                }
                if (this.selected) {
                  context.fillStyle = "rgba(255,255,255, 1)";
                  context.fill();
                  context.strokeStyle = "rgba(0, 0, 0, 1)";
                  context.stroke();
                  context.closePath();
                  context.beginPath();
                  context.lineWidth = this.lineWidth;
                  if ("left" == this.align) {
                    context.moveTo(this.selectSize, this.width - this.selectSize);
                    context.lineTo(this.width - 2 * this.selectSize, this.width - this.selectSize);
                    context.lineTo(this.selectSize, 2 * this.selectSize);
                    context.lineTo(this.selectSize, this.width - this.selectSize);
                  }
                  if ("right" == this.align) {
                    context.moveTo(2 * this.selectSize, this.width - this.selectSize);
                    context.lineTo(this.width - this.selectSize, this.width - this.selectSize);
                    context.lineTo(this.width - this.selectSize, 2 * this.selectSize);
                    context.lineTo(2 * this.selectSize, this.width - this.selectSize);
                  }
                }
                var color = getColor(this.color);
                context.fillStyle = "rgba(" + color.r + "," + color.g + "," + color.b + ", 1)";
                context.fill();
                context.strokeStyle = "rgba(0, 0, 0, 1)";
                context.stroke();
                this.imageData = context.getImageData(0, 0, this.width, this.width);
                ctx.drawImage(canvas, this.position.x + this.paddingX, this.position.y + this.paddingY);
              };
              colors[colors.length] = self;
            }
            function wrap(target) {
              var size = target.getBoundingClientRect();
              var height = 0;
              var verticalPaddingSize = 0;
              if (root) {
                verticalPaddingSize = me.width + 2 * me.padding;
              }
              if (target === element) {
                if (size.width <= size.height) {
                  height = size.height;
                } else {
                  if (size.height < size.width) {
                    height = size.width;
                  }
                }
              } else {
                if (undefined) {
                  if ("height" == undefined) {
                    height = size.height;
                  } else {
                    if ("width" == undefined) {
                      height = size.width;
                    }
                  }
                } else {
                  if (size.width > size.height) {
                    height = size.height;
                  } else {
                    if (size.height >= size.width) {
                      height = size.width;
                    }
                  }
                }
              }
              height = parseInt(height);
              if (root) {
                height = height - verticalPaddingSize;
              }
              return 0 >= height ? false : height;
            }
            function callback(a, fx) {
              var signal = 1;
              var str = false;
              a = a.trim(a);
              if (7 >= a.length) {
                if ("#" == a.charAt(0)) {
                  a = a.slice(1);
                }
                if (3 == a.length) {
                  str = a + a;
                } else {
                  if (6 == a.length) {
                    str = a;
                  }
                }
              } else {
                if ("rgb" == a.substring(0, 3)) {
                  var endArr = a.split(",");
                  if (3 <= endArr.length && 4 >= endArr.length) {
                    endArr[0] = endArr[0].replace("rgba(", "");
                    endArr[0] = endArr[0].replace("rgb(", "");
                    var c1 = {
                      r : parseInt(endArr[0]),
                      g : parseInt(endArr[1]),
                      b : parseInt(endArr[2])
                    };
                    if (255 >= c1.r && 255 >= c1.g && 255 >= c1.b && (str = merge(c1), 4 == endArr.length)) {
                      signal = parseFloat(endArr[3]);
                      if (!signal || 0 > signal) {
                        signal = 0;
                      }
                      if (1 < signal) {
                        signal = 1;
                      }
                    }
                  }
                }
              }
              if (false === str && fx) {
                return false;
              }
              if (false === str) {
                str = "000000";
              }
              if ("#" != str.charAt(0)) {
                str = "#" + str;
              }
              return {
                h : str,
                a : signal
              };
            }
            function link() {
              if (document.quad) {
                return doc.quad;
              }
              var self = {};
              self.size;
              self.padding = 2;
              self.path;
              self.imageData = null;
              self.dotToSv = function(a) {
                return {
                  s : Math.abs(this.path[3].x - a.x) / this.size,
                  v : Math.abs(this.path[3].y - a.y) / this.size
                };
              };
              self.svToDot = function(b) {
                var xStart = this.path[0].x;
                var j = this.path[0].y;
                var curDayIdx = .02;
                if (150 > width) {
                  curDayIdx = .07;
                } else {
                  if (100 > width) {
                    curDayIdx = .16;
                  }
                }
                var k = 0;
                for (; k < this.size; k++) {
                  var dx = 0;
                  for (; dx < this.size; dx++) {
                    var h = {
                      x : dx + xStart,
                      y : k + j
                    };
                    var a = this.dotToSv(h);
                    var endDayIdx = Math.abs(a.v - b.v);
                    if (Math.abs(a.s - b.s) < curDayIdx && endDayIdx < curDayIdx) {
                      return h;
                    }
                  }
                }
                return {
                  x : 0,
                  y : 0
                };
              };
              self.limitDotPosition = function(start) {
                var left = start.x;
                start = start.y;
                if (left < this.path[0].x) {
                  left = this.path[0].x;
                }
                if (left > this.path[0].x + this.size) {
                  left = this.path[0].x + this.size;
                }
                if (start < this.path[0].y) {
                  start = this.path[0].y;
                }
                if (start > this.path[0].y + this.size) {
                  start = this.path[0].y + this.size;
                }
                return {
                  x : left,
                  y : start
                };
              };
              self.draw = function() {
                if (!this.imageData) {
                  this.imageData = ctx.createImageData(this.size, this.size);
                }
                var i = 0;
                var left = this.path[0].x;
                var dy = this.path[0].y;
                var y = 0;
                for (; y < this.size; y++) {
                  var j = 0;
                  for (; j < this.size; j++) {
                    var color = this.dotToSv({
                      x : j + left,
                      y : y + dy
                    });
                    color = hsvToRgb(p.h, color.s, color.v);
                    this.imageData.data[i + 0] = color.r;
                    this.imageData.data[i + 1] = color.g;
                    this.imageData.data[i + 2] = color.b;
                    this.imageData.data[i + 3] = 255;
                    i = i + 4;
                  }
                }
                ctx.putImageData(this.imageData, left, dy);
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0,0,0, 0.2)";
                ctx.lineWidth = 2;
                i = 0;
                for (; i <= this.path.length - 1; ++i) {
                  if (0 == i) {
                    ctx.moveTo(this.path[i].x, this.path[i].y);
                  } else {
                    ctx.lineTo(this.path[i].x, this.path[i].y);
                  }
                }
                ctx.stroke();
                ctx.closePath();
              };
              self.updateSize = function() {
                this.size = Math.floor((2 * data.innerRadius - 2 * options.paddingX - 2 * this.padding) / Math.sqrt(2));
                this.path = [];
                this.path[0] = {
                  x : this.size / 2 * -1,
                  y : this.size / 2 * -1
                };
                this.path[1] = {
                  x : this.path[0].x + this.size,
                  y : this.path[0].y
                };
                this.path[2] = {
                  x : this.path[1].x,
                  y : this.path[1].y + this.size
                };
                this.path[3] = {
                  x : this.path[2].x - this.size,
                  y : this.path[2].y
                };
                this.path[4] = {
                  x : this.path[0].x,
                  y : this.path[0].y
                };
                var i = 0;
                for (; i <= this.path.length - 1; ++i) {
                  this.path[i].x += data.pos.x;
                  this.path[i].y += data.pos.y;
                }
              };
              self.isDotIn = function(p) {
                return p.x < this.path[0].x || p.x > this.path[0].x + this.size || p.y < this.path[0].y || p.y > this.path[0].y + this.size ? false : true;
              };
              return doc.quad = self;
            }
            function draw() {
              if (doc.triangle) {
                return doc.triangle;
              }
              var self = {};
              self.size;
              self.padding = 2;
              self.path;
              self.imageData = null;
              self.followWheel = true;
              self.s;
              self.sOnTop = false;
              self.outerRadius;
              self.limitDotPosition = function(i) {
                var x = i.x;
                i = i.y;
                var n = this.path[2].x;
                var Px;
                var num = i;
                Px = Math.min(Math.max(n, x), this.path[0].x);
                var length = (this.path[0].y - this.path[1].y) / (this.path[0].x - this.path[1].x);
                var nearHandlePos = Math.ceil(this.path[1].y + length * (Px - this.path[1].x));
                length = (this.path[0].y - this.path[2].y) / (this.path[0].x - this.path[2].x);
                length = Math.floor(this.path[2].y + length * (Px - this.path[2].x));
                if (x < n) {
                  num = i;
                }
                num = Math.min(Math.max(nearHandlePos, num), length);
                return {
                  x : Px,
                  y : num
                };
              };
              self.svToDot = function(b) {
                var curDayIdx = .02;
                if (150 > width) {
                  curDayIdx = .07;
                } else {
                  if (100 > width) {
                    curDayIdx = .16;
                  }
                }
                var dy = 0;
                for (; dy < this.size; dy++) {
                  var dx = 0;
                  for (; dx < this.size; dx++) {
                    var f = {
                      x : this.path[1].x + dx,
                      y : this.path[1].y + dy
                    };
                    if (_this.isDotIn(f)) {
                      var a = this.dotToSv(f);
                      var endDayIdx = Math.abs(a.v - b.v);
                      if (Math.abs(a.s - b.s) < curDayIdx && endDayIdx < curDayIdx) {
                        return f;
                      }
                    }
                  }
                }
                return {
                  x : 0,
                  y : 0
                };
              };
              self.draw = function() {
                if (!this.imageData) {
                  this.imageData = context.createImageData(this.size, this.size);
                }
                canvas.width = this.size;
                canvas.height = this.size;
                var path = this.path[1].x;
                var miny = this.path[1].y;
                var i = 0;
                var dy = 0;
                for (; dy < this.size; dy++) {
                  var dx = 0;
                  for (; dx < this.size; dx++) {
                    var value = {
                      x : this.path[1].x + dx,
                      y : this.path[1].y + dy
                    };
                    if (_this.isDotIn(value)) {
                      value = this.dotToSv(value);
                      value = hsvToRgb(p.h, value.s, value.v);
                      this.imageData.data[i + 0] = value.r;
                      this.imageData.data[i + 1] = value.g;
                      this.imageData.data[i + 2] = value.b;
                      this.imageData.data[i + 3] = 255;
                    } else {
                      this.imageData.data[i + 0] = 0;
                      this.imageData.data[i + 1] = 0;
                      this.imageData.data[i + 2] = 0;
                      this.imageData.data[i + 3] = 0;
                    }
                    i = i + 4;
                  }
                }
                context.putImageData(this.imageData, 0, 0);
                ctx.drawImage(canvas, path, miny);
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0, 0, 0, 0.3)";
                ctx.lineWidth = 2;
                path = this.path;
                i = 0;
                for (; i <= path.length - 1; ++i) {
                  if (0 == i) {
                    ctx.moveTo(path[i].x, path[i].y);
                  } else {
                    ctx.lineTo(path[i].x, path[i].y);
                  }
                }
                ctx.stroke();
                ctx.closePath();
              };
              self.calcS = function(ns) {
                return Math.abs((ns[1].x - ns[0].x) * (ns[2].y - ns[0].y) - (ns[2].x - ns[0].x) * (ns[1].y - ns[0].y)) / 2;
              };
              self.dotToSv = function(start) {
                var f = this.vol;
                var positionOnLinePiece = ((start.x - f[0].x) * (f[1].x - f[0].x) + (start.y - f[0].y) * (f[1].y - f[0].y)) / ((f[0].x - f[1].x) * (f[0].x - f[1].x) + (f[0].y - f[1].y) * (f[0].y - f[1].y));
                if (0 > positionOnLinePiece) {
                  positionOnLinePiece = 0;
                }
                if (1 < positionOnLinePiece) {
                  positionOnLinePiece = 1;
                }
                var xhair = this.vol[0];
                f = Math.sqrt(Math.pow(f[0].x + positionOnLinePiece * (f[1].x - f[0].x) - xhair.x, 2) + Math.pow(f[0].y + positionOnLinePiece * (f[1].y - f[0].y) - xhair.y, 2));
                if (1 > f) {
                  f = Math.floor(f);
                }
                if (f > this.h - 1) {
                  f = this.h;
                }
                f = f / this.h;
                start = Math.abs(distance(start, this.sSide));
                if (30 > start) {
                  start = 30;
                }
                return {
                  s : (60 - (start - 30)) / 60,
                  v : f
                };
              };
              self.isDotIn = function(p) {
                p = [{
                  x : this.path[0].x,
                  y : this.path[0].y
                }, {
                  x : this.path[1].x,
                  y : this.path[1].y
                }, {
                  x : p.x,
                  y : p.y
                }];
                var y = this.calcS(p);
                p[1] = {
                  x : this.path[2].x,
                  y : this.path[2].y
                };
                y = y + this.calcS(p);
                p[0] = {
                  x : this.path[1].x,
                  y : this.path[1].y
                };
                y = y + this.calcS(p);
                return Math.ceil(y) == Math.ceil(this.s) ? true : false;
              };
              self.updateSize = function() {
                this.outerRadius = data.innerRadius - options.paddingX - this.padding;
                this.size = Math.floor(2 * this.outerRadius * Math.sin(pi / 180 * 60));
                var start = Math.sqrt(3) / 2 * this.size;
                this.h = Math.sqrt(3) / 2 * this.size;
                this.path = [];
                this.path[0] = {
                  x : this.outerRadius,
                  y : 0
                };
                this.path[1] = {
                  x : this.path[0].x - start,
                  y : this.size / 2 * -1
                };
                this.path[2] = {
                  x : this.path[1].x,
                  y : this.size / 2
                };
                this.path[3] = {
                  x : this.path[0].x,
                  y : this.path[0].y
                };
                start = 0;
                for (; start <= this.path.length - 1; ++start) {
                  this.path[start].x += data.pos.x;
                  this.path[start].y += data.pos.y;
                }
                this.vol = [];
                this.s = this.calcS(this.path);
                if (this.sOnTop) {
                  start = getY(this.path[0], this.path[2]);
                  this.vol[0] = {
                    x : this.path[1].x,
                    y : this.path[1].y
                  };
                  this.vol[1] = {
                    x : start.x,
                    y : start.y
                  };
                  this.sSide = this.path[1];
                } else {
                  start = getY(this.path[0], this.path[1]);
                  this.vol[0] = {
                    x : this.path[2].x,
                    y : this.path[2].y
                  };
                  this.vol[1] = {
                    x : start.x,
                    y : start.y
                  };
                  this.sSide = this.path[2];
                }
              };
              return doc.triangle = self;
            }
            function addEvent(obj, type, data, on) {
              if ("object" !== typeof obj) {
                obj = doc.getElementById(obj);
              }
              if (!obj) {
                return false;
              }
              if (!on) {
                on = "";
              }
              el[on + type] = data;
              if (obj.addEventListener) {
                obj.addEventListener(type, el[on + type]);
              } else {
                obj.attachEvent("on" + type, el[on + type]);
              }
              return true;
            }
            function removeEvent(obj, type, event) {
              if ("object" !== typeof obj) {
                obj = doc.getElementById(obj);
              }
              if (!obj) {
                return false;
              }
              if (!event) {
                event = "";
              }
              if (!el[event + type]) {
                return false;
              }
              if (obj.removeEventListener) {
                obj.removeEventListener(type, el[event + type]);
              } else {
                obj.detachEvent("on" + type, el[event + type]);
              }
              el[event + type] = null;
              return true;
            }
            function hsvToRgb(x, s, i) {
              var r;
              var e;
              var f;
              var controlX;
              var m12;
              var o;
              if (x && void 0 === s && void 0 === i) {
                s = x.s;
                i = x.v;
                x = x.h;
              }
              controlX = Math.floor(6 * x);
              m12 = 6 * x - controlX;
              x = i * (1 - s);
              o = i * (1 - m12 * s);
              s = i * (1 - (1 - m12) * s);
              switch(controlX % 6) {
                case 0:
                  r = i;
                  e = s;
                  f = x;
                  break;
                case 1:
                  r = o;
                  e = i;
                  f = x;
                  break;
                case 2:
                  r = x;
                  e = i;
                  f = s;
                  break;
                case 3:
                  r = x;
                  e = o;
                  f = i;
                  break;
                case 4:
                  r = s;
                  e = x;
                  f = i;
                  break;
                case 5:
                  r = i;
                  e = x;
                  f = o;
              }
              return {
                r : Math.floor(255 * r),
                g : Math.floor(255 * e),
                b : Math.floor(255 * f)
              };
            }
            function rgb2hsv(r, g, b) {
              if (r && void 0 === g && void 0 === b) {
                g = r.g;
                b = r.b;
                r = r.r;
              }
              r = r / 255;
              g = g / 255;
              b = b / 255;
              var max = Math.max(r, g, b);
              var min = Math.min(r, g, b);
              var spacing;
              var d = max - min;
              if (max == min) {
                spacing = 0;
              } else {
                switch(max) {
                  case r:
                    spacing = (g - b) / d + (g < b ? 6 : 0);
                    break;
                  case g:
                    spacing = (b - r) / d + 2;
                    break;
                  case b:
                    spacing = (r - g) / d + 4;
                }
                spacing = spacing / 6;
              }
              return {
                h : spacing,
                s : 0 == max ? 0 : d / max,
                v : max
              };
            }
            function getColor(val) {
              val = parseInt("#" == val.charAt(0) ? val.slice(1) : val, 16);
              return {
                r : val >> 16,
                g : val >> 8 & 255,
                b : val & 255
              };
            }
            function merge(color1) {
              var makeColorPiece = function(num) {
                num = num.toString(16);
                return 1 === num.length ? "0" + num : num;
              };
              return "#" + makeColorPiece(color1.r) + makeColorPiece(color1.g) + makeColorPiece(color1.b);
            }
            function getY(p, t) {
              return {
                x : (p.x + t.x) / 2,
                y : (p.y + t.y) / 2
              };
            }
            function distance(b, a, dist) {
              if (!a) {
                a = {
                  x : 0,
                  y : 0
                };
              }
              b = 180 * Math.atan2(b.y - a.y, b.x - a.x) / pi;
              if (dist && 0 > b) {
                b = 360 + b;
              }
              return b;
            }
            function show() {
              time = 2 + options.paddingX;
              scope_bb = false;
              data.imageData = null;
              x = width / 2;
              data.pos = {
                x : x,
                y : x
              };
              data.outerRadius = x - time;
              data.innerRadius = data.outerRadius - data.width;
              options.path = [{
                x : data.innerRadius - options.paddingX,
                y : -1 * options.height
              }, {
                x : data.outerRadius + options.paddingX,
                y : -1 * options.height
              }, {
                x : data.outerRadius + options.paddingX,
                y : options.height
              }, {
                x : data.innerRadius - options.paddingX,
                y : options.height
              }, {
                x : data.innerRadius - options.paddingX,
                y : -1 * options.height
              }];
              var n = width;
              if (root) {
                n = n + (me.width + 2 * me.padding);
              }
              if ("CANVAS" != target.tagName) {
                target.style.width = n + "px";
                target.style.height = width + "px";
              }
              element.width = n;
              element.height = width;
              if (type != element) {
                element.style.width = n + "px";
                element.style.height = width + "px";
              }
              n = 0;
              for (; n <= colors.length - 1; ++n) {
                colors[n].updateSize();
              }
              if (scope) {
                scope.imageData.triangle = null;
                scope.imageData.quad = null;
                scope.updateSize();
              }
              _this.updateSize();
              if (root) {
                me.updateSize();
              }
            }
            function parse(tr) {
              if (input && (!e.updateinput || (0, e.updateinput)(self, input, tr))) {
                var startingValue = "rgba(" + color.r + ", " + color.g + ", " + color.b + ", " + value.toFixed(2) + ")";
                if (!tr) {
                  input.value = 1 > value && "mixed" === format ? startingValue : "hex" === format || "mixed" === format ? val : startingValue;
                }
                if (awsSTSToken) {
                  input.style.color = .5 > p.v ? "#FFF" : "#000";
                  input.style.background = startingValue;
                }
              }
            }
            function Canvas() {
              if (!target) {
                return false;
              }
              if ("CANVAS" != target.tagName) {
                element = doc.createElement("CANVAS");
                target.appendChild(element);
              } else {
                element = target;
              }
              if ("undefined" != typeof window.G_vmlCanvasManager) {
                element = window.G_vmlCanvasManager.initElement(element);
                canvas = window.G_vmlCanvasManager.initElement(canvas);
              }
              return element.getContext && element.getContext("2d") ? (ctx = element.getContext("2d"), context = canvas.getContext("2d"), true) : false;
            }
            function on() {
              addEvent(element, "mousedown", function(a) {
                self.mouseDownEvent(a);
              }, "wait_action_");
              addEvent(element, "touchstart", function(a) {
                self.mouseDownEvent(a);
              }, "wait_action_");
              addEvent(element, "mouseout", function(person) {
                self.mouseOutEvent(person);
              }, "wait_action_");
              addEvent(window, "touchmove", function(e) {
                self.touchMoveEvent(e);
              }, "wait_action_");
              addEvent(element, "mousemove", function(a) {
                self.mouseMoveRest(a);
              }, "wait_action_");
            }
            function remove() {
              removeEvent(element, "mousedown", "wait_action_");
              removeEvent(element, "touchstart", "wait_action_");
              removeEvent(element, "mouseout", "wait_action_");
              removeEvent(window, "touchmove", "wait_action_");
              removeEvent(element, "mousemove", "wait_action_");
            }
            function $(e) {
              e = e || window.event;
              var x;
              var offset = doc.body.scrollLeft + doc.documentElement.scrollLeft;
              var offsetY = doc.body.scrollTop + doc.documentElement.scrollTop;
              if ("touchend" == e.type) {
                x = e.changedTouches[0].clientX + offset;
                e = e.changedTouches[0].clientY + offsetY;
              } else {
                if ("touchmove" == e.type || e.touches) {
                  x = e.touches[0].clientX + offset;
                  e = e.touches[0].clientY + offsetY;
                } else {
                  x = e.clientX + offset;
                  e = e.clientY + offsetY;
                }
              }
              var ret = element.getBoundingClientRect();
              x = x - (ret.left + offset);
              e = e - (ret.top + offsetY);
              return {
                x : x,
                y : e
              };
            }
            function test(n) {
              var j = false;
              var i = 0;
              for (; i <= colors.length - 1; ++i) {
                if (colors[i].selected) {
                  j = i;
                }
                colors[i].selected = false;
              }
              var test = false;
              i = 0;
              for (; i <= colors.length - 1; ++i) {
                if (i == n) {
                  colors[i].selected = true;
                  self.setColorByHex(colors[i].color);
                  test = true;
                  break;
                }
              }
              if (test && e.selectcolorsaver) {
                (0, e.selectcolorsaver)(self, colors[n]);
              }
              if (!(test || false === j)) {
                colors[j].selected = true;
              }
              return test;
            }
            function change() {
              var i = 0;
              for (; i <= colors.length - 1; ++i) {
                if (colors[i].selected) {
                  colors[i].color = val;
                }
              }
            }
            function hex() {
              if (colors.length) {
                var i = 0;
                for (; i <= colors.length - 1; ++i) {
                  colors[i].draw();
                }
              }
            }
            function redraw() {
              if (!ctx) {
                return false;
              }
              ctx.clearRect(0, 0, element.width, element.height);
              if (scope_bb) {
                return ctx.putImageData(img, 0, 0), hex(), true;
              }
              data.draw();
              _this.draw();
              if (root) {
                me.draw();
              }
              hex();
              if (scope) {
                scope.draw();
              }
              if (!canViewMyFiles) {
                img = ctx.getImageData(0, 0, element.width, element.height);
                scope_bb = true;
              }
              return true;
            }
            function render() {
              if (!redraw()) {
                return false;
              }
              var vertices = 360 * p.h - data.startAngle;
              if (root) {
                ctx.beginPath();
                ctx.rect(me.pos.x - 2, me.padding + me.height * (1 - value) - 1, me.width + 4, 2);
                ctx.strokeStyle = "rgba(0,0,0, 0.8)";
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
              }
              ctx.beginPath();
              var item = options.path;
              var targetCourse;
              targetCourse = pi / 180 * vertices;
              vertices = [];
              var i = 0;
              for (; i <= item.length - 1; ++i) {
                vertices[i] = {
                  x : item[i].x * Math.cos(targetCourse) - item[i].y * Math.sin(targetCourse),
                  y : item[i].x * Math.sin(targetCourse) + item[i].y * Math.cos(targetCourse)
                };
              }
              item = 0;
              for (; item <= vertices.length - 1; ++item) {
                vertices[item].x += data.pos.x;
                vertices[item].y += data.pos.y;
                if (0 == item) {
                  ctx.moveTo(vertices[item].x, vertices[item].y);
                } else {
                  ctx.lineTo(vertices[item].x, vertices[item].y);
                }
              }
              ctx.strokeStyle = "rgba(0,0,0,0.8)";
              ctx.lineWidth = options.lineWeight;
              ctx.stroke();
              ctx.closePath();
              ctx.strokeStyle = .5 < p.v && .5 > p.s ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)";
              ctx.beginPath();
              ctx.lineWidth = 2;
              ctx.arc(p.x, p.y, point.radius, 0, 2 * pi);
              ctx.stroke();
              ctx.closePath();
              return false;
            }
            var pi = Math.PI;
            var _this;
            var globalFailure = true;
            var point = {
              radius : 4
            };
            var element = false;
            var ctx = false;
            var n = "quad";
            var root = false;
            var canViewMyFiles = false;
            var canAccessMyFiles = true;
            var el = [];
            var e = [];
            var canvas = doc.createElement("canvas");
            var context = false;
            var scope_bb = false;
            var img = null;
            var input = false;
            var awsSTSToken = true;
            var format = "mixed";
            var config = {
              tag : false,
              margin : 6
            };
            var target = false;
            var self = this;
            var time;
            var width = 200;
            var x;
            var p;
            var color;
            var val = "#000000";
            var value = 1;
            var type = false;
            var undefined = false;
            var colors = [];
            var scope = false;
            var doc = [];
            var data = {
              width : 18,
              imageData : null
            };
            data.innerRadius;
            data.startAngle = 0;
            data.outerRadius;
            data.outerStrokeStyle = "rgba(0,0,0,0.2)";
            data.innerStrokeStyle = "rgba(0,0,0,0.2)";
            data.pos;
            data.draw = function() {
              if (this.imageData) {
                ctx.putImageData(this.imageData, 0, 0);
              } else {
                var sa = this.startAngle;
                var t = 0;
                for (; 360 >= t; t++) {
                  var r = pi / 180 * (t - 2);
                  var ang = pi / 180 * t;
                  ctx.beginPath();
                  ctx.moveTo(x, x);
                  ctx.arc(x, x, this.outerRadius, r, ang, false);
                  ctx.closePath();
                  r = hsvToRgb(sa / 360, 1, 1);
                  ctx.fillStyle = "rgb(" + r.r + ", " + r.g + ", " + r.b + ")";
                  ctx.fill();
                  sa++;
                  if (360 <= sa) {
                    sa = 0;
                  }
                }
                ctx.globalCompositeOperation = "destination-out";
                ctx.beginPath();
                ctx.arc(x, x, this.innerRadius, 0, 2 * pi);
                ctx.fill();
                ctx.globalCompositeOperation = "source-over";
                ctx.strokeStyle = this.innerStrokeStyle;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
                ctx.beginPath();
                ctx.arc(x, x, this.outerRadius, 0, 2 * pi);
                ctx.strokeStyle = this.outerStrokeStyle;
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.closePath();
                this.imageData = ctx.getImageData(0, 0, width, width);
              }
            };
            data.isDotIn = function(v) {
              return Math.pow(this.pos.x - v.x, 2) + Math.pow(this.pos.y - v.y, 2) < Math.pow(this.outerRadius, 2) && Math.pow(this.pos.x - v.x, 2) + Math.pow(this.pos.y - v.y, 2) > Math.pow(this.innerRadius, 2) ? true : false;
            };
            var options = {
              lineWeight : 2,
              height : 4,
              paddingX : 2
            };
            options.path;
            var me = {
              width : 18,
              padding : 4,
              outerStrokeStyle : "rgba(0,0,0,0.2)",
              innerStrokeStyle : "rgba(0,0,0,0.2)"
            };
            me.height;
            me.pos;
            me.updateSize = function() {
              this.pos = {
                x : width + me.padding,
                y : me.padding
              };
              this.height = width - 2 * me.padding;
            };
            me.draw = function() {
              var gradient = ctx.createLinearGradient(0, 0, 0, this.height);
              var hueRgb = hsvToRgb(p.h, 1, 1);
              gradient.addColorStop(0, "rgba(" + hueRgb.r + "," + hueRgb.g + "," + hueRgb.b + ",1)");
              gradient.addColorStop(1, "rgba(" + hueRgb.r + "," + hueRgb.g + "," + hueRgb.b + ",0)");
              ctx.beginPath();
              ctx.rect(this.pos.x, this.pos.y, this.width, this.height);
              ctx.fillStyle = "white";
              ctx.fill();
              ctx.fillStyle = gradient;
              ctx.fill();
              ctx.strokeStyle = "rgba(0,0,0, 0.2)";
              ctx.lineWidth = 2;
              ctx.stroke();
              ctx.closePath();
            };
            me.dotToAlpha = function(pos) {
              return 1 - Math.abs(this.pos.y - pos.y) / this.height;
            };
            me.alphaToDot = function(s) {
              return {
                x : 0,
                y : this.height - this.height * s
              };
            };
            me.limitDotPosition = function(y) {
              y = y.y;
              if (y < this.pos.y) {
                y = this.pos.y;
              }
              if (y > this.pos.y + this.height) {
                y = this.pos.y + this.height;
              }
              return {
                x : this.pos.x,
                y : y
              };
            };
            me.isDotIn = function(point) {
              return point.x < this.pos.x || point.x > this.pos.x + me.width || point.y < this.pos.y || point.y > this.pos.y + this.height ? false : true;
            };
            var obj = {
              svCursorData : null,
              stCursor : null,
              curType : 0,
              size : 16,
              initSvCursor : function() {
                if (!element) {
                  return false;
                }
                var a = doc.body;
                this.curType = 1;
                if (!this.stCursor) {
                  this.stCursor = a.style.cursor;
                }
                if (!this.stCursor) {
                  this.stCursor = "auto";
                }
                if (this.svCursorData) {
                  return a.style.cursor = this.svCursorData, true;
                }
                if (!canvas) {
                  return false;
                }
                var size = this.size + 2;
                canvas.width = size;
                canvas.height = size;
                context.clearRect(0, 0, this.size, this.size);
                context.strokeStyle = "rgba(255, 255, 255, 1)";
                context.beginPath();
                context.lineWidth = 2;
                context.arc(size / 2, size / 2, this.size / 2, 0, 2 * pi);
                context.stroke();
                context.closePath();
                var exactLanguageCode = canvas.toDataURL();
                this.svCursorData = "url(" + exactLanguageCode + ") " + size / 2 + " " + size / 2 + ", auto";
                if (!this.svCursorData) {
                  return false;
                }
                a.style.cursor = this.svCursorData;
                if (-1 === a.style.cursor.indexOf(exactLanguageCode)) {
                  this.svCursorData = "crosshair";
                  a.style.cursor = "crosshair";
                }
                return true;
              },
              initStandartCursor : function() {
                if (this.stCursor) {
                  obj.curType = 0;
                  doc.body.style.cursor = this.stCursor;
                }
              },
              updateCursor : function(pos) {
                if (globalFailure) {
                  if (!ColorPicker.cursorLock) {
                    if (_this.isDotIn(pos)) {
                      obj.initSvCursor();
                    } else {
                      obj.initStandartCursor();
                    }
                  }
                }
              }
            };
            this.popUpClose = function(data) {
              if (false !== config.tag) {
                if (data && (data.target == input || data.target == element || data.target == config.tag)) {
                  return false;
                }
                config.tag.style.display = "none";
                if (ColorPicker.activePopUp == self) {
                  ColorPicker.activePopUp = false;
                }
              }
            };
            this.popUpShow = function(left) {
              if (false !== config.tag && (!e.popupshow || (0, e.popupshow)(self, left))) {
                if (!ColorPicker.popupEventsInclude) {
                  addEvent(doc, "click", function(testItemData) {
                    return ColorPicker.activePopUp ? ColorPicker.activePopUp.popUpClose(testItemData) : false;
                  }, "popup_close_");
                  addEvent(window, "resize", function(leftBound) {
                    if (ColorPicker.activePopUp) {
                      return ColorPicker.activePopUp.popUpShow(leftBound);
                    }
                  }, "popup_resize_");
                  ColorPicker.popupEventsInclude = true;
                }
                if (ColorPicker.activePopUp) {
                  ColorPicker.activePopUp.popUpClose(false);
                }
                left = self.getCanvas().width;
                var clickable = self.getAlphaFig();
                if (clickable) {
                  left = left - (clickable.width + clickable.padding);
                }
                clickable = parseInt(config.tag.style.paddingBottom) + parseInt(config.tag.style.paddingTop);
                if (0 >= clickable) {
                  clickable = 0;
                }
                var anchorBoundingBoxViewport = input.getBoundingClientRect();
                var targetL = anchorBoundingBoxViewport.left + (window.scrollX || window.pageXOffset || doc.body.scrollLeft);
                config.tag.style.top = anchorBoundingBoxViewport.top + (window.scrollY || window.pageYOffset || doc.body.scrollTop) - clickable - left - config.margin + "px";
                config.tag.style.left = targetL + "px";
                config.tag.style.display = "block";
                ColorPicker.activePopUp = self;
                return false;
              }
            };
            this.setHueByDot = function(y) {
              y = distance(y, data.pos) + data.startAngle;
              if (0 > y) {
                y = 360 + y;
              }
              p.h = y / 360;
              color = hsvToRgb(p.h, p.s, p.v);
              val = merge(color);
              change();
              if (e.change) {
                (0, e.change)(self);
              }
              parse();
              scope_bb = false;
              render();
            };
            this.setColorForColorSaver = function(out, header) {
              var r = callback(out, true);
              if (r) {
                var info = self.getColorSaver(header);
                if (info.selected) {
                  this.setColorByHex(out, false);
                } else {
                  info.color = r.h;
                  render();
                }
                return true;
              }
            };
            this.setColorByHex = function(x, o) {
              if (!o) {
                o = false;
              }
              var result = value;
              if (false !== x) {
                if (!x || !x.length) {
                  return;
                }
                var r = callback(x, true);
                if (!r) {
                  return;
                }
                x = r.h;
                if (root) {
                  result = r.a;
                }
              } else {
                x = val;
              }
              if (root && x == val && scope_bb && result != value) {
                value = result;
                render();
              } else {
                if (!(val && x == val && scope_bb)) {
                  value = result;
                  color = getColor(x);
                  val = x;
                  p = rgb2hsv(color);
                  result = _this.svToDot(p);
                  p.x = result.x;
                  p.y = result.y;
                  scope_bb = false;
                  change();
                  render();
                  if (e.change) {
                    (0, e.change)(self);
                  }
                  parse(o);
                }
              }
            };
            this.setAlphaByDot = function(arg) {
              value = me.dotToAlpha(arg);
              if (e.change) {
                (0, e.change)(self);
              }
              parse();
              render();
            };
            this.setAlpha = function(a) {
              value = a;
              parse();
              render();
            };
            this.setColorByDot = function(a) {
              var q = _this.dotToSv(a);
              p.s = q.s;
              p.v = q.v;
              p.x = a.x;
              p.y = a.y;
              if (1 < p.s) {
                p.s = 1;
              }
              if (0 > p.s) {
                p.s = 0;
              }
              if (1 < p.v) {
                p.v = 1;
              }
              if (0 > p.v) {
                p.v = 0;
              }
              color = hsvToRgb(p.h, p.s, p.v);
              val = merge(color);
              change();
              if (e.change) {
                (0, e.change)(self);
              }
              parse();
              render();
            };
            this.mouseOutEvent = function(type) {
              if (0 < obj.curType && !ColorPicker.cursorLock) {
                obj.initStandartCursor();
              }
            };
            this.mouseMoveRest = function(b) {
              if (!canViewMyFiles && canAccessMyFiles) {
                canAccessMyFiles = false;
                var c = $(b);
                obj.updateCursor(c);
                requestAnimationFrame(function() {
                  canAccessMyFiles = true;
                });
                if (e.mousemoverest) {
                  (0, e.mousemoverest)(b, self, c);
                }
              }
            };
            this.touchMoveEvent = function(event) {
              if (canViewMyFiles) {
                event.preventDefault();
              }
            };
            this.mouseDownEvent = function(e) {
              e.preventDefault();
              var f;
              var c = false;
              var p = $(e);
              if (data.isDotIn(p)) {
                canViewMyFiles = "wheel";
                self.setHueByDot(p);
          
                f = function(name) {
                  self.wheelMouseMove(name, p);
                };
          
                c = function(settings) {
                  ColorPicker.cursorLock = false;
                  self.wheelMouseUp(settings, p);
                };
              } else {
                if (_this.isDotIn(p)) {
                  canViewMyFiles = "sv";
                  self.setColorByDot(p);
          
          
                  f = function(other) {
                    self.svMouseMove(other, p);
                  };
          
          
                  c = function(settings) {
                    ColorPicker.cursorLock = false;
                    self.svMouseUp(settings, p);
                  };
                } else {
                  if (root && me.isDotIn(p)) {
                    canViewMyFiles = "alpha";
                    self.setAlphaByDot(p);
              
          
                    f = function(name) {
                      self.alphaMouseMove(name, p);
                    };
              
          
                    c = function(settings) {
                      ColorPicker.cursorLock = false;
                      self.alphaMouseUp(settings, p);
                    };
                  } else {
                    if (scope && scope.isDotIn(p)) {
                      self.setMethod();
                    } else {
                      if (colors.length) {
                        e = 0;
                        for (; e <= colors.length - 1; ++e) {
                          if (colors[e].isDotIn(p)) {
                            test(e);
                            break;
                          }
                        }
                      }
                    }
                  }
                }
              }
              if (f && c) {
                remove();
                ColorPicker.cursorLock = self;
                addEvent(doc, "mouseup", c, "action_process_");
                addEvent(doc, "mousemove", f, "action_process_");
                addEvent(doc, "touchend", c, "action_process_");
                addEvent(doc, "touchmove", f, "action_process_");
              }
            };
            this.wheelMouseMove = function(event, rel) {
              event.preventDefault();
              if (canViewMyFiles && canAccessMyFiles) {
                canAccessMyFiles = false;
                var d = $(event);
                requestAnimationFrame(function() {
                  canAccessMyFiles = true;
                });
                self.setHueByDot(d);
                if (e.mousemoveh) {
                  (0, e.mousemoveh)(event, self, d);
                }
              }
            };
            this.wheelMouseUp = function(a, b) {
              a.preventDefault();
              if (canViewMyFiles) {
                removeEvent(doc, "mouseup", "action_process_");
                removeEvent(doc, "mousemove", "action_process_");
                removeEvent(doc, "touchend", "action_process_");
                removeEvent(doc, "touchmove", "action_process_");
                on();
                scope_bb = canViewMyFiles = false;
                render();
                var c = $(a);
                obj.updateCursor(c);
                if (e.mouseuph) {
                  (0, e.mouseuph)(a, self, c);
                }
              }
            };
            this.alphaMouseMove = function(event, rel) {
              event.preventDefault();
              if (canViewMyFiles && canAccessMyFiles) {
                canAccessMyFiles = false;
                var d = $(event);
                d = me.limitDotPosition(d);
                requestAnimationFrame(function() {
                  canAccessMyFiles = true;
                });
                self.setAlphaByDot(d);
                if (e.mousemovealpha) {
                  (0, e.mousemovealpha)(event, self, d);
                }
              }
            };
            this.alphaMouseUp = function(a, b) {
              a.preventDefault();
              if (canViewMyFiles) {
                removeEvent(doc, "mouseup", "action_process_");
                removeEvent(doc, "mousemove", "action_process_");
                removeEvent(doc, "touchend", "action_process_");
                removeEvent(doc, "touchmove", "action_process_");
                on();
                canViewMyFiles = false;
                var c = $(a);
                obj.updateCursor(c);
                if (e.mouseupalpha) {
                  (0, e.mouseupalpha)(a, self, c);
                }
              }
            };
            this.svMouseMove = function(a, b) {
              a.preventDefault();
              if (canViewMyFiles && canAccessMyFiles) {
                canAccessMyFiles = false;
                var c = $(a);
                c = _this.limitDotPosition(c);
                requestAnimationFrame(function() {
                  canAccessMyFiles = true;
                });
                self.setColorByDot(c);
                if (e.mousemovesv) {
                  (0, e.mousemovesv)(a, self, c);
                }
              }
            };
            this.svMouseUp = function(a, b) {
              a.preventDefault();
              if (canViewMyFiles) {
                removeEvent(doc, "mouseup", "action_process_");
                removeEvent(doc, "mousemove", "action_process_");
                removeEvent(doc, "touchend", "action_process_");
                removeEvent(doc, "touchmove", "action_process_");
                on();
                canViewMyFiles = false;
                var c = $(a);
                obj.updateCursor(c);
                if (root) {
                  scope_bb = false;
                  render();
                }
                if (e.mouseupsv) {
                  (0, e.mouseupsv)(a, self, c);
                }
              }
            };
            this.addUserEvent = function(a, b) {
              e[a] = b;
              return true;
            };
            this.removeUserEvent = function(childProp) {
              if (!e[childProp]) {
                return false;
              }
              e[childProp] = null;
              return true;
            };
            this.getCanvas = function() {
              return ctx ? element : false;
            };
            this.getCtx = function() {
              return ctx ? ctx : false;
            };
            this.getInput = function() {
              return input;
            };
            this.getSvFig = function() {
              return _this;
            };
            this.getSvFigCursor = function() {
              return point;
            };
            this.getWheel = function() {
              return data;
            };
            this.getWheelCursor = function() {
              return options;
            };
            this.getCurColorHsv = function() {
              return p;
            };
            this.getCurColorRgb = function() {
              return color;
            };
            this.getCurColorHex = function() {
              return val;
            };
            this.getCurColorRgba = function() {
              return {
                r : color.r,
                g : color.g,
                b : color.b,
                a : value
              };
            };
            this.getCurAlpha = function() {
              return value;
            };
            this.getAlphaFig = function() {
              return root ? me : false;
            };
            this.getPopup = function() {
              return config;
            };
            this.getSize = function() {
              return width;
            };
            this.getColorSaver = function(value) {
              var i = 0;
              for (; i <= colors.length - 1; ++i) {
                if (!value && colors[i].selected || colors[i].align == value) {
                  return colors[i].rgb = getColor(colors[i].color), colors[i].hsv = rgb2hsv(colors[i].rgb.r, colors[i].rgb.g, colors[i].rgb.b), colors[i];
                }
              }
            };
            this.setColorSaver = function(value) {
              if (!value) {
                return false;
              }
              var i = 0;
              for (; i <= colors.length - 1; ++i) {
                if (colors[i].align == value) {
                  return test(i), colors[i];
                }
              }
            };
            this.updateView = function(bitmap) {
              if (!ctx) {
                return false;
              }
              if (bitmap) {
                data.imageData = null;
                img = _this.imageData = null;
              }
              scope_bb = false;
              show();
              render();
              return true;
            };
            this.resize = function(n, init) {
              if (!ctx) {
                return false;
              }
              if (n == width && !init) {
                return true;
              }
              scope_bb = false;
              data.imageData = null;
              img = _this.imageData = null;
              width = n;
              show();
              self.setColorByHex(false);
              return false;
            };
            this.syncSize = function(node) {
              if (!type) {
                return false;
              }
              if (node = wrap(type)) {
                self.resize(node);
              }
              return false;
            };
            this.setMethod = function(name) {
              if (!name) {
                name = "triangle";
                if ("triangle" == n) {
                  name = "quad";
                }
              }
              if (name == n || "quad" != n && "triangle" != n) {
                return false;
              }
              n = name;
              if ("quad" == n) {
                _this = link();
              }
              if ("triangle" == n) {
                _this = draw();
              }
              self.resize(width, true);
              if (e.setmethod) {
                (0, e.setmethod)(self, n);
              }
              return true;
            };
            this.destroy = function() {
              if (!self) {
                return false;
              }
              if (0 < obj.curType) {
                ColorPicker.cursorLock = false;
                obj.initStandartCursor();
              }
              if (canViewMyFiles) {
                removeEvent(doc, "mouseup", "action_process_");
                removeEvent(doc, "mousemove", "action_process_");
                removeEvent(doc, "touchend", "action_process_");
                removeEvent(doc, "touchmove", "action_process_");
                canViewMyFiles = false;
              }
              if (config.tag) {
                removeEvent(input, "click", "popup_");
              }
              if (input) {
                removeEvent(input, "click", "input_edit_");
                removeEvent(input, "change", "input_edit_");
                removeEvent(input, "keyup", "input_edit_");
                removeEvent(input, "keypress", "input_edit_");
              }
              if (ColorPicker.popupEventsInclude && el.popup_close_click) {
                if (ColorPicker.activePopUp) {
                  ColorPicker.activePopUp.popUpClose(false);
                }
                removeEvent(doc, "click", "popup_close_");
                removeEvent(window, "resize", "popup_resize_");
                ColorPicker.popupEventsInclude = false;
              }
              data.imageData = null;
              canvas = img = _this.imageData = null;
              if (target && target.parentNode) {
                target.parentNode.removeChild(target);
              }
              if (type) {
                removeEvent(window, "resize", "canvas_");
              }
              remove();
              self = null;
            };
            (function(options) {
              var l = "";
              var result = "";
              if (void 0 !== options.alpha_slider) {
                options.alphaSlider = options.alpha_slider;
              }
              if (void 0 !== options.input_color) {
                options.inputColor = options.input_color;
              }
              if (void 0 !== options.input_format) {
                options.inputFormat = options.input_format;
              }
              if (options.input && "object" !== typeof options.input) {
                options.input = doc.getElementById(options.input);
                input = options.input;
              } else {
                if ("object" === typeof options.input) {
                  input = options.input;
                }
              }
              if (void 0 !== options.changeCursor) {
                globalFailure = options.changeCursor;
              }
              if (void 0 !== options.alpha) {
                value = options.alpha;
              }
              if (void 0 !== options.alphaSlider) {
                root = options.alphaSlider;
              }
              if (void 0 !== options.inputColor) {
                awsSTSToken = options.inputColor;
              }
              if (void 0 !== options.inputFormat) {
                format = options.inputFormat;
              }
              if (options.userEvents) {
                e = options.userEvents;
              }
              if (options.place && "object" !== typeof options.place) {
                result = options.place;
                options.place = doc.getElementById(options.place);
              }
              if (options.place) {
                target = options.place;
              } else {
                if (input) {
                  config.tag = doc.createElement("div");
                  config.tag.className = "popup-kelly-color";
                  if (options.popupClass) {
                    config.tag.className = options.inputClassName;
                  } else {
                    config.tag.className = "popup-kelly-color";
                    config.tag.style.position = "absolute";
                    config.tag.style.bottom = "0px";
                    config.tag.style.left = "0px";
                    config.tag.style.display = "none";
                    config.tag.style.backgroundColor = "#e1e1e1";
                    config.tag.style.border = "1px solid #bfbfbf";
                    config.tag.style.boxShadow = "7px 7px 14px -3px rgba(0,0,0,0.24)";
                    config.tag.style.borderTopLeftRadius = "4px";
                    config.tag.style.borderTopRightRadius = "4px";
                    config.tag.style.borderBottomLeftRadius = "4px";
                    config.tag.style.borderBottomRightRadius = "4px";
                    config.tag.style.padding = "12px";
                    config.tag.style.boxSizing = "content-box";
                  }
                  target = config.tag;
                  doc.getElementsByTagName("body")[0].appendChild(config.tag);
                  addEvent(input, "click", function(intoId) {
                    return self.popUpShow(intoId);
                  }, "popup_");
                } else {
                  l = l + ('| "place" (' + result + ") not not found");
                }
              }
              result = false;
              if (options.color) {
                result = callback(options.color);
              } else {
                if (input && input.value) {
                  result = callback(input.value);
                }
              }
              if (result) {
                val = result.h;
                if (root) {
                  value = result.a;
                }
              }
              if (!(!options.method || "triangle" != options.method && "quad" != options.method)) {
                n = options.method;
              }
              if (!Canvas()) {
                l = l + " | cant init canvas context";
              }
              if (options.resizeWith) {
                if ("object" !== typeof options.resizeWith) {
                  options.resizeWith = doc.getElementById(options.resizeWith);
                }
                type = true === type ? element : options.resizeWith;
                if (options.resizeSide) {
                  undefined = options.resizeSide;
                }
                if (type) {
                  if (wrap(type)) {
                    options.size = wrap(type);
                  }
                  addEvent(window, "resize", function(win) {
                    return self.syncSize(win);
                  }, "canvas_");
                }
              }
              if (options.size && 0 < options.size) {
                width = options.size;
              }
              if (l) {
                if ("undefined" !== typeof console) {
                  console.log("ColorPicker : " + l);
                }
              } else {
                if ("quad" == n) {
                  _this = link();
                }
                if ("triangle" == n) {
                  _this = draw();
                }
                if (input) {
                  l = function(event) {
                    event = event || window.event;
                    if (!event.target) {
                      event.target = event.srcElement;
                    }
                    self.setColorByHex(event.target.value, true);
                  };
                  addEvent(input, "click", l, "input_edit_");
                  addEvent(input, "change", l, "input_edit_");
                  addEvent(input, "keyup", l, "input_edit_");
                  addEvent(input, "keypress", l, "input_edit_");
                }
                if (options.colorSaver) {
                  update("left", true);
                  update("right");
                }
                if (options.methodSwitch) {
                  Layer();
                }
                on();
                show();
                self.setColorByHex(false);
              }
            })(settings);
        }
        ColorPicker.cursorLock = false;
        ColorPicker.activePopUp = false;
        ColorPicker.popupEventsInclude = false;
        ColorPicker.attachToInputByClass = function(name, options) {
          var riakNodes = [];
          var inputs = doc.querySelectorAll(name);
          var i = 0;
          for (; i < inputs.length; i++) {
            if (options) {
              options.input = inputs[i];
            } else {
              options = {
                input : inputs[i],
                size : 150
              };
            }
            riakNodes.push(new ColorPicker(options));
          }
          return riakNodes;
        };
        return ColorPicker.attachToInputByClass(__this.element, options)
    },
      todoList(){
        let todoItems = []
        let remaining = todoItems.filter(todoItem => !todoItem.completed).length
        let divTodo = document.createElement('div')
        divTodo.innerHTML  = `<header class="header">
          <input type="text" class="new-todo" placeholder="Ajouter une tache"><button class="plus">add</button>
        </header>
        <div class="main">
          <ul class="todo-list"></ul>
        </div>
        <footer class="footer"></footer>`
        document.body.appendChild(divTodo)
        let input = document.querySelector("header input.new-todo")
        let value = input.value
        function newLi(){
          let input = document.querySelector("header input.new-todo")
          let value = input.value
          let ul = document.querySelector("ul.todo-list")
          let li = document.createElement('li')
          li.innerHTML = `<input type="checkbox" class="toggle">
          <label><h1>${ value }</h1></label>`
          ul.appendChild(li)
        }
        while(true){
          let inputToggles = document.querySelectorAll("input.toggle")
          inputToggles.forEach((inputToggle) => {
            if(inputToggle.checked === true){
              document.querySelectorAll("label h1").forEach((labelH1) => {
                labelH1.classList.add("bared")
              })
            }
          })
        }
        document.querySelector("header.header button.plus").addEventListener('click', function(){
          if(input.value == "") return false
          else{
            newLi()
            todoItems.push({
              completed: false,
              name: input.value
            })
            input.value = ""
            remaining = todoItems.filter(todoItem => !todoItem.completed).length
            document.querySelector("footer.footer").innerHTML = `<span><strong>${ remaining }</strong> tâche${ remaining > 1 ? 's':'' } à faire</span>`
          }
        })
      }
    }
  }
}
class CarouselTouchPlugin{
    constructor(carousel){
        carousel.container.addEventListener('dragstart', e => e.preventDefault())
        carousel.container.addEventListener('mousedown', this.startDrag.bind(this))
        carousel.container.addEventListener('touchstart', this.startDrag.bind(this))
        window.addEventListener('mousemove', this.drag.bind(this))
        window.addEventListener('touchmove', this.drag.bind(this))
        window.addEventListener('mouseup', this.endDrag.bind(this))
        window.addEventListener('touchend', this.endDrag.bind(this))
        window.addEventListener('touchcancel', this.endDrag.bind(this))
        this.carousel = carousel
    }
    startDrag(e){
        if(e.touches){
            if(e.touches.length > 1) return
            else e = e.touches[0]
        }
        this.origin = {x: e.screenX,y: e.screenY}
        this.width = this.carousel.containerWidth
        this.carousel.disableTransition()
    }
    drag(e){
        if(this.origin){
            let point = e.touches ? e.touches[0] : e
            let translate = {x: point.screenX - this.origin.x,y: point.screenY - this.origin.y}
            if(e.touches && Math.abs(translate.x) > Math.abs(translate.y)){
                e.preventDefault()
                e.stopPropagation()
            }else if (e.touches && Math.abs(translate.y) > Math.abs(translate.x)){
                e.preventDefault()
                e.stopPropagation()
            }
            let baseTranslate = this.carousel.currentItem * -100 / this.carousel.items.length
            let lastTranslate = translate
            this.translate(baseTranslate + 100 * translate.x / this.width)
        }
    }
    endDrag(e){
        if(this.origin && this.lastTranslate){
            this.carousel.enableTransition()
            if(Math.abs(this.lastTranslate.x / this.carousel.carouselWidth) > 0.2){
                if(this.lastTranslate.x < 0) this.carousel.next()
                else this.carousel.prev()
            }
        }else this.carousel.gotoItem(this.carousel.currentItem)
        this.origin = null
    }
}
class Carousel{
    constructor(element, options = {}){
        this.element = element
        this.options = Object.assign({}, {
            slidesToScroll: 1,
            slidesVisible: 1,
            navigation: true,
            loop: false,
            pagination: false,
            infinite: false,
            autoScrolling: true
        }, options)
        if(this.options.loop && this.options.infinite) console.error(`[Carousel]: Vous ne pouvez pas avoir "loop" et "infinite" ensemble`)
        let children = [].slice.call(element.children)
        this.isMobile = false
        this.currentItem = 0
        this.moveCallbacks = []
        this.offset = 0
        this.root = this.createDivWithClass('carousel')
        this.container = this.createDivWithClass('carousel-container')
        this.root.setAttribute('tabindex', '0')
        this.root.appendChild(this.container)
        this.element.appendChild(this.root)
        this.items = children.map((child) => {
            let item = this.createDivWithClass('carousel-item')
            item.appendChild(child)
            return item
        })
        if(this.options.infinite){
            this.offset = this.options.slidesVisible + this.options.slidesToScroll - 1
            if(this.offset > children.length) console.error(`[Carousel]: Vous n'avez pas assez d'élément dans le carousel ${element} merci de bien vouloir régler le problème.`)
            this.items = [
                ...this.items.slice(this.items.length - this.offset.map(item => item.cloneNode(true))),
                ...this.items,
                ...this.items.slice(0, this.offset).map(item => item.cloneNode(true))
            ]
            this.gotoItem(this.offset, false)
        }
        if(this.options.autoScrolling) window.setInterval(() => this.gotoItem(this.offset + 1), 2000)
        this.items.forEach(item => this.container.appendChild(item))
        this.setStyle()
        if(this.options.navigation) this.createNavigation()
        if(this.options.pagination) this.createPagination()
        this.moveCallbacks.forEach(callback => callback(this.currentItem))
        this.onWindowResize()
        window.addEventListener('resize', this.onWindowResize.bind(this))
        this.root.addEventListener('keyup', (e) => {
            if(e.key === 'ArrowRight' || e.key === 'Right') this.next()
            else if(e.key === 'ArrowLeft'|| e.key === 'Left') this.prev()
        })
        if(this.options.infinite) this.container.addEventListener('transitionend', this.resetInfinity.bind(this))
        new CarouselTouchPlugin(this)
    }
    setStyle(){
        let ratio = this.items.length / this.slidesVisible
        this.container.style.width = (ratio * 100)+"%"
        this.items.forEach(item => item.style.width = ((100 / this.slidesVisible) / ratio)+"%");
    }
    createNavigation(){
        let nextBtn = this.createDivWithClass('carousel-next')
        let prevBtn = this.createDivWithClass('carousel-prev')
        this.root.appendChild(nextBtn)
        this.root.appendChild(prevBtn)
        nextBtn.addEventListener('click', this.next.bind(this))
        prevBtn.addEventListener('click', this.prev.bind(this))
        if(this.options.loop === true) return
        this.onMove(index => {
            if(index === 0) prevBtn.classList.add('carousel-prev-hiddden')
            else prevBtn.classList.remove('carousel-prev-hiddden')
            if(this.items[this.currentItem + this.slidesVisible] === undefined) nextBtn.classList.add('carousel-next-hiddden')
            else nextBtn.classList.remove('carousel-next-hiddden')
        })
    }
    createPagination(){
        let pagination = this.createDivWithClass('carousel-pagination')
        let buttons = []
        this.root.appendChild(pagination)
        for(let i = 0; i < (this.items.length - 2 * this.offset); i = i + this.options.slidesToScroll){
            let button = this.createDivWithClass('carousel-pagination-button')
            button.addEventListener('click', () => this.gotoItem(i + this.offset))
            pagination.appendChild(button)
            buttons.push(button)
        }
        this.onMove(index => {
            let count = this.items.length - 2 * this.offset
            let activeButton = buttons[Math.floor((index - this.offset) % count / this.options.slidesToScroll)]
            if(activeButton){
                buttons.forEach(button => button.classList.remove('carousel-pagination-button-active'))
                activeButton.classList.add('carousel-pagination-button-active')
            }
        })
    }
    translate(percent){ this.container.style.transform = 'translate3d('+ percent +'%, 0, 0)' }
    next(){ this.gotoItem(this.currentItem + this.slidesToScroll) }
    prev(){ this.gotoItem(this.currentItem - this.slidesToScroll) }
    gotoItem(index, animation = true){
        if(index < 0){
            if(this.options.loop)index = this.items.length - this.slidesVisible
            else return
        }else if(index >= this.items.length || (this.items[this.currentItem + this.slidesVisible] === undefined && index > this.currentItem)){
            if(this.options.loop) index = 0
            else return
        }
        let translateX = index * -100 / this.items.length
        if(animation === false) this.container.style.transition = 'none'
        this.translate(translateX)
        this.container.offsetHeight
        if(animation === false) this.container.style.transition = ''
        this.currentItem = index
        this.moveCallbacks.forEach(callback => callback(index))
    }
    resetInfinity(){
        if(this.currentItem <= this.options.slidesToScroll) this.gotoItem(this.currentItem + (this.items.length - 2 * this.offset), false)
        else if(this.currentItem >= this.items.length - this.offset) this.gotoItem(this.currentItem - (this.items.length - 2 * this.offset), false)
    }
    onMove(callback){ this.moveCallbacks.push(callback) }
    onWindowResize(){
        let mobile = window.innerWidth < 800
        if(mobile !== this.isMobile){
            this.isMobile = mobile
            this.setStyle()
            this.moveCallbacks.forEach(callback => callback(this.currentItem))            
        }
    }
    createDivWithClass(className){
        let div = document.createElement('div')
        div.setAttribute('class', className)
        return div
    }
    disableTransition(){ this.container.style.transition = 'none' }
    enableTransition(){ this.container.style.transition = '' }
    get slidesToScroll (){ return this.isMobile ? 1 : this.options.slidesToScroll }
    get slidesVisible (){ return this.isMobile ? 1 : this.options.slidesVisible }
    get containerWidth(){ return this.container.offsetWidth }
    get carouselWidth(){ return this.root.offsetWidth }
}
class Game{
    constructor(contexts, options = {}){
        this.contexts = contexts
        this.options = Object.assign({}, {
            time: true,
            sizeWidth: '100px',
            sizeHeight: '100px',
            color: "#212F3D"
        }, options)
        if(this.options.time){
            this.timer = 999
            this.decrement()
        }
        this.canvas = document.createElement('canvas')
        this.context = Canvas.getContext(contexts)
        this.canvas.style.width = this.options.sizeWidth
        this.canvas.style.height = this.options.sizeHeight
        this.canvas.style.border = "1px solid " + this.options.color
    }
    decrement(){
        let timerD = window.setInterval(() => {
            this.timer--
        }, 1000)
    }
    font(font){
        return this.canvas.style.background = `url(${font})`
    }
}
function Game2D(object){
    return new Game("2d", object)
}
function Game3D(object){
    return new Game("3d", object)
}
function $A(element, all){
    return new Audine(element, all).Type
}
