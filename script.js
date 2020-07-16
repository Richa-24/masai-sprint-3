
var speech=window.speechSynthesis;

var input_box=document.getElementById("input_box")
var voice_select=document.getElementById("voice_select")
var button=document.getElementById("button")
var rate=document.getElementById("rate")
var rate_value=document.getElementById("rate_value")
var pitch=document.getElementById("pitch")
var pitch_value=document.getElementById("pitch_value")
var body=document.querySelector("body")


var voices=[]
getVoices()

button.addEventListener("click",handleSubmit)

function handleSubmit(){
    
    if(input_box.value != 0){
        body.style.background="url(image/wave.gif)"
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';
    }
    

   var toSpeak= new SpeechSynthesisUtterance(input_box.value)

   toSpeak.onend=function(){
       body.style.background=""
   }

   var selectedVoice=voice_select.selectedOptions[0].getAttribute("data-name")

   voices.forEach(function(voice){
       if(voice.name==selectedVoice){
           toSpeak.voice=voice
       }
   })

    toSpeak.rate = rate.value;
    toSpeak.pitch = pitch.value;

    speech.speak(toSpeak)  

    
}

function getVoices(){
    voices= speech.getVoices()
    voice_select.innerHTML=""
    voices.forEach(function(voice){
        var listItem =document.createElement("option")
        listItem.textContent=voice.name
        listItem.setAttribute("data-lang",voice.lang)
        listItem.setAttribute("data-name",voice.name)


        voice_select.appendChild(listItem)
    })
    
    if(speechSynthesis!==undefined){
        speechSynthesis.onvoiceschanged= getVoices
    }
}

rate.addEventListener("change",function(){
    rate_value.textContent=rate.value
})

pitch.addEventListener("change",function(){
    pitch_value.textContent=pitch.value
})

