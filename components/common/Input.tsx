
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { MicrophoneIcon } from './Icons.tsx';

// Define interfaces for Web Speech API
interface ISpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface ISpeechRecognitionResult {
  isFinal: boolean;
  readonly length: number;
  item(index: number): ISpeechRecognitionAlternative;
  [index: number]: ISpeechRecognitionAlternative;
}

interface ISpeechRecognitionResultList {
  readonly length: number;
  item(index: number): ISpeechRecognitionResult;
  [index: number]: ISpeechRecognitionResult;
}

interface ISpeechRecognitionEvent extends Event {
  readonly resultIndex: number;
  readonly results: ISpeechRecognitionResultList;
  // readonly interpretation: any; // Non-standard, but sometimes present
  // readonly emma: Document | null; // For EMMA (Extensible MultiModal Annotation markup)
}

interface ISpeechRecognitionErrorEvent extends Event {
  readonly error: string; // Should be SpeechRecognitionErrorCode but string is fine for simplicity
  readonly message: string;
}

interface ISpeechRecognition extends EventTarget {
  grammars: any; // SpeechGrammarList, but 'any' for simplicity if not used
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  // serviceURI: string; // Deprecated

  onaudiostart: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onsoundend: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onaudioend: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: ISpeechRecognition, ev: ISpeechRecognitionEvent) => any) | null;
  onnomatch: ((this: ISpeechRecognition, ev: ISpeechRecognitionEvent) => any) | null; // Typically SpeechRecognitionEvent
  onerror: ((this: ISpeechRecognition, ev: ISpeechRecognitionErrorEvent) => any) | null;
  onstart: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => any) | null;

  start(): void;
  stop(): void;
  abort(): void;
}

type SpeechRecognitionConstructor = new () => ISpeechRecognition;

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, error, className = '', containerClassName = '', value, onChange, ...props }) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const SpeechRecognitionAPI: SpeechRecognitionConstructor | undefined = 
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;


  useEffect(() => {
    // Cleanup recognition instance on component unmount
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current.onresult = null;
        recognitionRef.current.onerror = null;
        recognitionRef.current.onend = null;
        recognitionRef.current = null;
      }
    };
  }, []);

  const handleMicClick = useCallback(() => {
    if (!SpeechRecognitionAPI) {
      alert("Speech recognition is not supported by your browser. Please try Chrome or Edge.");
      return;
    }

    if (isRecording) {
      recognitionRef.current?.stop();
      // setIsRecording(false); // onend will handle this
    } else {
      recognitionRef.current = new SpeechRecognitionAPI();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false; // Get final results only for simplicity

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };

      recognitionRef.current.onresult = (event: ISpeechRecognitionEvent) => {
        let spokenText = "";
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            spokenText += event.results[i].item(0).transcript;
          }
        }
        
        spokenText = spokenText.trim();

        if (spokenText && onChange) {
          const currentVal = (value || '') as string;
          const newValue = (currentVal ? currentVal + ' ' : '') + spokenText + ' ';

          const mockEvent = {
            target: { value: newValue, name: props.name, id: id },
            currentTarget: { value: newValue, name: props.name, id: id },
            preventDefault: () => {},
            stopPropagation: () => {}
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          onChange(mockEvent);
        }
      };

      recognitionRef.current.onerror = (event: ISpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        let errorMessage = `Speech recognition error: ${event.error}.`;
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            errorMessage += " Please ensure microphone permission is granted and the service is enabled."
        } else if (event.error === 'no-speech') {
            errorMessage += " No speech was detected."
        }
        alert(errorMessage);
        setIsRecording(false); // Ensure UI updates on error
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };

      try {
        recognitionRef.current.start();
      } catch (e: any) {
        console.error("Error starting speech recognition:", e);
        alert(`Could not start speech recognition: ${e.message}. Please check permissions and browser support.`);
        setIsRecording(false);
      }
    }
  }, [isRecording, SpeechRecognitionAPI, onChange, value, props.name, id]);

  return (
    <div className={`mb-4 ${containerClassName}`}>
      {label && <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
      <div className="relative flex items-center">
        <input
          id={id}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white ${error ? 'border-red-500' : ''} ${SpeechRecognitionAPI ? 'pr-10' : ''} ${className}`}
          {...props}
        />
        {SpeechRecognitionAPI && (
          <button
            type="button"
            onClick={handleMicClick}
            className={`absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500 hover:text-[#004040] focus:outline-none`}
            aria-label={isRecording ? 'Stop recording' : 'Start recording by voice'}
            title={isRecording ? 'Stop recording' : 'Start recording by voice'}
          >
            <MicrophoneIcon className="w-5 h-5" isRecording={isRecording} />
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
};