predicition_1 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera = document.getElementById("camera");
Webcam.attach("#camera");

function capture_image() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_img' src='" + data_uri + "'>";
    });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/_ArEi9jD0/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model loaded");
}

function check() {
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult); 
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        predicition_1 = results[0].label;
        speak();
        if(predicition_1 == "Good") {
            document.getElementById("result_emoji").innerHTML = "&#128077;";
        }
        if(predicition_1 == "Amazing") {
            document.getElementById("result_emoji").innerHTML = "&#128076;";
        }
        if(predicition_1 == "Victory") {
            document.getElementById("result_emoji").innerHTML = "&#9996;";
        }

        function speak() {
            var synth = window.speechSynthesis;
            speak_data_1 = "the first prediction is " + predicition_1;
            var utterThis = new SpeechSynthesisUtterance(speak_data_1);
            synth.speak(utterThis);
        }