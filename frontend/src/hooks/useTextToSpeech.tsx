import { useEffect, useState } from 'react';

const useTextToSpeech = () => {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [defaultVoice, setDefaultVoice] =
        useState<SpeechSynthesisVoice | null>(null);
    const [isPlaying, setIsPlaying] = useState(false); // New state for tracking play status

    useEffect(() => {
        speechSynthesis.onvoiceschanged = () => {
            const newVoices = speechSynthesis.getVoices();
            setVoices(newVoices);
            const newDefaultVoice =
                newVoices.find((voice) => voice.name === 'Google US English') ||
                null;
            setDefaultVoice(newDefaultVoice);
        };

        return () => {
            speechSynthesis.onvoiceschanged = null;
        };
    }, []);

    const speakText = (text: string) => {
        if (isPlaying) {
            return;
        }

        setIsPlaying(true);

        speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        if (defaultVoice) {
            utterance.voice = defaultVoice;
            utterance.lang = defaultVoice.lang;
        }
        utterance.volume = 1;
        utterance.rate = 0.9;
        utterance.pitch = 1;

        utterance.onstart = () => {
            setIsPlaying(true);
        };
        utterance.onend = () => {
            setIsPlaying(false);
        };
        utterance.onerror = (err) => {
            setIsPlaying(false);
            console.error(err);
        };

        speechSynthesis.speak(utterance);
    };

    return { voices, isPlaying, speakText };
};

export default useTextToSpeech;
