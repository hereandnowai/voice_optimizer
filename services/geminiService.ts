
import { GoogleGenAI, GenerateContentResponse as SDKGenerateContentResponse, Chat } from "@google/genai";
import { GEMINI_API_KEY } from '../constants.ts';
import { AnalysisResults, Keywords, OptimizationSuggestions, ContentBrief, SimulationResult, GenerateContentResponse, DashboardData } from '../types.ts';

if (!GEMINI_API_KEY) {
  console.error("API_KEY is not set in environment variables.");
  // Potentially throw an error or handle this state in the UI
}

const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY || "YOUR_API_KEY_HERE_IF_NOT_SET_IN_ENV" }); // Fallback only for dev, ensure env var in prod
const textModel = 'gemini-2.5-flash-preview-04-17';

const parseJsonFromText = <T,>(text: string): T | null => {
  let jsonStr = text.trim();
  
  // 1. Remove markdown fences
  const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
  const match = jsonStr.match(fenceRegex);
  if (match && match[2]) {
    jsonStr = match[2].trim();
  }

  // 2. Remove problematic invisible/control characters
  // This removes U+0000-U+0008, U+000B, U+000C, U+000E-U+001F (most control chars except tab, LF, CR)
  // and Unicode line/paragraph separators U+2028, U+2029.
  // Tab (U+0009), Line Feed (U+000A), and Carriage Return (U+000D) are preserved as they are valid JSON whitespace.
  jsonStr = jsonStr.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u2028\u2029]/g, '');

  // 3. Attempt to remove trailing commas before closing brackets/braces
  // e.g., [1, 2,] -> [1, 2] or {"a":1, "b":2,} -> {"a":1, "b":2}
  jsonStr = jsonStr.replace(/,\s*([\]}])/g, '$1');

  try {
    return JSON.parse(jsonStr) as T;
  } catch (e) {
    console.error("Failed to parse JSON response (after attempting to fix trailing commas and invisible characters):", e, "Attempted to parse:", jsonStr, "Original text from API:", text);
    return null;
  }
};


const mapSDKResponse = (sdkResponse: SDKGenerateContentResponse): GenerateContentResponse => {
    return {
        text: sdkResponse.text,
        candidates: sdkResponse.candidates?.map(candidate => ({
            groundingMetadata: candidate.groundingMetadata ? {
                groundingChunks: candidate.groundingMetadata.groundingChunks?.map(chunk => ({
                    web: chunk.web ? { uri: chunk.web.uri, title: chunk.web.title } : undefined
                }))
            } : undefined
        }))
    };
};


export const analyzeContent = async (content: string): Promise<AnalysisResults | null> => {
  const prompt = `
    Analyze the following text for voice search optimization. 
    Evaluate readability (e.g., Flesch-Kincaid score or general assessment like 'easy', 'moderate', 'difficult'), tone (e.g., conversational, formal), and structure (headings, paragraphs, lists).
    Identify specific complex words, long sentences (over 20 words), and instances of passive voice.
    Provide specific, actionable suggestions for simplified, conversational rewrites suitable for voice queries.
    Consider Google's voice search ranking factors like conciseness, direct answers, and natural language.
    Return your analysis in JSON format with the following keys: "readability" (string), "tone" (string), "structure" (string, general assessment), "issues" (array of strings, e.g., ["Complex word: 'utilize'", "Long sentence: '...'"]), "suggestions" (array of strings, e.g., ["Replace 'utilize' with 'use'.", "Break down long sentence '...' into two shorter ones."]).

    Input text:
    ---
    ${content}
    ---
  `;
  try {
    const response = await ai.models.generateContent({
      model: textModel,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    const mappedResponse = mapSDKResponse(response);
    return parseJsonFromText<AnalysisResults>(mappedResponse.text);
  } catch (error) {
    console.error("Error analyzing content:", error);
    throw error;
  }
};

export const generateKeywords = async (niche: string): Promise<Keywords | null> => {
  const prompt = `
    Generate long-tail, natural-language keywords in English for the niche: "${niche}".
    Mimic how real users would speak questions (e.g., "What’s the best laptop under 50K in India?").
    Group keywords by intent: informational, navigational, transactional.
    Provide up to 5 keywords for each intent.
    Return the result as a JSON object with keys: "informational" (array of strings), "navigational" (array of strings), "transactional" (array of strings). Do not use trailing commas in the JSON arrays or objects.

    Example for "gardening tools" niche (ensure valid JSON without trailing commas):
    {
      "informational": ["what are the best tools for starting a vegetable garden", "how to choose a durable garden spade"],
      "navigational": ["best place to buy Fiskars garden tools online", "local stores selling Gardena products"],
      "transactional": ["buy cheap garden hoe set", "discount on electric lawn mowers"]
    }
  `;
  try {
    const response = await ai.models.generateContent({
      model: textModel,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    const mappedResponse = mapSDKResponse(response);
    return parseJsonFromText<Keywords>(mappedResponse.text);
  } catch (error) {
    console.error("Error generating keywords:", error);
    throw error;
  }
};

export const optimizeSeoContent = async (content: string): Promise<OptimizationSuggestions | null> => {
  const prompt = `
    Audit the following content for voice SEO.
    1. Provide an "auditSummary" (string) of its current voice SEO friendliness.
    2. List specific "recommendations" (array of strings) to improve voice search ranking and featured snippet eligibility.
    3. If applicable, provide a "qnaFormattedContent" (string) by restructuring relevant paragraphs into a Q&A or FAQ format. If not applicable, this can be an empty string or omitted.
    4. Highlight key phrases or sentences suitable for voice snippets or voice-based answers as "snippetHighlights" (array of strings).
    Return the result as a JSON object with keys: "auditSummary", "recommendations", "qnaFormattedContent", "snippetHighlights". Ensure valid JSON without trailing commas.

    Input content:
    ---
    ${content}
    ---
  `;
  try {
    const response = await ai.models.generateContent({
      model: textModel,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    const mappedResponse = mapSDKResponse(response);
    return parseJsonFromText<OptimizationSuggestions>(mappedResponse.text);
  } catch (error) {
    console.error("Error optimizing SEO content:", error);
    throw error;
  }
};

export const simulateVoiceCommand = async (query: string, currentContent: string, optimizedContent: string): Promise<SimulationResult | null> => {
  const promptCurrent = `
    Given the voice query: "${query}", analyze how likely the following content is to rank well and provide a good voice answer. 
    Provide a brief analysis (2-3 sentences).
    Content:
    ---
    ${currentContent}
    ---
    Return ONLY the analysis text.
  `;
  const promptOptimized = `
    Given the voice query: "${query}", analyze how likely the following *optimized* content is to rank well and provide a good voice answer. 
    Provide a brief analysis (2-3 sentences).
    Content:
    ---
    ${optimizedContent}
    ---
    Return ONLY the analysis text.
  `;

  try {
    const [currentRes, optimizedRes] = await Promise.all([
      ai.models.generateContent({ model: textModel, contents: promptCurrent }),
      ai.models.generateContent({ model: textModel, contents: promptOptimized })
    ]);
    
    const mappedCurrentRes = mapSDKResponse(currentRes);
    const mappedOptimizedRes = mapSDKResponse(optimizedRes);

    return {
      query,
      currentContentAnalysis: mappedCurrentRes.text,
      optimizedContentAnalysis: mappedOptimizedRes.text
    };
  } catch (error) {
    console.error("Error simulating voice command:", error);
    throw error;
  }
};

export const generateContentBrief = async (topic: string): Promise<ContentBrief | null> => {
  const prompt = `
    Generate a voice-search optimized content outline for a new article/blog post about: "${topic}".
    Include:
    - "titleSuggestion": A compelling, voice-friendly H1 title.
    - "headings": An array of suggested H2 and H3 subheadings.
    - "keyQuestions": An array of key questions the content should answer (suitable for FAQ sections).
    - "keywordClusters": An array of related long-tail keywords or keyword clusters.
    - "schemaSuggestions": An array of relevant schema markup type suggestions (e.g., "FAQPage", "HowTo", "Article").
    Ensure alignment with Google Search and Google Assistant best practices for voice (clarity, conciseness, natural language).
    Return the result as a JSON object with the specified keys. Ensure valid JSON without trailing commas.

    Example structure (ensure valid JSON without trailing commas):
    {
      "titleSuggestion": "The Ultimate Guide to Indoor Plant Care for Beginners",
      "headings": ["Choosing Your First Indoor Plant", "Essential Indoor Plant Care Tips", "Common Indoor Plant Problems and Solutions"],
      "keyQuestions": ["What are the easiest indoor plants for beginners?", "How often should I water my indoor plants?", "Why are my indoor plant's leaves turning yellow?"],
      "keywordClusters": ["beginner friendly house plants", "low light indoor plants", "pet safe indoor plants", "best potting soil for houseplants"],
      "schemaSuggestions": ["HowTo", "FAQPage", "Article"]
    }
  `;
  try {
    const response = await ai.models.generateContent({
      model: textModel,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    const mappedResponse = mapSDKResponse(response);
    return parseJsonFromText<ContentBrief>(mappedResponse.text);
  } catch (error) {
    console.error("Error generating content brief:", error);
    throw error;
  }
};

export const generateDashboardMetrics = async (content: string): Promise<DashboardData | null> => {
  const prompt = `
    Analyze the following content and provide SEO & Voice Metrics.
    Based on the content, estimate the following values:
    1.  "optimizationPercentage": An integer (0-100) representing how well the content is generally optimized for voice search. Consider clarity, conciseness, natural language, structure for direct answers, and overall voice-friendliness.
    2.  "readabilityScore": An integer (0-100) estimating the content's readability (e.g., similar to Flesch-Kincaid, where higher is better/easier to read).
    3.  "snippetPotential": An integer (0-100) indicating the likelihood of this content, or parts of it, being suitable for a featured snippet or a direct voice assistant answer.
    4.  "keywordRankingScore": An integer (0-100) estimating the general voice search strength or potential of this content. This is not for specific keywords, but an overall assessment of its authority and relevance for the topics it implicitly covers, in the context of voice search.

    Return your analysis strictly as a JSON object with these four keys, each having an integer value between 0 and 100. Ensure valid JSON without trailing commas.

    Input content:
    ---
    ${content}
    ---
  `;
  try {
    const response = await ai.models.generateContent({
      model: textModel,
      contents: prompt,
      config: { responseMimeType: "application/json" }
    });
    const mappedResponse = mapSDKResponse(response);
    const parsedResult = parseJsonFromText<DashboardData>(mappedResponse.text);
    
    // Validate and clamp values to be within 0-100
    if (parsedResult) {
      const clamp = (num: number) => Math.min(Math.max(num, 0), 100);
      return {
        optimizationPercentage: clamp(parsedResult.optimizationPercentage || 0),
        readabilityScore: clamp(parsedResult.readabilityScore || 0),
        snippetPotential: clamp(parsedResult.snippetPotential || 0),
        keywordRankingScore: clamp(parsedResult.keywordRankingScore || 0),
      };
    }
    return null;
  } catch (error) {
    console.error("Error generating dashboard metrics:", error);
    throw error;
  }
};
