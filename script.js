var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

var colors = ['aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.lang = 'en-US';
recognition.continuous = true;
recognition.interimResults = true;
recognition.maxAlternatives = 1;

var transcribing = false;

function transcribe() {
    if (transcribing) {
        recognition.stop();
        document.getElementById("transcribe").innerHTML = "Click Here to Start Transcribing";
    }
    else {
        recognition.start();
        document.getElementById("transcribe").innerHTML = "Click Here to Stop Transcribing";
        document.getElementById("signInput").value = "Transcribing...";
        document.getElementById("englishInput").value = "Transcribing...";
    }
    transcribing = !transcribing;
}

recognition.onresult = function (event) {
    var transcript = event.results[0][0].transcript;
    document.getElementById("signInput").value = transcript;
    document.getElementById("englishInput").value = transcript;
}

recognition.errors = function () {
    console.log("an error has occured: " + event);
}