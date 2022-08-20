import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { selectAccounts } from "../accountsSlice";
import { FORMAT_DATE } from "../../../app/constants";
import Statuses from "../../../components/Statuses";
import AccessButton from "./AccessButton";
import { Grid } from "@mui/material";

const columns = [
  {
    field: "id",
    headerName: <span>&#8470;</span>,
    width: 30,
    // align: "center",
    sortable: false,
  },
  {
    field: "name",
    headerName: "Акакунт",
    width: 250,
    editable: true,
  },
  {
    field: "companiesCount",
    headerName: "Фирми",
    width: 100,
    editable: true,
  },
  {
    field: "readDocuments",
    headerName: "Прочетени",
    width: 100,
    editable: true,
  },
  {
    field: "unreadDocuments",
    headerName: "Непрочетени",
    sortable: false,
    width: 130,
  },
  {
    field: "obligationSum",
    headerName: "Задължение",
    sortable: false,
    width: 120,
    valueGetter: (params) => params.value + " BGN",
  },
  {
    field: "dueDate",
    headerName: "Падеж",
    sortable: false,
    width: 120,
    valueGetter: (params) => FORMAT_DATE(params.value),
  },
  {
    field: "active",
    headerName: "Статус",
    sortable: false,
    width: 250,
    renderCell: (params) => {
      const { value } = params;
      const getText = () => (value ? "Активирай" : "Спри достъп");
      const getStatusText = () => (value ? "Активен" : "Деактивиран");
      return (
        <Grid container justifyContent="space-between">
          <Grid item>
            <Statuses type={value} text={getStatusText()} />
          </Grid>
          <Grid item>
            <AccessButton
              onClick={() => updateStatus(value)}
              text={getText()}
            />
          </Grid>
        </Grid>
      );
    },
  },
];

async function updateStatus(current) {
  console.log("status will be updated to: " + !current);
}

export default function TableAccounts() {
  const accounts = useSelector(selectAccounts);

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={accounts}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        disableColumnMenu
        // loading={true}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
