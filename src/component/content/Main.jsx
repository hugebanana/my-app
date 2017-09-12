import React from 'react';
import {  notification, Icon } from 'antd';

class Main extends React.Component {

    constructor(props) {
        super(props);
        this.count = 0;
        this.ctx = {};
        this.desk = [];
        this.state = {time: 0,canvas:{}};
        //赢法数组
        this.win = [];
        this.playerWinCount = [];
        this.comWinCount = [];


    }

    changeWin = (x, y, player) => {
        console.log(x,y);
        if (player === 'player') {
            for (let i = 0; i < this.win[x - 1][y - 1].length; i++) {
                if (this.win[x - 1][y - 1][i]) {
                    this.playerWinCount[i]++;
                    // console.log('times',i);
                    // console.log(this.playerWinCount[i]);
                    if (this.playerWinCount[i] === 5) {
                        this.openNotification();
                        // alert('winner winner ! chiken dinner!');
                        this.state.time++;

                        for (let i = 0; i < 19; i++) {
                            this.desk[i] = new Array();
                            for (let j = 0; j < 19; j++) {
                                this.desk[i][j] = 1;
                            }
                        }

                        return;
                    }
                    this.comWinCount[i] = 6;
                }
            }
        }
    }

    componentWillUpdate(nextProps, nextState){
        console.log('renew')
        this.componentDidMount();
    }

    openNotification = () => {
        notification.open({
            message: 'winner winner ! chiken dinner!',
            icon: <Icon type="smile-circle" style={{ color: '#108ee9' }} />,
        });
    };

    //675 135
    componentDidMount() {
        this.state.canvas = document.getElementById('myCanvas');
        // this.state.canvas = canvas;
        this.state.canvas.width = 800;
        this.state.canvas.height = 800;
        var ctx = this.state.canvas.getContext('2d');
        this.ctx = ctx;
        ctx.strokeRect(40, 40, 720, 720);
        this.paint(ctx);

        for (let i = 0; i < 19; i++) {
            this.desk[i] = new Array();
            for (let j = 0; j < 19; j++) {
                this.desk[i][j] = 0;
            }
        }

        for (let i = 0; i < 19; i++) {
            this.win[i] = new Array();
            for (let j = 0; j < 19; j++) {
                this.win[i][j] = new Array();
            }
        }

        //横线赢法

        for (var i = 0; i < 19; i++) {
            for (var j = 0; j < 15; j++) {
                for (var k = 0; k < 5; k++) {
                    this.win[i][j + k][this.count] = true;
                }
                this.count++;
            }
        }
        console.log('win', this.win);
        //竖线赢法
        for (i = 0; i < 15; i++) {
            for (j = 0; j < 19; j++) {
                for (k = 0; k < 5; k++) {
                    this.win[i + k][j][this.count] = true;
                }
                this.count++;
            }
        }

        //斜线赢法
        for (i = 0; i < 15; i++) {
            for (j = 0; j < 15; j++) {
                for (k = 0; k < 5; k++) {
                    this.win[i + k][j + k][this.count] = true;
                }
                this.count++;
            }
        }

        //反斜线赢法
        for (i = 0; i < 15; i++) {
            for (j = 4; j < 19; j++) {
                for (k = 0; k < 5; k++) {
                    this.win[i + k][j - k][this.count] = true;
                }
                this.count++;
            }
        }

        for (i = 0; i <= this.count; i++) {
            this.playerWinCount[i] = 0;
            this.comWinCount[i] = 0;
        }
    }

    alphaDog(x,y){
        for (let i = 0; i < this.win[x - 1][y - 1].length; i++) {

        }
    }

    onClick = (e) => {
        if (e.pageX < 715 || e.pageX > 1435) {
            return
        }
        if (e.pageY < 175 || e.pageY > 890) {
            return
        }

        let x = Math.round((e.pageX - 715) / 40) + 1;
        let y = Math.round((e.pageY - 175) / 40) + 1;
        // console.log(e.pageX, e.pageY)
        // console.log(this.desk);
        // console.log(x, y);
        if (this.desk[x - 1][y - 1] === 0) {
            this.putChesspiece(x, y, 'white');

            let mark = this.changeWin(x, y, 'player');
        }
    }

    //下棋子
    putChesspiece = (x, y, color) => {
        // console.log(x, y);
        // console.log(this.desk);

        this.desk[x - 1][y - 1] = 1;
        this.ctx.beginPath();
        this.ctx.arc(40 * x, 40 * y, 15, 0, 2 * Math.PI);
        this.ctx.fillStyle = color;
        this.ctx.stroke();
        this.ctx.fill();
        this.ctx.closePath();

    }

    paint = (ctx) => {
        ctx.lineWidth = 1;
        ctx.strokeStyle = "black";//线条的颜色
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.moveTo(0, 0);
        for (let i = 2; i < 19; i++) {
            ctx.moveTo(40 * i, 40);
            ctx.lineTo(40 * i, 760);
            ctx.closePath();
            ctx.stroke();
        }

        for (let i = 2; i < 19; i++) {
            ctx.moveTo(40, 40 * i);
            ctx.lineTo(760, 40 * i);
            ctx.closePath();
            ctx.stroke();
        }
    }

    render() {
        return (
            <div style={{padding: '0 24px', minHeight: 870}}>
                <div style={{
                    border: 'solid black 1px',
                    height: '800px',
                    width: '800px',
                    left: '400px',
                    position: 'relative'
                }}>
                    <canvas id={'myCanvas'} style={{
                        border: 'solid black 1px',
                        background: '#ffffff'
                    }} onClick={this.onClick}
                    />
                </div>
            </div>
        )
    }
}

export default Main;