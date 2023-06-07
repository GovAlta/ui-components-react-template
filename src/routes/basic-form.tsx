import {
  GoAButton,
  GoAButtonGroup,
  GoAContainer,
  GoACheckbox,
  GoAFormItem,
  GoAInput,
  GoAInputEmail,
  GoAInputTel,
  GoATextArea,
  GoARadioGroup,
  GoARadioItem,
  GoAModal,
  GoACircularProgress,
  GoABlock,
} from '@abgov/react-components';
import { useNavigate } from 'react-router-dom';
import { useReducer, useState } from 'react';
import { lengthValidator, requiredValidator, emailValidator, phoneNumberValidator, Validator } from '../common/validation';

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

      <GoACircularProgress visible={showProgress} variant="fullscreen" size="large" message="Processing your form..." />

      <GoABlock>
        <GoAFormItem 
          label="This is text input" 
          error={errors.text}
          requirement="required"
          helpText="You can add helper text to provide additional context to the user."
        >
          <GoAInput
            width="100%" 
            name="text" 
            value={state.text} 
            error={!!errors.text}
            onChange={(_, value) => 
              dispatch({type: "text", payload: {text: value}}) 
            } 
          />
        </GoAFormItem>
      </GoABlock>

      <GoABlock gap="m">
        <GoAFormItem label="Email input" error={errors.email}>
          <GoAInputEmail
            width="100%" 
            name="email" 
            value={state.email} 
            error={!!errors.email}
            onChange={(_, value) => 
              dispatch({type: "email", payload: { email: value }}) 
            } 
          />    
        </GoAFormItem>

        <GoAFormItem label="Phone number input" error={errors.phone}>
          <GoAInputTel
            width="100%" 
            name="phone" 
            value={state.phone} 
            error={!!errors.phone}
            onChange={(_, value) => 
              dispatch({type: "phone", payload: {phone: value}}) 
            } 
          />    
        </GoAFormItem>
      </GoABlock>

      <GoABlock gap="m">
        <GoAFormItem label="Text area" error={errors.textarea} helpText="The text area can count the number of characters a user inputs.">
          <GoATextArea 
            width="100%" 
            name="textarea" 
            value={state.textarea} 
            error={!!errors.textarea}
            showCounter={true} 
            maxCharCount={200}
            onChange={(_, value) => 
              dispatch({ type: "textarea", payload: {"textarea": value} }) 
            } 
          />
        </GoAFormItem>
      </GoABlock>

      <GoABlock gap="m">
        <GoAFormItem label="Do you want to show another type of input?">
          <GoARadioGroup 
            name="moreInput"
            value={state.moreInput ? "yes" : "no"}
            onChange={(_, value) => dispatch({ type: "moreInput", payload: {"moreInput": value === "yes"} }) } 
          >
            <GoARadioItem key="yes" name="moreInput" value="yes" label="Yes" />
            <GoARadioItem key="no" name="moreInput" value="no" label="No" />
          </GoARadioGroup>
        </GoAFormItem>
      </GoABlock>

      {state.moreInput &&
        <GoAContainer 
          type="interactive"
          title={
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "baseline"}}>
              <h3>This is an interactive container</h3>
              <GoAButton onClick={showSaveConfirmationModal} type="tertiary">Remove container</GoAButton>
            </div>
          }          
        >
          <p>
            You can use a container to group related content and tasks. An interactive container indicates that there is content within actionable, and is denoted by the teal colour band.
          </p>

          <GoAFormItem 
            label="Do you want to show another type of input?"
            helpText="You can select multiple items on this list."
          >
            {Items.map(item => 
              <GoACheckbox 
                key={item}
                name="items"
                value={item}
                checked={state.items.includes(item)}
                onChange={(_, checked, value) => {
                  dispatch({type: "items", payload: { item: value, checked }})
                }}
                text={item}
              />
            )}
          </GoAFormItem>
        </GoAContainer>
      }

      <GoAButtonGroup alignment="start" mt="s" mb="3xl">
        <GoAButton type="secondary" onClick={() => navigate("/") }>Cancel form</GoAButton>
        <GoAButton type="primary" onClick={save}>Save and continue</GoAButton>
      </GoAButtonGroup>

      <GoAModal 
        heading="Are you sure you want to remove this container?"
        open={showSaveConfirmation} 
        actions={
          <GoAButtonGroup alignment="end">
            <GoAButton type="secondary" onClick={() => setShowSaveConfirmation(false)}>Cancel</GoAButton>
            <GoAButton type="primary" variant="destructive" onClick={() => {
              setShowSaveConfirmation(false);
              dispatch({ type: "removeContainer", payload: {} });
            }}>Remove container</GoAButton>
          </GoAButtonGroup>
        }
      >
        This is a modal that confirms with the user before preforming a destructive action that they will not be able to undo.
      </GoAModal>
    </main>
  )
}
