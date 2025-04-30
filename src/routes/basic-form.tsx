import {
  GoabCircularProgress,
  GoabBlock, GoabFormItem,
  GoabInput,
  GoabInputEmail, GoabInputTel,
  GoabTextArea,
  GoabRadioGroup,
  GoabRadioItem,
  GoabContainer, GoabButton, GoabCheckbox, GoabButtonGroup, GoabModal,
} from '@abgov/react-components';
import { useNavigate } from 'react-router-dom';
import { useReducer, useState } from 'react';
import { lengthValidator, requiredValidator, emailValidator, phoneNumberValidator, Validator } from '../common/validation';
import {GoabCheckboxOnChangeDetail, GoabInputOnChangeDetail} from "@abgov/ui-components-common";

export interface InfoState {
  text: string;
  email: string;
  phone: string;
  textarea: string;
  items: string[];
  moreInput: boolean;
}

export interface InfoPayload {
  text: string;
  email: string;
  phone: string;
  textarea: string;
  item: string;
  moreInput: boolean;
  checked: boolean;
}

type ActionType = "text" | "email" | "phone" | "textarea" | "items" | "moreInput" | "removeContainer";
type Action = { type: ActionType, payload: Partial<InfoPayload>, checked?: boolean }

const Items = ["Item 1", "Item 2", "Item 3"];

const EmailValidator = new Validator(requiredValidator(), emailValidator());
const PhoneValidator = new Validator(requiredValidator(), phoneNumberValidator());
const TextareaValidator = new Validator(requiredValidator(), lengthValidator({max: 200}));

function reducer(state: InfoState, action: Action): InfoState {
  switch(action.type) {
    case "items": {
      const newItem = action.payload.item;
      if (!newItem) {
        return {...state, ...action.payload}  
      }
      if (action.payload.checked) {
        return {...state, items: [newItem, ...state.items] }  
      }
      else {
        return {...state, items: state.items.filter(si => si !== newItem ) }  
      }
    }
    case "removeContainer": 
      return {...state, items: [], moreInput: false }  
    default:
      return {...state, ...action.payload}  
  }
}

export function BasicFormRoute() {

  const navigate = useNavigate();
  const [showSaveConfirmation, setShowSaveConfirmation] = useState<boolean>(false);
  const [showProgress, setShowProgress] = useState<boolean>(false);
  const [state, dispatch] = useReducer(reducer, {
    text: "",
    email: "",
    phone: "",
    textarea:  "",
    items: [],
    moreInput: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function showSaveConfirmationModal() {
    setShowSaveConfirmation(true);
  }

  function validate(): "valid" | "invalid" {
    const errors: Record<string, string> = {}
    errors.text = TextareaValidator.validate(state.text)
    errors.textarea = TextareaValidator.validate(state.textarea)
    errors.email = EmailValidator.validate(state.email)
    errors.phone = PhoneValidator.validate(state.phone)
    setErrors(errors);

    const hasErrors = 
      errors.text
      || errors.textarea
      || errors.email
      || errors.phone;
       
    return hasErrors ? "invalid" : "valid";
  }

  function save() {
    if (validate() === "invalid") {
      return;
    }

    setShowSaveConfirmation(false);
    setShowProgress(true);

    // first timeout simulates request latency
    setTimeout(() => {
      setShowProgress(false);

      // second time out is *required* to prevent the window scrollbar from being hidden
      // after redirect
      setTimeout(() => {
        navigate("/basic-form-success")
      }, 0);
    }, 2000)
  }

  return (
    <main>
      <h2>Submit your form</h2>
      <h3>
        Below is a basic form built from the component library for you to try out and use as a starting point for your service.
      </h3>

      <GoabCircularProgress visible={showProgress} variant="fullscreen" size="large" message="Processing your form..." />

      <GoabBlock>
        <GoabFormItem
          label="This is text input" 
          error={errors.text}
          requirement="required"
          helpText="You can add helper text to provide additional context to the user."
        >
          <GoabInput
            width="100%" 
            name="text" 
            value={state.text} 
            error={!!errors.text}
            onChange={(detail: GoabInputOnChangeDetail) =>
              dispatch({type: "text", payload: {text: detail.value}})
            } 
          />
        </GoabFormItem>
      </GoabBlock>

      <GoabBlock gap="m">
        <GoabFormItem label="Email input" error={errors.email}>
          <GoabInputEmail
            width="100%" 
            name="email" 
            value={state.email} 
            error={!!errors.email}
            onChange={(detail: GoabInputOnChangeDetail) =>
              dispatch({type: "email", payload: { email: detail.value}})
            } 
          />    
        </GoabFormItem>

        <GoabFormItem label="Phone number input" error={errors.phone}>
          <GoabInputTel
            width="100%" 
            name="phone" 
            value={state.phone} 
            error={!!errors.phone}
            onChange={(detail: GoabInputOnChangeDetail) =>
              dispatch({type: "phone", payload: {phone: detail.value}})
            } 
          />    
        </GoabFormItem>
      </GoabBlock>

      <GoabBlock gap="m">
        <GoabFormItem label="Text area" error={errors.textarea} helpText="The text area can count the number of characters a user inputs.">
          <GoabTextArea
            width="100%" 
            name="textarea" 
            value={state.textarea} 
            error={!!errors.textarea}
            countBy="character"
            maxCount={200}
            onChange={(detail: GoabInputOnChangeDetail) =>
              dispatch({ type: "textarea", payload: {"textarea": detail.value} })
            } 
          />
        </GoabFormItem>
      </GoabBlock>

      <GoabBlock gap="m">
        <GoabFormItem label="Do you want to show another type of input?">
          <GoabRadioGroup
            name="moreInput"
            value={state.moreInput ? "yes" : "no"}
            onChange={(detail: GoabInputOnChangeDetail) => dispatch({ type: "moreInput", payload: {"moreInput": detail.value === "yes"} }) }
          >
            <GoabRadioItem key="yes" name="moreInput" value="yes" label="Yes" />
            <GoabRadioItem key="no" name="moreInput" value="no" label="No" />
          </GoabRadioGroup>
        </GoabFormItem>
      </GoabBlock>

      {state.moreInput &&
        <GoabContainer
          type="interactive"
          title={
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
              <h3>This is an interactive container</h3>
              <GoabButton onClick={showSaveConfirmationModal} type="tertiary">Remove container</GoabButton>
            </div>
          }          
        >
          <p>
            You can use a container to group related content and tasks. An interactive container indicates that there is content within actionable, and is denoted by the teal colour band.
          </p>

          <GoabFormItem
            label="Do you want to show another type of input?"
            helpText="You can select multiple items on this list."
          >
            {Items.map(item => 
              <GoabCheckbox
                key={item}
                name="items"
                value={item}
                checked={state.items.includes(item)}
                onChange={(detail: GoabCheckboxOnChangeDetail) => {
                  dispatch({type: "items", payload: { item: detail.value, checked: detail.checked }})
                }}
                text={item}
              />
            )}
          </GoabFormItem>
        </GoabContainer>
      }

      <GoabButtonGroup alignment="start" mt="s" mb="3xl">
        <GoabButton type="secondary" onClick={() => navigate("/") }>Cancel form</GoabButton>
        <GoabButton type="primary" onClick={save}>Save and continue</GoabButton>
      </GoabButtonGroup>

      <GoabModal
        heading="Are you sure you want to remove this container?"
        open={showSaveConfirmation} 
        actions={
          <GoabButtonGroup alignment="end">
            <GoabButton type="secondary" onClick={() => setShowSaveConfirmation(false)}>Cancel</GoabButton>
            <GoabButton type="primary" variant="destructive" onClick={() => {
              setShowSaveConfirmation(false);
              dispatch({ type: "removeContainer", payload: {} });
            }}>Remove container</GoabButton>
          </GoabButtonGroup>
        }
      >
        This is a modal that confirms with the user before preforming a destructive action that they will not be able to undo.
      </GoabModal>
    </main>
  )
}
