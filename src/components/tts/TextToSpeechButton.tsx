/** @format */

import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Volume2 } from "lucide-react";

interface TextToSpeechButtonProps {
  text: string;
  language?: "en" | "pt";
  className: string;
}

const TextToSpeechButton: React.FC<TextToSpeechButtonProps> = ({
  text,
  language,
  className,
}) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
    };

    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;

    // Initial call to populate the voices
    handleVoicesChanged();
  }, []);

  const getVoiceForLanguage = (lang: string) => {
    return voices.find((voice) => voice.lang.startsWith(lang));
  };

  const handleClick = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);

      // Select the appropriate voice based on the provided language
      const selectedVoice = getVoiceForLanguage(language ?? "pt");
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }

      window.speechSynthesis.speak(utterance);
    } else {
      console.log("Text-to-Speech is not supported in this browser.");
    }
  };

  return (
    <Button onClick={handleClick} className={className}>
      <Volume2 className="h-4 w-4" />
    </Button>
  );
};

export default TextToSpeechButton;
