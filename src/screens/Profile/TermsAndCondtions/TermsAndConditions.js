import React from 'react';
import { useTranslation } from 'react-i18next';

import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import WebView from '../../../components/WebView/WebView';

const TermsAndConditions = () => {
  const { t: translation } = useTranslation('profileScreen');
  return (
    <PageContainer
      header={<PageHeader title={translation('termsConditions')} />}>
      <WebView uri="https://dps.usc.edu/safety-tips/suspicious-activity/robbery/#:~:text=After%20the%20robbery%2C%20go%20immediately,while%20you%20wait%20for%20help." />
    </PageContainer>
  );
};

export default TermsAndConditions;
