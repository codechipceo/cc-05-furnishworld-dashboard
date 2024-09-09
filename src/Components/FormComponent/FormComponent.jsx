import DynamicForm from "./DynamicForm";
import { Button } from "@mui/material";

const FormComponent = ({
  formPayload,
  formDefinition,
  onCancel,
  handleChange,
  children,
  ...props
}) => {
  return (
    <div>
      <DynamicForm
        formData={formPayload}
        formDefinition={formDefinition}
        handleChange={handleChange}
        {...props}
      />
      {children}
    </div>
  );
};

export default FormComponent;
