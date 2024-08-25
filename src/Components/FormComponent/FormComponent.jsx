import { Button } from "@mui/material";
import { DynamicForm } from "./DynamicForm";

export const FormComponent = ({
  status,
  formPayload,
  formDefinition,
  onCancel,
  handleChange,
  handleSubmit,
  children,
}) => {
  return (
    <div>
      <DynamicForm
        formData={formPayload}
        formDefinition={formDefinition}
        handleChange={handleChange}
      />
      {children}
      <div>
        <Button onClick={handleSubmit}>
          {status === "CREATE" ? "Create" : "Update"}
        </Button>
        <Button onClick={() => onCancel()}>Cancel</Button>
      </div>
    </div>
  );
};
