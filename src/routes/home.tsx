import { GoABadge, GoAButton, GoAChip, GoAContainer, GoADivider, GoAFlexRow } from '@abgov/react-components'
import { Link, useNavigate } from 'react-router-dom'

export const HomeRoute = () => {

  const navigate = useNavigate()

  return (
    <main>
      <h1>Design system templates</h1>
      <h3>
        A showcase of the design system components, pages, and other resources for service teams.  
      </h3>

      <GoAContainer>
        <h3>Get started</h3>
        <p>
          This project is a showcase of the design system at the DDI. Every component used is available for use in your service from Storybook. The equivalent is available for designers within the template library in Figma.
        </p>

        <a target="_blank" href="https://ui-components-ui-components-dev.os99.gov.ab.ca/?path=/docs/overview--page">Read the get started guide for more information</a>
      </GoAContainer>

      <GoADivider spacing="medium" />

      <GoAFlexRow gap="medium">
        <section>
          <GoABadge type="success" content="New" />
          <h2 className="mt-1"><Link to="/basic-form">Basic form</Link></h2>
          <p>
            This page contains a basic form made up of a number of inputs, headings, and containers.
          </p>
        </section>

        <section>
          <GoABadge type="information" content="Coming soon" />
          <h2 className="mt-1">Complex tables</h2>
          <p>This page is a showcase of the card component to try out the live component with mock data within a service.</p>
        </section>
      </GoAFlexRow>

      <GoAFlexRow gap="medium">
        <section>
          <GoABadge type="information" content="Coming soon" />
          <h2 className="mt-1">Form stepper</h2>
          <p>This page is a showcase of the card component to try out the live component with mock data within a service.</p>
        </section>

        <section>
          <div className="space-4" />
          <h2 className="mt-1">
            <a target="_blank" href="https://github.com/GovAlta/ui-components/issues/new/choose">+ Suggest a template</a>
          </h2>
          <p>Let us know what template you want to see and we will add it here.</p>
        </section>
      </GoAFlexRow>

      <GoADivider spacing="large" />

      <GoAContainer type="non-interactive">
        <h2>Design system support</h2> 
        <a href="https://goa-dio.slack.com/archives/C02PLLT9HQ9">Get in touch with the design system team on Slack #design-system-support</a>
      </GoAContainer>

      <div className="space-5"></div>
    </main>
  )
}
