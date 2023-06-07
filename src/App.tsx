import {
  GoAAppHeader,
  GoAMicrositeHeader,
  GoAAppFooter,
  GoAPageBlock,
  GoAAppFooterMetaSection,
  GoAOneColumnLayout,
} from '@abgov/react-components';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <GoAOneColumnLayout>
      <section slot="header">
        <GoAMicrositeHeader
          type="beta"
          version="React 1.0"
          feedbackUrl="https://github.com/GovAlta/ui-components/issues/new/choose"
        />
        <GoAAppHeader
          url="/"
          heading="Design system templates"
          maxContentWidth="100%"
        />
      </section>

      <GoAPageBlock width="904px">
        <Outlet />
      </GoAPageBlock>

      <section slot="footer">
        <GoAAppFooter maxContentWidth="100%">
          <GoAAppFooterMetaSection>
            <a href="https://goa-dio.slack.com/archives/C02PLLT9HQ9">
              Get help
            </a>
            <a href="https://goa-dio.atlassian.net/wiki/spaces/DS/pages/2342813697/Design+System+Drop-in+hours">
              Drop-in Hours
            </a>
            <a href="https://github.com/GovAlta/ui-components/issues/new/choose">
              Contribute
            </a>
          </GoAAppFooterMetaSection>
        </GoAAppFooter>
      </section>
    </GoAOneColumnLayout>
  );
}

export default App;
