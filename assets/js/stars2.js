
    // 屏幕宽度
    var WINDOW_WIDTH = document.body.offsetWidth;
    // 屏幕高度
    var WINDOW_HEIGHT = document.body.offsetHeight;
    var canvas, context;
    // 星星数量
    var num = 2;
    // 星星数组
    var stars = [];
    // 流星索引
    var rnd;

    // 页面初始化
    window.onload = function () {
        canvas = document.getElementById('star-canvas');
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;

        WINDOW_WIDTH = canvas.offsetWidth
        WINDOW_HEIGHT= canvas.offsetHeight;

        context = canvas.getContext('2d');
        // 生成星星
        addStar();
        // 渲染至画布上
        setInterval(render, 33);
        // 增加流星
        meteor();
    };

    // 生成流星的索引号
    function meteor() {
        var time = Math.round(Math.random() * 3000 + 33);
        setTimeout(function () {
            rnd = Math.ceil(Math.random() * stars.length);
            meteor();
        }, time);
    }

    // 画布渲染
    function render() {
        // 画布背景色(黑色)
        context.fillStyle = 'rgba(0,0,0,0.1)';
        // 画布位置
        context.fillRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

        for (var i = 0; i < num; i++) {
            var star = stars[i];

            // 画流星
            //if (i == rnd) {
                star.vx = -5;
                star.vy = 20;
                context.beginPath();
                context.strokeStyle = 'rgba(255,255,255,' + star.alpha + ')';
                context.lineWidth = star.r;
                context.moveTo(star.x, star.y);
                context.lineTo(star.x + star.vx, star.y + star.vy);
                context.stroke();
                context.closePath();
            //}

            star.alpha += star.ra;


            // 透明度判断，从0到1
            if (star.alpha <= 0) {
                star.alpha = 0;
                star.ra = -star.ra;
                star.vx = Math.random() * 0.2 - 0.1;
                star.vy = Math.random() * 0.2 - 0.1;
            } else if (star.alpha > 1) {
                star.alpha = 1;
                star.ra = -star.ra
            }
            star.x += star.vx;
            // x轴坐标判断
            if (star.x >= WINDOW_WIDTH) {
                star.x = 0;
            } else if (star.x < 0) {
                star.x = WINDOW_WIDTH;
                star.vx = Math.random() * 0.2 - 0.1;
                star.vy = Math.random() * 0.2 - 0.1;
            }
            star.y += star.vy;
            // y轴坐标判断
            if (star.y >= WINDOW_HEIGHT) {
                star.y = 0;
                star.vy = Math.random() * 0.2 - 0.1;
                star.vx = Math.random() * 0.2 - 0.1;
            } else if (star.y < 0) {
                star.y = WINDOW_HEIGHT;
            }

            // 开始绘制
            context.beginPath();
            var bg = context.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r);
            bg.addColorStop(0, 'rgba(255,255,255,' + star.alpha + ')');
            bg.addColorStop(1, 'rgba(255,255,255,0)');
            context.fillStyle = bg;
            // 画圆
            context.arc(star.x, star.y, star.r, 0, Math.PI * 2, true);
            // 实际绘制
            context.fill();
            context.closePath();

        }
    }

    // 生成星星
    function addStar() {
        for (var i = 0; i < num; i++) {
            var aStar = {
                // x轴坐标
                x: Math.round(Math.random() * WINDOW_WIDTH),
                // y轴坐标
                y: Math.round(Math.random() * WINDOW_HEIGHT),
                // 圆半径
                r: Math.random() * 2,
                ra: Math.random() * 0.05,
                // 透明度
                alpha: Math.random(),
                // 横向移动偏移量
                vx:0,// Math.random() * 0.2 - 0.1,
                // 纵向移动偏移量
                vy: 0//Math.random() * 0.2 - 0.1
            };
            stars.push(aStar);
        }
    }
