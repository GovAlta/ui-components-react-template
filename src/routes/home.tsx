import { GoABadge, GoAContainer, GoAGrid, GoASpacer } from '@abgov/react-components'
import { Link } from 'react-router-dom'

export const HomeRoute = () => {

  return (
    <main>
      <h1>Design system templates</h1>
      <h3>
        A showcase of the design system components, pages, and other resources for service teams.  
      </h3>

      <GoAContainer title="Get Started">
        <p>
          This project is a showcase of the design system at the DDI. Every component used is available for use in your service from Storybook. The equivalent is available for designers within the template library in Figma.
        </p>

        <a target="_blank" href="https://ui-components.alberta.ca">Read the get started guide for more information</a>
      </GoAContainer>

      <GoAGrid gap="m" minChildWidth="400px">
        <GoAContainer>
          <GoABadge type="success" content="New" />
          <h2><Link to="/basic-form">Basic form</Link></h2>
          <p>
            This page contains a basic form made up of a number of inputs, headings, and containers.
          </p>
        </GoAContainer>

        <GoAContainer>
          <GoABadge type="information" content="Coming soon" />
          <h2>Complex tables</h2>
          <p>This page is a showcase of the card component to try out the live component with mock data within a service.</p>
        </GoAContainer>

        <GoAContainer>
          <GoABadge type="information" content="Coming soon" />
          <h2>Form stepper</h2>
          <p>This page is a showcase of the card component to try out the live component with mock data within a service.</p>
        </GoAContainer>

        <GoAContainer>
          <h2>
            <a target="_blank" href="https://github.com/GovAlta/ui-components/issues/new/choose">+ Suggest a template</a>
          </h2>
          <p>Let us know what template you want to see and we will add it here.</p>
        </GoAContainer>
      </GoAGrid>

      <GoAContainer 
        type="info"
        mb="m"
        title={<h2>Design system support</h2> }        
      >
        Get in touch with the design system team on Slack <a href="https://goa-dio.slack.com/archives/C02PLLT9HQ9">#design-system-support</a>
      </GoAContainer>
    </main>
  )
}
