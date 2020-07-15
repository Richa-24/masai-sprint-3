
var speech=window.speechSynthesis;

var input_box=document.getElementById("input_box")
var voice_select=document.getElementById("voice_select")
var button=document.getElementById("button")

var voices=[]
getVoices()

button.addEventListener("click",handleSubmit)

function handleSubmit(){
   var toSpeak= new SpeechSynthesisUtterance(input_box.value)

   var selectedVoice=voice_select.selectedOptions[0].getAttribute("data-name")

   voices.forEach(function(voice){
       if(voice.name==selectedVoice){
           toSpeak.voice=voice
       }
   })

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

