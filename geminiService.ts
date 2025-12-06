import { GoogleGenAI, Type, Schema } from "@google/genai";
import { Language, ValuationResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const valuationSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    currency: { type: Type.STRING },
    estimatedValue: { type: Type.NUMBER, description: "Estimated value in USD" },
    brandabilityScore: { type: Type.NUMBER, description: "Score from 0 to 100" },
    keywordScore: { type: Type.NUMBER, description: "Score from 0 to 100" },
    extensionScore: { type: Type.NUMBER, description: "Score from 0 to 100" },
    ageScore: { type: Type.NUMBER, description: "Score from 0 to 100 (Estimate based on likely age)" },
    comparableSales: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          domain: { type: Type.STRING },
          price: { type: Type.NUMBER },
          year: { type: Type.STRING },
        },
      },
    },
    summary: { type: Type.STRING, description: "A short summary of the valuation" },
    detailedAnalysis: {
      type: Type.OBJECT,
      properties: {
        brandability: { type: Type.STRING },
        keywords: { type: Type.STRING },
        extensions: { type: Type.STRING },
        age: { type: Type.STRING },
        marketTrends: { type: Type.STRING },
      },
    },
  },
  required: ["estimatedValue", "brandabilityScore", "keywordScore", "extensionScore", "ageScore", "comparableSales", "summary", "detailedAnalysis"],
};

export const evaluateDomain = async (domain: string, lang: Language): Promise<ValuationResponse> => {
  const modelId = "gemini-2.5-flash";
  
  const prompt = `
    Act as a professional domain name appraiser. 
    Analyze the value of the domain name: "${domain}".
    
    Consider the following factors:
    1. Brandability: Is it memorable, short, easy to spell?
    2. Keywords: Does it contain high-value, high-search-volume keywords?
    3. Extensions: Is the TLD (.com, .net, etc.) valuable? How saturated are other extensions?
    4. Market Trends: Current demand for this niche.
    5. Comparable Sales: Estimate based on similar domains sold in the past.
    
    Provide a realistic market value estimate in USD.
    
    IMPORTANT: Provide the "summary" and "detailedAnalysis" text in the following language: ${lang === Language.ARABIC ? "Arabic" : "English"}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: valuationSchema,
        temperature: 0.4, // Lower temperature for more consistent/logical pricing
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from Gemini");
    }

    return JSON.parse(text) as ValuationResponse;
  } catch (error) {
    console.error("Valuation error:", error);
    throw error;
  }
};