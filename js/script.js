$(document).ready(function(){
    var database = firebase.database();
    var question = "";
    var answer = "";
    var qnaAarray = [];

    $('#clickButton').on('click', function(){
        
        var QnA = {
            question:$('#question').val(),
            answer:$('#answer').val()
        }
        database.ref('/QnA/cPlusPlus').push(QnA, function(error) {
        if (error)
            console.log('Error has occured during saving process')
        else
            console.log("Data hss been saved succesfully")
        })

    });

    database.ref('/QnA/cPlusPlus').on("child_added", function(snap){
        var question = snap.child('question').val();
        var answer = snap.child('answer').val();
        qnaAarray.push({
            'question':question,
            'answer':answer
        });
        console.log(qnaAarray);
    });
});