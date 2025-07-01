
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout.tsx';
import { ContentAnalyzerPage } from './components/features/ContentAnalyzer/ContentAnalyzerPage.tsx';
import { KeywordGeneratorPage } from './components/features/KeywordGenerator/KeywordGeneratorPage.tsx';
import { SeoOptimizerPage } from './components/features/SeoOptimizer/SeoOptimizerPage.tsx';
import { CommandSimulatorPage } from './components/features/CommandSimulator/CommandSimulatorPage.tsx';
import { BriefGeneratorPage } from './components/features/BriefGenerator/BriefGeneratorPage.tsx';
import { DashboardPage } from './components/features/Dashboard/DashboardPage.tsx';
import { PrivacyPage } from './components/features/Privacy/PrivacyPage.tsx';
import { FeatureModule } from './constants.ts';

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to={`/${FeatureModule.ContentAnalyzer.toLowerCase().replace(/\s+/g, '-')}`} replace />} />
        <Route path={`/${FeatureModule.ContentAnalyzer.toLowerCase().replace(/\s+/g, '-')}`} element={<ContentAnalyzerPage />} />
        <Route path={`/${FeatureModule.KeywordGenerator.toLowerCase().replace(/\s+/g, '-')}`} element={<KeywordGeneratorPage />} />
        <Route path={`/${FeatureModule.SeoOptimizer.toLowerCase().replace(/\s+/g, '-')}`} element={<SeoOptimizerPage />} />
        <Route path={`/${FeatureModule.CommandSimulator.toLowerCase().replace(/\s+/g, '-')}`} element={<CommandSimulatorPage />} />
        <Route path={`/${FeatureModule.BriefGenerator.toLowerCase().replace(/\s+/g, '-')}`} element={<BriefGeneratorPage />} />
        <Route path={`/${FeatureModule.Dashboard.toLowerCase().replace(/\s+/g, '-')}`} element={<DashboardPage />} />
        <Route path={`/${FeatureModule.Privacy.toLowerCase().replace(/\s+/g, '-')}`} element={<PrivacyPage />} />
      </Routes>
    </Layout>
  );
};

export default App;