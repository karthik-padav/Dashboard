$(document).ready(function(){
    var database = firebase.database();
    var question = "";
    var answer = "";
    var qnaAarray = [];
    $('#html-L').show();

    database.ref('/QnA/html').on("child_added", function(snap){
        var question = snap.child('question').val();
        var answer = snap.child('answer').val();
        var id = snap.child('id').val();
        qnaAarray.push({
            'question':question,
            'answer':answer,
            'id' :id
        });
        $('#html-L').hide();
        console.log(qnaAarray);
    });

    $('#clickButton').on('click', function(){
        var totalQnA = qnaAarray.length;
        if(totalQnA == 0){
            var id = 1;
        } else {
            var id = qnaAarray[totalQnA - 1].id + 1;
        }
        var QnA = {
            question:$('#question').val(),
            answer:$('#answer').val(),
            id: id
        }
        database.ref('/QnA/html').push(QnA, function(error) {
        if (error)
            console.log('Error has occured during saving process')
        else
            console.log("Data hss been saved succesfully")
            console.log(QnA);
            $('#html-L').hide();
        })

    });


    // File uploader
    var uploader = document.getElementById('uploader');
    var fileButton = document.getElementById('fileButton');

        console.log(fileButton);
    fileButton.addEventListener('change', function(e){
        // Get file
        var file = e.target.files[0];

        //Create a storage ref
        var storageRef = firebase.storage().ref('images/' + file.name);

        // Upload file
        var task = storageRef.put(file);

        // Update progress bar
        task.on('state_changed', function progress(snapshot){
            var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log(percentage);
            uploader.value = percentage;
        },
        
        function error(err) {
            alert('error');
        },

        function complete(){
            alert('uploaded');
        }
        )

    })

});