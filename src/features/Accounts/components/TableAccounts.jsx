import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { selectAccounts, setCurrentAccount } from "../accountsSlice";
import { FORMAT_DATE, ROUTES } from "../../../app/constants";
import Statuses from "../../../components/Statuses";
import { Grid } from "@mui/material";
import ActionMenu from "../../../components/ActionMenu";
import { useNavigate } from "react-router-dom";
import ChevronRight from "@mui/icons-material/ArrowForwardIos";
import TableLayout from "../../../components/TableLayout";

const columns = [
  {
    field: "id",
    headerName: "№",
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
      const { value, id } = params;
      const onClick = (e) => {
        e.stopPropagation();
      };

      const getText = () => (value ? "Спри достъп" : "Активирай");
      const getStatusText = () => (value ? "Активен" : "Деактивиран");
      return (
        <Grid
          onClick={(e) => onClick(e)}
          container
          justifyContent="space-between"
        >
          <Grid item>
            <Statuses type={value} text={getStatusText()} />
          </Grid>
          <Grid item>
            <ActionMenu accountId={id} access={value} text={getText()} />
          </Grid>
        </Grid>
      );
    },
  },
  {
    field: "chevron",
    headerName: "",
    sortable: false,
    width: 20,
    renderCell: () => <ChevronRight />,
  },
];

export default function TableAccounts() {
  const accounts = useSelector(selectAccounts);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRowClick = (accountId) => {
    dispatch(setCurrentAccount(accounts.find((x) => x.id === accountId)));
    navigate(ROUTES.ACCOUNT_DETAILS(accountId));
  };

  return (
    <TableLayout>
      <DataGrid
        rows={accounts}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        disableColumnMenu
        rowHeight={55}
       
        onRowClick={(p) => {
          handleRowClick(p.id);
        }}
        experimentalFeatures={{ newEditingApi: true }}
      />
    </TableLayout>
  );
}
