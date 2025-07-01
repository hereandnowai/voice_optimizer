
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
}

interface ISpeechRecognitionErrorEvent extends Event {
  readonly error: string; 
  readonly message: string;
}

interface ISpeechRecognition extends EventTarget {
  grammars: any; 
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;

  onaudiostart: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onsoundstart: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onsoundend: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onaudioend: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onresult: ((this: ISpeechRecognition, ev: ISpeechRecognitionEvent) => any) | null;
  onnomatch: ((this: ISpeechRecognition, ev: ISpeechRecognitionEvent) => any) | null;
  onerror: ((this: ISpeechRecognition, ev: ISpeechRecognitionErrorEvent) => any) | null;
  onstart: ((this: ISpeechRecognition, ev: Event) => any) | null;
  onend: ((this: ISpeechRecognition, ev: Event) => any) | null;

  start(): void;
  stop(): void;
  abort(): void;
}

type SpeechRecognitionConstructor = new () => ISpeechRecognition;

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, id, error, className = '', containerClassName = '', value, onChange, ...props }) => {
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const SpeechRecognitionAPI: SpeechRecognitionConstructor | undefined = 
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  useEffect(() => {
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
      recognitionRef.current.continuous = true; 
      recognitionRef.current.interimResults = true; 

      let finalTranscript = (value || '') as string;

      recognitionRef.current.onstart = () => {
        setIsRecording(true);
      };

      recognitionRef.current.onresult = (event: ISpeechRecognitionEvent) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const transcriptPart = event.results[i].item(0).transcript;
          if (event.results[i].isFinal) {
            finalTranscript = (finalTranscript ? finalTranscript.trim() + ' ' : '') + transcriptPart.trim();
          } else {
            interimTranscript += transcriptPart;
          }
        }
        
        const currentValForDisplay = (finalTranscript.trim() ? finalTranscript.trim() + ' ' : '') + interimTranscript.trim() + ' ';
        
        const mockEventForDisplay = {
            target: { value: currentValForDisplay, name: props.name, id: id },
            currentTarget: { value: currentValForDisplay, name: props.name, id: id },
            preventDefault: () => {},
            stopPropagation: () => {}
        } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
        
        if (onChange) {
            onChange(mockEventForDisplay);
        }
      };

      recognitionRef.current.onerror = (event: ISpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error, event.message);
        let errorMessage = `Speech recognition error: ${event.error}.`;
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            errorMessage += " Please ensure microphone permission is granted and the service is enabled."
        } else if (event.error === 'no-speech' && !finalTranscript.trim()) { 
            errorMessage += " No speech was detected."
        } else if (event.error === 'no-speech' && finalTranscript.trim()) {
            if (onChange) { 
                 const finalValueWithSpace = (finalTranscript.trim() ? finalTranscript.trim() + ' ' : '');
                 const mockEvent = {
                    target: { value: finalValueWithSpace, name: props.name, id: id },
                    currentTarget: { value: finalValueWithSpace, name: props.name, id: id },
                    preventDefault: () => {},
                    stopPropagation: () => {}
                 } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
                 onChange(mockEvent);
            }
            setIsRecording(false); 
            return; 
        }
        alert(errorMessage);
        setIsRecording(false); // Ensure UI updates on error
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
         if (onChange) { 
            const finalValueWithSpace = (finalTranscript.trim() ? finalTranscript.trim() + ' ' : '');
            const mockEvent = {
                target: { value: finalValueWithSpace, name: props.name, id: id },
                currentTarget: { value: finalValueWithSpace, name: props.name, id: id },
                preventDefault: () => {},
                stopPropagation: () => {}
            } as unknown as React.ChangeEvent<HTMLTextAreaElement>;
            onChange(mockEvent);
        }
      };
      
      try {
        finalTranscript = (value || '') as string; // Reset finalTranscript with current value before starting
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
      <div className="relative">
        <textarea
          id={id}
          rows={props.rows || 6}
          value={value}
          onChange={onChange}
          className={`w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-[#004040] focus:border-[#004040] sm:text-sm bg-white ${error ? 'border-red-500' : ''} ${SpeechRecognitionAPI ? 'pr-10' : ''} ${className}`}
          {...props}
        />
        {SpeechRecognitionAPI && (
          <button
            type="button"
            onClick={handleMicClick}
            className={`absolute right-2 top-2 p-1 flex items-center justify-center text-gray-500 hover:text-[#004040] focus:outline-none`}
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