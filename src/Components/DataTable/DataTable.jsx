import { DataGrid } from "@mui/x-data-grid";
import PropTypes from "prop-types";
import { Button } from "@mui/material";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { VisuallyHiddenInput } from "../FormComponent/DynamicForm";

import IconButton from "@mui/material/IconButton";

const DataTable = ({
  rows,
  columns,
  handleEdit,
  handleDelete,
  handleActive,
  handleImageUpload,
  paginationModel,
  setPaginationModel,
  totalCount,
}) => {
  const actionColumn = {
    field: "actions",
    headerName: "Actions",
    width: 150,
    sortable: false,
    renderCell: (params) => (
      <div>
        {handleImageUpload ? (
          <IconButton
            onClick={() => handleImageUpload(params.row)}
            style={{ marginRight: 10 }}
          >
            <AddPhotoAlternateIcon sx={{ color: "gray" }} />
          </IconButton>
        ) : null}

        <IconButton
          onClick={() => handleEdit(params.row)}
          style={{ marginRight: 10 }}
        >
          <EditSharpIcon sx={{ color: "gray" }} />
        </IconButton>
        <IconButton size="small" onClick={() => handleDelete(params.row._id)}>
          <DeleteForeverSharpIcon sx={{ color: "red" }} />
        </IconButton>
      </div>
    ),
  };
  // const activeColumn = {
  //   field: "active",
  //   headerName: "Status",
  //   width: 150,
  //   sortable: false,
  //   renderCell: (params) => (
  //     <div>
  //       <Button variant="outlined" onClick={() => handleActive(params.row)}>
  //         {params.row.isActive === false ? "Activate" : "Deactivate"}
  //       </Button>
  //     </div>
  //   ),
  // };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="w-full relative">
        <DataGrid
          rows={rows}
          columns={[...columns,  actionColumn]}
          getRowId={(row) => row._id}
          className=""
          pagination
          rowCount={totalCount}
          pageSizeOptions={[10]}
          paginationMode={"server"}
          onPaginationModelChange={setPaginationModel}
          paginationModel={paginationModel}
        />
      </div>
    </div>
  );
};

DataTable.propTypes = {
  rows: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default DataTable;
