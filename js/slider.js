function Slider(elementId) {
  var that = this;
  var element = document.getElementById(elementId);
  var prev = document.getElementById("prev");
  var next = document.getElementById("next");
  var intervalId;
  this.current = 0;
  this.marginLeft = 0;

  this.init = function () {
    this.slide();
    this.addEvents();
    this.buttonCreate();

  }

  this.addEvents = function () {
    prev.addEventListener('click', that.previous);
    next.addEventListener('click', that.next);
  }

  this.goto = function (pos) {
    that.pause();
    that.marginLeft = -(1024 * (pos - 1));
    element.style.marginLeft = that.marginLeft + 'px';
  }

  this.slide = function () {
    that.intervalId = setInterval(function () {
      that.marginLeft -= 4;
      element.style.marginLeft = that.marginLeft + 'px';

      if (that.marginLeft < -4096) {
        that.marginLeft = 0;
      }
      that.checkButtonColorShift();
      
      if (that.marginLeft % 1024 == 0) {
        that.pause(); 
      }
    }, 1000 / 60);
  }
  
  this.pause = function () {
    clearInterval(that.intervalId);
    setTimeout(function () {
      clearInterval(that.intervalId);

      that.slide();
    }, 5000);
  }
  
  this.previous = function () {

    var value = that.marginLeft;
    var remainder = value % 1024;

    value = value - remainder + 1024;

    if (value > 0) {
      value = -4096;
    }

    that.marginLeft = value;
    element.style.marginLeft = that.marginLeft + 'px';
    that.pause();
  }

  this.next = function () {
    that.pause();

    var value = that.marginLeft;
    var remainder = value % 1024;

    value = value - remainder - 1024;

    if (value < -4096) {
      value = 0;
    }

    that.marginLeft = value;
    element.style.marginLeft = that.marginLeft + 'px';
  }

  this.stop = function () {
    clearInterval(that.intervalId);
  }

  this.buttonCreate = function () {
    var x = document.getElementById("slider").getElementsByClassName("circle");
//        element.appendChild(); //document.getElementById('middle').appendChild(x);

    for (var i = 1; i <= x.length; i++) {
      var btn = document.createElement("BUTTON");
      btn.id = "btn" + i;
//      btn.innerHTML = '' + i;
      btn.style.border = "1px solid black";
      btn.style.borderRadius = "10px";
      btn.style.height = "15px";
      btn.style.width = "15px";
//btn.style.position= absolute;
//  btn.style.top= 50%;
      document.body.appendChild(btn);

      btn.addEventListener('click', function (i) {
        return function () {
          that.goto(i);
          that.changeColor(i);
          
        }
      }(i));

      this.reset = function () {
        btn1.style.backgroundColor = '';
        btn2.style.backgroundColor = '';
        btn3.style.backgroundColor = '';
        btn4.style.backgroundColor = '';
        btn5.style.backgroundColor = '';
      }
      
      this.changeColor = function (i) {
        that.reset();
        var value = that.marginLeft;
        var quotient = value / 1024;
        console.log('quotient' + (1 - quotient));
        var b = document.querySelector("#btn" + (1 - quotient));
        if (that.marginLeft == 0) {
          b.setAttribute("class", "active");
          b.style.border = "1px solid black";
          b.style.backgroundColor = "#8E44AD  ";
        }
        if (that.marginLeft == -1024) {
          b.setAttribute("class", "active");
          b.style.border = "1px solid black";
          b.style.backgroundColor = "#8E44AD  ";
        }
        if (that.marginLeft == -2048) {
          b.setAttribute("class", "active");
          b.style.border = "1px solid black";
          b.style.backgroundColor = "#8E44AD  ";
        }
        if (that.marginLeft == -3072) {
          b.setAttribute("class", "active");
          b.style.border = "1px solid black";
          b.style.backgroundColor = "#8E44AD  ";
        }
        if (that.marginLeft == -4096) {
          b.setAttribute("class", "active");
          b.style.border = "1px solid black";
          b.style.backgroundColor = "#8E44AD  ";
        }
      };
      clearInterval(intervalId);
    }
  }
  this.checkButtonColorShift = function () {
    
    if (that.marginLeft <= -4 && that.marginLeft > -1023) {
      btn1.style.border = "1px solid black";
      btn1.style.backgroundColor = "#8E44AD  ";
    }

    if (that.marginLeft <= -1024 && that.marginLeft > -2047) {
      that.reset();
      btn2.style.border = "1px solid black";
      btn2.style.backgroundColor = "#8E44AD  ";
    }

    if (that.marginLeft <= -2048 && that.marginLeft > -3071) {
      that.reset();
      btn3.style.border = "1px solid black";
      btn3.style.backgroundColor = "#8E44AD  ";
    }

    if (that.marginLeft <= -3072 && that.marginLeft > -4095) {
      that.reset();
      btn4.style.border = "1px solid black";
      btn4.style.backgroundColor = "#8E44AD  ";
    }

    if (that.marginLeft == -4096) {
      that.reset();
      btn5.style.border = "1px solid black";
      btn5.style.backgroundColor = "#8E44AD  ";
//that.reset();

    }
    
  }
}
var slider = new Slider('slider');
slider.init();
