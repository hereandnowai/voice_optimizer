
import React from 'react';
import { Card } from '../../common/Card.tsx';
import { BRAND_CONFIG } from '../../../constants.ts';
import { PrivacyIcon } from '../../common/Icons.tsx';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <Card title="Privacy & AI Ethics" className="bg-white">
        <div className="prose max-w-none text-gray-700">
          <div className="flex items-center mb-6">
            <PrivacyIcon className="w-10 h-10 mr-3 text-[#004040]" />
            <h2 className="text-2xl font-semibold text-[#004040] m-0">Our Commitment to Your Privacy</h2>
          </div>

          <p>
            At {BRAND_CONFIG.brand.shortName}, we are committed to protecting your privacy and ensuring transparency in how we handle your data. This application is designed with your privacy in mind.
          </p>

          <h3 className="text-xl font-semibold text-[#004040] mt-6">Data Handling</h3>
          <ul>
            <li>
              <strong>Temporary Processing:</strong> The content (text or URLs) you provide for analysis is processed in real-time to generate insights and suggestions. We do not store this input data permanently on our servers after the analysis is complete and results are delivered to you.
            </li>
            <li>
              <strong>No Permanent Storage of User Content:</strong> Your textual content submitted for analysis, keyword generation, optimization, simulation, or brief generation is not saved or logged in a way that can be attributed to you beyond the current session's processing needs.
            </li>
            <li>
              <strong>API Key Security:</strong> Your Gemini API key is accessed via the environment variable <code>process.env.API_KEY</code> and is used directly for API calls. This application does not store or transmit your API key to our servers. It is your responsibility to secure this key in your environment.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#004040] mt-6">AI Model Usage</h3>
          <ul>
            <li>
              <strong>Third-Party AI Models:</strong> This application utilizes Google's Gemini API for its AI-powered features. Your interaction with these features involves sending data to Google's servers for processing according to their terms of service and privacy policies.
            </li>
            <li>
              <strong>No Training on Your Specific Data (by Us):</strong> We do not use the specific content you submit through this application to train or improve our own proprietary AI models. Any model training or improvement is managed by Google as per their policies for the Gemini API. We encourage you to review Google's AI principles and data usage policies.
            </li>
          </ul>

          <h3 className="text-xl font-semibold text-[#004040] mt-6">Transparency</h3>
          <p>
            We believe in being transparent about our data practices. The core functionality of this application relies on processing the content you provide to deliver voice search optimization insights. The AI models used are state-of-the-art and are designed to provide helpful and relevant suggestions.
          </p>

          <h3 className="text-xl font-semibold text-[#004040] mt-6">Your Responsibilities</h3>
          <ul>
            <li>
              Avoid submitting highly sensitive or confidential information through this tool if you have concerns about third-party API processing.
            </li>
            <li>
              Ensure that any content you submit complies with relevant laws and does not infringe on third-party rights.
            </li>
          </ul>
          
          <p className="mt-6">
            If you have any questions or concerns about our privacy practices, please contact us at <a href={`mailto:${BRAND_CONFIG.brand.email}`} className="text-[#004040] hover:text-[#FFDF00] underline">{BRAND_CONFIG.brand.email}</a>.
          </p>
        </div>
         <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <img src={BRAND_CONFIG.brand.chatbot.avatar} alt="Chatbot Avatar" className="w-16 h-16 rounded-full mx-auto mb-2 shadow-lg"/>
            <p className="text-sm text-gray-600">{BRAND_CONFIG.brand.shortName} - {BRAND_CONFIG.brand.slogan}.</p>
        </div>
      </Card>
    </div>
  );
};