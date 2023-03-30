import { useState, useEffect } from "react";

let speech;
if (window.webkitSpeechRecognition || window.SpeechRecognition) {
  const SpeechRecognition = window.webkitSpeechRecognition;
  speech = new SpeechRecognition();
  speech.continuous = false;
  speech.interimResults = true;
  speech.lang = "en-US";
} else {
  speech = null;
}

const useVoice = () => {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const listen = () => {
    setIsListening(!isListening);
    if (isListening) {
      speech.stop();
    } else {
      speech.start();
    }
  };

  useEffect(() => {
    if (!speech) {
      return;
    }
    speech.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setText(transcript);
      setIsListening(false);
      speech.onerror = (event) => {
        console.log(event.error);
      };
    };
  }, []);

  return {
    text,
    isListening,
    listen,
    voiceSupported: speech !== null
  };
};

export { useVoice };
