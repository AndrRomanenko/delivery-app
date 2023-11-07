import React from 'react';
import { useTranslation } from 'react-i18next';

import PageContainer from '../../../components/PageContainer';
import PageHeader from '../../../components/PageHeader';
import WebView from '../../../components/WebView/WebView';

const Support = () => {
  const { t: translation } = useTranslation('profileScreen');
  return (
    <PageContainer header={<PageHeader title={translation('support')} />}>
      <WebView uri="https://www.iwillteachyoutoberich.com/blog/how-do-you-deal-with-unsupportive-family-members/" />
    </PageContainer>
  );
};

export default Support;
