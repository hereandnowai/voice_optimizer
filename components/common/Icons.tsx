
import React from 'react';

export const BlogIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
  </svg>
);

export const LinkedInIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.55 1.55 0 0013 13.5v5.5H10v-9h2.9v1.36A3.09 3.09 0 0116.1 10c2.3 0 2.9 1.86 2.9 3.95z"></path>
  </svg>
);

export const InstagramIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.172.052 1.879.248 2.227.421.488.232.827.525 1.171.87.345.344.638.683.87 1.171.173.348.369.95.421 2.227.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.052 1.172-.248 1.879-.421 2.227a3.097 3.097 0 01-.87 1.171 3.097 3.097 0 01-1.171.87c-.348.173-.95.369-2.227.421-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.172-.052-1.879-.248-2.227-.421a3.097 3.097 0 01-1.171-.87 3.097 3.097 0 01-.87-1.171c-.173-.348-.369-.95-.421-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.052-1.172.248-1.879.421-2.227.232-.488.525-.827.87-1.171.344-.345.683-.638 1.171-.87.348-.173.95-.369 2.227-.421C8.416 2.175 8.796 2.163 12 2.163zm0 1.626c-3.115 0-3.483.01-4.712.066-1.076.049-1.581.222-1.84.331-.301.12-.524.283-.739.498a1.82 1.82 0 00-.498.739c-.11.26-.282.764-.331 1.84C4.838 8.517 4.828 8.885 4.828 12s.01 3.483.066 4.712c.049 1.076.222 1.581.331 1.84.12.301.283.524.498.739.215.215.438.378.739.498.26.11.764.282 1.84.331 1.23.056 1.597.066 4.712.066 3.115 0 3.483-.01 4.712-.066 1.076-.049 1.581-.222 1.84-.331.301-.12.524-.283.739-.498.215-.215.378-.438.498-.739.11-.26.282-.764.331-1.84.056-1.23.066-1.597.066-4.712s-.01-3.483-.066-4.712c-.049-1.076-.222-1.581-.331-1.84a1.82 1.82 0 00-.498-.739 1.82 1.82 0 00-.739-.498c-.26-.11-.764-.282-1.84-.331C15.483 3.799 15.115 3.789 12 3.789zm0 2.972a5.239 5.239 0 100 10.478 5.239 5.239 0 000-10.478zm0 1.626a3.613 3.613 0 110 7.226 3.613 3.613 0 010-7.226zM16.846 4.757a1.2 1.2 0 100 2.4 1.2 1.2 0 000-2.4z"></path>
  </svg>
);

export const GithubIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.602-3.369-1.34-3.369-1.34-.455-1.157-1.11-1.465-1.11-1.465-.909-.62.069-.608.069-.608 1.004.071 1.532 1.03 1.532 1.03.891 1.529 2.341 1.089 2.91.833.091-.647.349-1.086.635-1.336-2.22-.251-4.555-1.111-4.555-4.943 0-1.091.39-1.984 1.029-2.682-.103-.252-.446-1.27.098-2.645 0 0 .84-.269 2.75 1.025A9.547 9.547 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.375.201 2.393.1 2.645.64.698 1.028 1.591 1.028 2.682 0 3.842-2.338 4.688-4.566 4.935.359.307.678.917.678 1.849 0 1.334-.012 2.41-.012 2.736 0 .267.18.577.688.48C19.135 20.166 22 16.419 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd"></path>
  </svg>
);

export const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

export const YoutubeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className || "w-6 h-6"}>
    <path fillRule="evenodd" d="M19.802 5.343a3.693 3.693 0 00-2.612-2.612C15.54 2.25 12 2.25 12 2.25s-3.54 0-5.19.481A3.693 3.693 0 004.198 5.343C3.717 6.99 3.717 12 3.717 12s0 5.01.481 6.657a3.693 3.693 0 002.612 2.612c1.65.482 5.19.482 5.19.482s3.54 0 5.19-.482a3.693 3.693 0 002.612-2.612C20.283 17.01 20.283 12 20.283 12s0-5.01-.48-6.657zM9.75 15.562V8.438L15.031 12 9.75 15.562z" clipRule="evenodd"></path>
  </svg>
);

// General purpose icons
export const AnalyzeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l3.75-3.75m0 0L11.25 6l3.75 3.75M7.5 17.25l3.75-3.75M11.25 6l3.75 3.75m0 0l3.75 3.75M11.25 6v12" />
  </svg>
);

export const KeywordIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
  </svg>
);

export const OptimizeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.897.15c.542.09.94.56.94 1.11v1.093c0 .55-.398 1.02-.94 1.11l-.897.149c-.424.07-.764.383-.93.78-.164.398-.142.854.107 1.204l.527.738c.32.447.27.96-.12 1.45l-.773.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.78.93l-.15.897c-.09.542-.56.94-1.11.94h-1.093c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07-.424-.384-.764-.78-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-.96.27-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.11v-1.093c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773c.39-.389 1.002-.44 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.93l.15-.897z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

export const SimulateIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
  </svg>
);

export const BriefIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
);

export const DashboardIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 100 15 7.5 7.5 0 000-15z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 10.5V15m0 0H15m-4.5 0H6" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 1.063" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 10.5l-1.063.625" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 10.5l1.063.625" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.5l.625 1.063" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75V2.25" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.75V20.25" />
  </svg>
);

export const PrivacyIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
  </svg>
);

export const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

export const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export const ErrorIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6 text-red-500"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
  </svg>
);

export const SuccessIcon: React.FC<{ className?: string }> = ({ className }) => (
 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6 text-green-500"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

export const InfoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-6 h-6 text-blue-500"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
  </svg>
);

export const DownloadIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className || "w-5 h-5"}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const MicrophoneIcon: React.FC<{ className?: string; isRecording?: boolean }> = ({ className, isRecording }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`${className || "w-5 h-5"} ${isRecording ? 'text-red-500 animate-pulse' : ''}`}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15c-1.125 0-2.131-.38-2.924-.998M12 15c1.125 0 2.131-.38 2.924-.998M12 15v-4.875c0-.621.504-1.125 1.125-1.125h.25c.621 0 1.125.504 1.125 1.125V15m-4.125 0V10.125c0-.621.504-1.125 1.125-1.125h.25c.621 0 1.125.504 1.125 1.125V15m0 0v2.25m0 0c-2.43 0-4.72-.886-6.486-2.43m6.486 2.43c2.43 0 4.72-.886 6.486-2.43m-12.972 0c-1.544-1.544-2.43-3.756-2.43-6S3.954 5.33 5.498 3.886M20.113 12.56c1.544-1.544 2.43-3.756 2.43-6s-.886-4.456-2.43-6M12 3.75v.008v.008v.008v.008v.008z" />
  </svg>
);
