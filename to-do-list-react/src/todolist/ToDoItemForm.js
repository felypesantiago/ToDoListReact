import React, {useRef} from 'react';
import Form from '@rjsf/core';

const schema = {
    type: "object",
    required: [
      "title"
    ],
    properties: {
      title: {
        type: "string",
        title: "Title"
      },
      description: {
        type: "string",
        title: "Description"
      }
    }
}

function CustomFieldTemplate(props) {
    const {id, classNames, label, help, required, description, errors, children} = props;

    return props.displayLabel
      ? <div className="form-group row mb-2">
          <label htmlFor={id} className="col-md-2 col-form-label">
            {label}{required ? '*' : null}
          </label>
          <div className="col-md-8">
            {description}
            {children}
            {errors}
            {help}
          </div>
        </div>
      : <div className={classNames}>
          {children}
        </div>;
}

function onFormChange(form, submitButton) {
    if(form.current){
        submitButton.current.disabled = form.current.state.errors.length !== 0;
    }
}

const ToDoItemForm = ({formData, handleBack, handleSave}) => {
  const submitButton = useRef(null);
  const form = useRef(null);

  return <Form ref={form} 
               schema={schema} 
               FieldTemplate={CustomFieldTemplate} 
               formData={formData} 
               liveValidate={true} 
               showErrorList={false} 
               onChange={() => onFormChange(form, submitButton)}
               onSubmit={({formData}) => handleSave(formData)} >
        <button ref={submitButton} 
                type="submit"
                disabled
                className="btn btn-primary" 
                style={{width: '80px'}}>Save</button>
        <button type="button" 
                onClick={() => handleBack()} 
                className="btn btn-outline-secondary ml-3" 
                style={{width: '80px'}}>Cancel</button>
  </Form>;
}

export default ToDoItemForm;
