
import { useNavigate } from 'react-router-dom';
import {GoabButton, GoabCallout} from "@abgov/react-components";

export function BasicFormSuccessRoute() {
  const navigate = useNavigate();
  return (
    <main>
      <GoabCallout type="success" mt="m">
        Thanks for trying out the product template
      </GoabCallout>

      <p>
        You can use this project as a starting point in your service. <a href="https://github.com/GovAlta/ui-components-react-template">Find the code in Github.</a>
      </p>
      <p>
        Go back to the home page to try out and see <a href="https://ui-components-ui-components-dev.os99.gov.ab.ca">more available components,</a> <a href="https://github.com/GovAlta/ui-components/issues">give feedback</a>, and <a href="https://www.npmjs.com/package/@abgov/react-components">start using the design system.</a>
      </p>

      <GoabButton type="primary" mt="l" mb="l" onClick={() => navigate("/")}>
        Back to more templates
      </GoabButton>
    </main>
  )
}
