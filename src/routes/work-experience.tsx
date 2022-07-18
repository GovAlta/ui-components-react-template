import {
  GoAButton,
  GoAButtonGroup,
  GoAModal,
  GoACircularProgress,
} from '@abgov/react-components';
import { useState } from 'react';
import { InfoForm, Info } from '../components/info-form';

export function WorkExperienceRoute() {

  const [showSaveConfirmation, setShowSaveConfirmation] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<boolean>(false);

  const [info, setInfo] = useState<Info>(newInfo())

  function newInfo() {
    return { 
      startDate: new Date().toLocaleDateString(),
      endDate: "",
      hourCount: 0,
      description: "",
      monthCount: 0,
      currentlyEmployed: false,
      jobType: "",
    }
  }  

  function showSaveConfirmationModal() {
    setShowSaveConfirmation(true);
  }

  function save() {
    setShowSaveConfirmation(false);
    setShowProgress(true);
    setTimeout(() => {
      setShowProgress(false)
      setInfo(newInfo());
    }, 2000);
  }

  return (
    <main>
      <h2>Relevant Work Experience</h2>

      <GoACircularProgress visible={showProgress} variant="fullscreen" type="infinite" size="large" message="Saving..." />

      <InfoForm {...info} onSave={showSaveConfirmationModal} />

      <GoAModal 
        heading="Are you sure you want to save?"
        open={showSaveConfirmation} 
        actions={
          <GoAButtonGroup alignment="end">
            <GoAButton type="secondary" onClick={() => setShowSaveConfirmation(false)}>Cancel</GoAButton>
            <GoAButton type="primary" variant="danger" onClick={save}>Save</GoAButton>
          </GoAButtonGroup>
        }
      >
        You will not be able to undo this action.    
      </GoAModal>
    </main>
  )
}
