import { Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

export const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const DynamicForm = ({
  formDefinition,
  formData,
  handleChange,
  grid,
  styleProps,
  gridTemplateColumns,
}) => {
  // Render form fields
  const renderFormFields = (formDefinition) => {
    return formDefinition.map((field, i) => {
      switch (field.type) {
        case "select":
          return (
            <Box key={field.name}>
              <FormControl margin="dense" fullWidth>
                <InputLabel color="secondary" id={field.label} size="small">
                  {field.label}
                </InputLabel>
                <Select
                  labelId={field.label}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  size="small"
                  color="secondary"
                  label={field.label}
                >
                  {field.options.map((option) => {
                    return (
                      <MenuItem key={option.value} value={option._id}>
                        {option[field.displayKey]}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          );
        case "file":
          return (
            <Box display={"flex"} mb={2} key={field.name}>
              <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                fullWidth
              >
                {field.label}
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleChange}
                  name={field.name}
                  multiple
                  accept={field.mimeType}
                />
              </Button>
            </Box>
          );
        default:
          return (
            <FormControl key={field.name} fullWidth mt={5}>
              <TextField
                label={field.label}
                color="secondary"
                margin="dense"
                name={field.name}
                size="small"
                rows={field.rows}
                multiline
                value={formData[field.name]}
                onChange={handleChange}
                sx={{ ...styleProps }}
              />
            </FormControl>
          );
      }
    });
  };

  if (grid) {
    return (
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: gridTemplateColumns,
          gap: 3,
          mt: 3,
        }}
      >
        {renderFormFields(formDefinition)}
      </Box>
    );
  }

  return renderFormFields(formDefinition);
};

export default DynamicForm;
