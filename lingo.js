// enter here the correct answer
var correctAnswer = 'html5';
// how many lines to guess?
var numberOfLines = 5;





$( document ).ready(function() {
    prepareLingo();
    $( "input" ).keyup(function(event) {
        var targetId = event.target.id;
        var inputVal = $("#"+targetId).val();
        var linesAndRowsArray = targetId.split('_');
        var line = linesAndRowsArray[0];
        var row = linesAndRowsArray[1];
        if(inputVal.length ==1) {
            row++;
            $("#"+line+"_"+row).focus();
            isWordCompleted(line);

        }
    });
});

function isWordCompleted(line)
{
    var isWord;
    var makeWordArray = new Array();
    for(var i =1; i<6; i++) {
        if($("#"+line+"_"+i).val()!='') {
            isWord = true;
            makeWordArray.push(i);
        } else {
            isWord = false;
        }
    }
    // check and validate the row
    if(isWord == true) {
        var inputWord ='';
        makeWordArray.forEach(function(item) {
            inputWord +=$("#"+line+"_"+item).val();
        });
        var wordGuessed = checkWord(inputWord,line);
        if(wordGuessed == false) {
            setNextLineActive(line);
        } else {
            // display, 1337 you have won :-)
        }

    }
    return isWord;
}

function checkWord(inputWord,line)
{
    var checkGoodWord = correctAnswer.split("");
    var wordGuessed = false;
    var isGoodWord;
    for(var i =0; i<inputWord.length; i++) {
        var cube = (i + 1);
        if(i == 0 ) {
            isGoodWord = inputWord[0];
        } else {
            isGoodWord += inputWord[i];
        }
        if(isGoodWord == correctAnswer) {
            wordGuessed =  true;
            markWordAsGuessed(line);
        } else {
            if(cube >1) {
                if(checkGoodWord[i] == inputWord[i]) {
                    $("#"+line+"_"+cube).css("background-color","green").prop('disabled',true);
                } else {
                    $("#"+line+"_"+cube).css("background-color","red").prop('disabled',true);
                }
            }
        }
    }
    return wordGuessed;
}

function setNextLineActive(line)
{
    var nextLine = parseInt(line)  + 1;
    for(var i = 1; i<6; i++) {
        $("#"+nextLine+"_"+i).prop('disabled',false);
    }
    if(line < numberOfLines) {
        line++;
        $("#"+line+"_2").focus();
    }
}


function markWordAsGuessed(line)
{
    for(var i = 1; i<6; i++) {
        $("#"+line+"_"+i).css("background-color","green").prop('disabled',true);
    }
}

function prepareLingo()
{
    var getFirstWord = correctAnswer.split("");
    for(var i =1; i< (numberOfLines +1); i++) {
        $("#"+i+"_1").val(getFirstWord[0]).css("background-color","green").prop('disabled',true);
        if(i > 1) {
            for (var x= 1; x < 6; x++) {
                $("#"+i+"_"+x).prop('disabled',true);
            }
        }
    }
}


