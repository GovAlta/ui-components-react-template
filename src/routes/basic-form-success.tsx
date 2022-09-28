import { GoAButton, GoACallout } from '@abgov/react-components';
import { useNavigate } from 'react-router-dom';

export function BasicFormSuccessRoute() {
  const navigate = useNavigate();
  return (
    <main>
      <div className="space-5" />

      <GoACallout type="success">
        Thanks for trying out the product template
      </GoACallout>

      <div className="space-2"></div>

      <h3>
        You can use this project as a starting point in your service. <a href="https://github.com/GovAlta/ui-components-react-template">Find the code in Github.</a>
      </h3>
      <h3>
        Go back to the home page to try out and see <a href="https://ui-components-ui-components-dev.os99.gov.ab.ca">more available components,</a> <a href="https://github.com/GovAlta/ui-components/issues">give feedback</a>, and <a href="https://www.npmjs.com/package/@abgov/react-components">start using the design system.</a>
      </h3>

      <div className="space-4"></div>

      <GoAButton type="primary" onClick={() => navigate("/")}>
        Back to more templates
      </GoAButton>
    </main>
  )
}
