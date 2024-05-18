$(function() {
    let chooseRes = [];
    let oppRes = [];
    let rule = 0;
    let flag = true
    $('.rule').click(function()  {
        rule = +$(this).attr('value')
        updateClcu()
    })
    $('.exit').click(() => {
        $('.clcu').addClass('closed')
        $('.option').removeClass('closed')
        $('.result-menu').addClass('closed')
        clearBox();
        chooseRes = [];
        oppRes = [];
        flag = true
    })
    $('.submit').click(() => {
        if (flag) {
            chooseRes = [];
            if (rule === 3){
                $('.choose-box1 input,.choose-box2 input,.choose-box3 input').each(function() {
                    if ($(this)[0].checked){
                        chooseRes.push(+$(this).val())
                    }
                });
            }else {
                $('.choose-box input').each(function() {
                    if ($(this)[0].checked){
                        chooseRes.push(+$(this).val())
                    }
                });
            }
        }else {
            oppRes = [];
            let number = $('.number-box input').val();
            if (number){
                oppRes.push(+number)
            }
            $('.choose-box1 input').each(function() {
                if ($(this)[0].checked){
                    oppRes.push(+$(this).val())
                }
            });
        }
        console.log(chooseRes, oppRes);
        toggleView();
    })
    $('.choose-box input[type="checkbox"]').on('change', function() {
        let $this = $(this);
        let $chooseBox = $this.closest('.choose-box');
        if ($this.is(':checked')) {
            $chooseBox.find('input[type="checkbox"]').not($this).prop('checked', false);
        }
    });
    function toggleView () {
        if (flag) {
            if (chooseRes.length === rule){
                $('.des').text('请选择对方喊出的点数')
                $('.number-box').removeClass('closed')
                $('.choose-box').addClass('closed');
                $('.choose-box1').removeClass('closed');
                clearBox();
                flag = false
            }
        }else {
            if (oppRes.length === 2){
                let res = clcu();
                $('.result-menu').removeClass('closed').text("概率为: " + res)
            }
        }
    }
    function clcu() {
        let calledDiceCount = oppRes[0]
        let calledDiceNumber = oppRes[1]
        // 计算总可能的组合数
        const totalOutcomes = Math.pow(6, rule === 3 ? 3 : 5); // 假设每个骰子有 6 个面
        // 计算有利的组合数
        let favorableOutcomes = 0;
        // 计算自己掷出的数量
        let ownCount = 0
        chooseRes.forEach(ele => {
            if (ele === calledDiceNumber) {
                ownCount++;
            } else if (ele === 1) {
                if (rule === 5) {
                    ownCount++;
                } else {
                    ownCount += (calledDiceCount < 7) ? 2 : 4;
                }
            }
        });
        // 遍历所有可能的对方骰子组合
        if (rule === 3){
            for (let i = 1; i <= 6; i++) {
                for (let j = 1; j <= 6; j++) {
                    for (let k = 1; k <= 6; k++) {
                        let totalSum = ownCount
                        const opponentDiceRolls = [i, j, k]; // 对方的骰子点数
                        // 计算所有骰子点数之和
                        opponentDiceRolls.forEach(ele => {
                            if (ele === calledDiceNumber) {
                                totalSum++;
                            } else if (ele === 1) {
                                totalSum += (calledDiceCount < 7) ? 2 : 4;
                            }
                        });
                        // 检查总点数是否满足喊出的骰子数量和点数
                        if (totalSum >= calledDiceCount) {
                            favorableOutcomes++; // 有利的组合数加 1
                        }
                    }
                }
            }
        }else {
            for (let i = 1; i <= 6; i++) {
                for (let j = 1; j <= 6; j++) {
                    for (let k = 1; k <= 6; k++) {
                        for (let l = 1; l <= 6; l++) {
                            for (let m = 1; m <= 6; m++) {
                                let totalSum = ownCount;
                                const opponentDiceRolls = [i, j, k, l, m]; // 对方的骰子点数
                                // 计算所有骰子点数之和
                                opponentDiceRolls.forEach((ele) => {
                                    if (ele === calledDiceNumber || ele === 1){
                                        totalSum++
                                    }
                                })
                                // 检查总点数是否满足喊出的骰子数量和点数
                                if (totalSum >= calledDiceCount) {
                                    favorableOutcomes++; // 有利的组合数加 1
                                }
                            }
                        }
                    }
                }
            }
        }
        console.log(favorableOutcomes, totalOutcomes);
        // 计算概率
        return (favorableOutcomes / totalOutcomes * 100).toFixed(2) + '%';
    }
    function clearBox () {
        $('input:text')[0].value = ""
        $('input:checkbox').each(function() {
            $(this)[0].checked = false
        });
    }
    function updateClcu() {
        $('.des').text('请选择你的点数')
        $('.option').addClass('closed')
        $('.clcu').removeClass('closed')
        $('.number-box').addClass('closed')
        $('.choose-box').removeClass('closed');
        if (rule === 3){
            $('.choose-box4,.choose-box5').addClass('closed')
        }
    }

})

