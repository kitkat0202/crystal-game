$(function() {
    let gameStatus = true
    let clickOn = false
    let computerGuess = 0
    let totalSoFar = 0
    let winScore = 0
    let loseScore = 0

    let randomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    let computerRandomNum = () => {
        computerGuess = randomNumber(19, 120)
        $("#random-number").html(computerGuess)
    }


    let crystalRandomNum = () => {
        for (let i = 0; i < 4; i++) {
            $(`#crys-box${i}`).attr("value", randomNumber(1, 12))
        }
    }

    let clearAll = () => {
        setTimeout(() => {
            computerGuess = 0
            totalSoFar = 0
            $("#total").empty()
            computerRandomNum();
            crystalRandomNum();
            $(".win-msg, .lose-msg, .start-msg").addClass("disappear")
            clickOn = true
         }, 1500);
    }

    let loseSteps = () => {
        clickOn = false
        loseScore++
        $("#lose-score").html(loseScore)
        $(".lose-msg").removeClass("disappear")
        clearAll()
    }

    let winSteps = () => {
        clickOn = false
        winScore++
        $("#win-score").html(winScore)
        $(".win-msg").removeClass("disappear")
        clearAll()
    }

    let playAudio = () => {
        document.getElementById("bg-audio").play();
    }

    let stopAudio = () => {
        document.getElementById("bg-audio").pause();
        document.getElementById("bg-audio").currentTime = 0.0;
    }

    $("#start-btn").on("click", function() {
        playAudio()
        clearAll()
    })
    
    $(".crystal-box").on("click", function() {
        if (clickOn) {
            playAudio()
            totalSoFar += parseInt($(this).attr("value"))
            $("#total").html(totalSoFar)
            // console.log($(this).attr("value"))
            totalSoFar > computerGuess ? loseSteps() : gameStatus = true
            totalSoFar === computerGuess ? winSteps() : gameStatus = true
        }
    })
})

