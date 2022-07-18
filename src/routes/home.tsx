import { GoABadge, GoAButton, GoAContainer, GoADivider, GoAFlexRow } from '@abgov/react-components'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const HomeRoute = () => {

  const navigate = useNavigate()

  return (
    <main>
      <h1>Design system resources</h1>
      <p>
        A showcase of the design system components, pages, and other resources for service teams.  
      </p>

      <GoAContainer headingSize="none" colored={true}>
        <p>
          This project is a showcase of the design system at the DDI. Every component used is available for use in your service from Storybook. The equivalent is available for designers within the template library in Figma.
        </p>

        <a href="#">Read the get started guide for more information</a>
      </GoAContainer>

      <GoADivider spacing="medium" />


      <GoAFlexRow gap="medium">
        <div>
          <h2>Forms</h2>
          <p>This page is a showcase of the container component and a basic form.</p>
          <GoAButton type="secondary" onClick={() => navigate("/work-experience")}>Start</GoAButton>
        </div>

        <div>
          <h2>Complex tables <GoABadge type="information" content="Coming soon" /></h2>
          <p>This page is a showcase of the card component to try out the live component with mock data within a service.</p>
        </div>
      </GoAFlexRow>

      <GoAFlexRow gap="medium">
        <div>
          <h2>Containers <GoABadge type="information" content="Coming soon" /></h2>
          <p>This page is a showcase of the card component to try out the live component with mock data within a service.</p>
        </div>

        <div>
          <h2>Steppers <GoABadge type="information" content="Coming soon" /></h2>
          <p>This page is a showcase of the card component to try out the live component with mock data within a service.</p>
        </div>
      </GoAFlexRow>
    </main>
  )
}
