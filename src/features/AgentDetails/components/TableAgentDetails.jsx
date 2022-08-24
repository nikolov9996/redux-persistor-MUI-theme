import { Grid } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FORMAT_DATE, ROUTES, ROWS_PER_PAGE } from "../../../app/constants";
import Statuses from "../../../components/Statuses";
import TableLayout from "../../../components/TableLayout";
import { selectAccountsForAgent } from "../../Agents/agentsSlice";
import ChevronRight from "@mui/icons-material/ArrowForwardIos";
import { setCurrentAccount } from "../../Accounts/accountsSlice";
import { useNavigate } from "react-router-dom";
import ActionMenu from "../../../components/ActionMenu";

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

const TableAgentDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rows = useSelector(selectAccountsForAgent);

  useEffect(() => {
    dispatch(setCurrentAccount(null));
  }, []);

  const handleRowClick = (accountId) => {
    dispatch(setCurrentAccount(rows.find((x) => x.id === accountId)));
    navigate(ROUTES.ACCOUNT_DETAILS(accountId));
  };

  return (
    <TableLayout>
      <DataGrid
        rows={rows}
        columns={columns}
        rowsPerPageOptions={[10]}
        pageSize={ROWS_PER_PAGE}
        rowHeight={55}
        disableSelectionOnClick
        disableColumnMenu
        onRowClick={(p) => {
          handleRowClick(p.id);
        }}
      />
    </TableLayout>
  );
};

export default TableAgentDetails;
