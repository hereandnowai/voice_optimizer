
import React, { useState, useCallback } from 'react';
import { Input } from '../../common/Input.tsx';
import { Button } from '../../common/Button.tsx';
import { LoadingSpinner } from '../../common/LoadingSpinner.tsx';
import { Card } from '../../common/Card.tsx';
import { Alert } from '../../common/Alert.tsx';
import { generateKeywords } from '../../../services/geminiService.ts';
import { Keywords } from '../../../types.ts';
import { BRAND_CONFIG } from '../../../constants.ts';
import { downloadFile, getCurrentDateString, getTimestampFilenameSuffix } from '../../../utils.ts';
import { DownloadIcon } from '../../common/Icons.tsx';

export const KeywordGeneratorPage: React.FC = () => {
  const [niche, setNiche] = useState<string>('');
  const [keywords, setKeywords] = useState<Keywords | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async () => {
    if (!niche.trim()) {
      setError("Please enter a niche to generate keywords.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setKeywords(null);
    try {
      const generated = await generateKeywords(niche);
      if (generated) {
        setKeywords(generated);
      } else {
        setError("Failed to generate keywords. The AI might have returned an unexpected format.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while generating keywords. Please ensure your API key is correctly configured and try again.");
    } finally {
      setIsLoading(false);
    }
  }, [niche]);

  const handleDownloadResults = () => {
    if (!keywords) return;

    let fileContent = `Conversational Keyword Generation\n`;
    fileContent += `Date: ${getCurrentDateString()}\n`;
    fileContent += `Niche/Topic: ${niche}\n\n`;

    Object.entries(keywords).forEach(([intent, kws]) => {
      if (kws && kws.length > 0) {
        fileContent += `${intent.charAt(0).toUpperCase() + intent.slice(1)} Keywords:\n`;
        kws.forEach(kw => {
          fileContent += `- ${kw}\n`;
        });
        fileContent += `\n`;
      }
    });
    
    fileContent += `\nReport generated by ${BRAND_CONFIG.brand.shortName} - ${BRAND_CONFIG.brand.slogan}`;

    const filename = `keyword-analysis-${getTimestampFilenameSuffix()}.txt`;
    downloadFile(fileContent, filename);
  };

  return (
    <div className="space-y-8">
      <Card title="Conversational Keyword Generator" className="bg-white">
        <p className="mb-4 text-gray-600">
          Enter your niche. Our AI will suggest long-tail, natural-language keywords grouped by user intent. Keywords will be generated in English.
        </p>
        <Input
          label="Your Niche/Topic"
          id="niche-input"
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          placeholder="e.g., sustainable fashion, AI for small business"
          disabled={isLoading}
        />
        <Button onClick={handleSubmit} isLoading={isLoading} disabled={isLoading || !niche.trim()} className="mt-4 bg-[#FFDF00] text-[#004040] hover:bg-yellow-400">
          Generate Keywords
        </Button>
      </Card>

      {isLoading && <LoadingSpinner />}
      {error && <Alert type="error" message={error} className="my-4" />}
      
      {keywords && (
        <Card title="Generated Keywords" className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(keywords).map(([intent, kws]) => (
              kws && kws.length > 0 && (
                <div key={intent}>
                  <h4 className="font-semibold text-lg text-[#004040] capitalize mb-2">{intent}</h4>
                  <ul className="list-disc list-inside text-gray-700 space-y-1 bg-gray-50 p-3 rounded-md">
                    {kws.map((kw, index) => <li key={index}>{kw}</li>)}
                  </ul>
                </div>
              )
            ))}
          </div>
          <div className="mt-6 flex justify-end">
            <Button onClick={handleDownloadResults} variant="outline" className="text-[#004040] border-[#004040] hover:bg-gray-100">
              <DownloadIcon className="w-5 h-5 mr-2" />
              Download Keywords
            </Button>
          </div>
        </Card>
      )}
       <div className="mt-8 p-4 border-t border-gray-200 text-center">
            <img src={BRAND_CONFIG.brand.chatbot.avatar} alt="Chatbot Avatar" className="w-16 h-16 rounded-full mx-auto mb-2 shadow-lg"/>
            <p className="text-sm text-gray-600">Keywords powered by {BRAND_CONFIG.brand.shortName}. {BRAND_CONFIG.brand.slogan}.</p>
        </div>
    </div>
  );
};
