import {
  GoAFormItem,
  GoAContainer,
  GoAFlexRow,
  GoAInputNumber,
  GoATextArea,
  GoACheckbox,
  GoAInputText,
  GoARadioItem,
  GoARadioGroup,
  GoAButtonGroup,
  GoAButton,
  GoAFlexCol,
} from '@abgov/react-components';
import { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dateValidator, lengthValidator, numericValidator, requiredValidator, Validator } from '../common/validation';


export interface Info {
  startDate: string;
  endDate: string;
  monthCount: number;
  hourCount: number;
  description: string;
  jobType: string;
  currentlyEmployed: boolean;
}

export interface InfoActions {
  onSave: () => void;
}

type ActionType = "startDate" | "endDate" | "monthCount" | "hourCount" | "description" | "jobType" | "currentlyEmployed";
type Action = { type: ActionType, payload: Partial<Info>, checked?: boolean}

const JobTypes = ["Permanent", "Part-time", "Contract"];

export const InfoForm = (props: Info & InfoActions) => {

  const navigate = useNavigate();
  const initialState: Info = props;
  const [state, dispatch] = useReducer(reducer, initialState)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const _dateValidator = new Validator(requiredValidator(), dateValidator({}))
  const _jobTypeValidator = new Validator(requiredValidator())
  const _countValidator = new Validator(requiredValidator(), numericValidator({min: 0, max: 100}))
  const _descriptionValidator = new Validator(lengthValidator({max: 200}))

  function reducer(state: Info, action: Action): Info {
    switch (action.type) {
      case "startDate":
      case "endDate":
      case "jobType":
      case "description":
      case "currentlyEmployed":
        return {...state, ...action.payload}  
      case "monthCount":
        return {...state, monthCount: Number(action.payload.monthCount)}  
      case "hourCount":
        return {...state, hourCount: Number(action.payload.hourCount)}  
      default:
        return state
    }
  }
 
  function validate(): boolean {
    const errors: Record<string, string> = {}

    errors.startDate = _dateValidator.validate(state.startDate)
    errors.endDate = !state.currentlyEmployed && _dateValidator.validate(state.endDate) || "";
    errors.jobType = _jobTypeValidator.validate(state.jobType)
    errors.monthCount = _countValidator.validate(state.monthCount)
    errors.hourCount = _countValidator.validate(state.hourCount)
    errors.description = _descriptionValidator.validate(state.description)

    setErrors(errors);

    const hasErrors = 
      errors.startDate
      || errors.endDate
      || errors.jobType
      || errors.hourCount
      || errors.monthCount
      || errors.description;

    return !hasErrors;
  }

  function save() {
    const isValid = validate();
    if (isValid) {
      props.onSave()
    }
  }

  return (
    <GoAContainer headingSize="small" variant="primary">
      
      <GoAFlexRow gap="medium">
        <GoAFormItem label="Start date" error={errors.startDate}>
          <GoAInputText 
            width="100%" 
            name="startDate" 
            value={state.startDate} 
            trailingIcon="calendar"
            error={!!errors.startDate}
            onChange={(_, value) => 
              dispatch({type: "startDate", payload: {startDate: value}}) 
            } 
          />
        </GoAFormItem>

        <GoAFlexCol>
          <GoAFormItem label="End date" error={errors.endDate}>
            <GoAInputText 
              width="100%" 
              name="endDate" 
              value={state.endDate} 
              error={!!errors.endDate}
              trailingIcon="calendar"
              disabled={state.currentlyEmployed}
              onChange={(_, value) => 
                dispatch({type: "endDate", payload: {endDate: value}}) 
              } 
            />
          </GoAFormItem>
          <GoACheckbox 
            name="currently-employed" 
            checked={state.currentlyEmployed} 
            onChange={(_name, checked) => 
              dispatch({type: "currentlyEmployed", payload: {currentlyEmployed: checked}}) 
            }
          >
            Currently employed
          </GoACheckbox>
        </GoAFlexCol>
      </GoAFlexRow>

      <GoAFlexRow gap="medium">
        <GoAFormItem label="Number of months" error={errors.monthCount}>
          <GoAInputNumber
            width="100%" 
            name="months" 
            value={state.monthCount} 
            error={!!errors.monthCount}
            onChange={(_, value) => 
              dispatch({type: "monthCount", payload: { monthCount: Number(value) }}) 
            } 
          />    
        </GoAFormItem>

        <GoAFormItem label="Number of hours" error={errors.hourCount}>
          <GoAInputNumber 
            width="100%" 
            name="hours" 
            value={state.hourCount} 
            error={!!errors.hourCount}
            onChange={(_, value) => 
              dispatch({type: "hourCount", payload: {hourCount: Number(value)}}) 
            } 
          />    
        </GoAFormItem>
      </GoAFlexRow>

      <GoAFlexRow gap="medium">
        <GoAFormItem label="Description of work" optional={true} error={errors.description} helpText="Describe other unique tasks">
          <GoATextArea 
            width="100%" 
            name="tasks" 
            value={state.description} 
            error={!!errors.description}
            showCounter={true} 
            maxCharCount={200}
            onChange={(_, value) => 
              dispatch({ type: "description", payload: {"description": value} }) 
            } 
          />
        </GoAFormItem>
      </GoAFlexRow>

      <GoAFlexRow gap="medium">
        <GoAFormItem label="Job Type" error={errors.jobType}>
          <GoARadioGroup 
            name="jobtype"
            onChange={(_, value) => dispatch({ type: "jobType", payload: {"jobType": value} }) } 
            error={!!errors.jobType}
            >
            {JobTypes.map(jobType => 
              <GoARadioItem key={jobType} name="jobtype" value={jobType} />
            )}
          </GoARadioGroup>
        </GoAFormItem>
      </GoAFlexRow>

      <GoAButtonGroup alignment="start">
        <GoAButton type="secondary" onClick={() => navigate("/") }>Back</GoAButton>
        <GoAButton type="primary" onClick={save}>Save</GoAButton>
      </GoAButtonGroup>

    </GoAContainer>
  )
}

export default InfoForm;
