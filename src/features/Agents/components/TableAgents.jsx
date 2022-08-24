import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import ChevronRight from "@mui/icons-material/ArrowForwardIos";
import TableLayout from "../../../components/TableLayout";
import { TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectAgents, setCurrentAgent } from "../agentsSlice";
import { setAgentId } from "../../authSlice";
import { useNavigate } from "react-router-dom";
import { FORMAT_DATE, ROUTES } from "../../../app/constants";
import Statuses from "../../../components/Statuses";

const columns = [
  {
    field: "id",
    headerName: "№",
    width: 30,
    sortable: false,
  },
  {
    field: "name",
    headerName: "Име на Агент",
    width: 130,
    editable: true,
  },
  {
    field: "accountsCount",
    headerName: "Акаунти",
    width: 150,
    editable: true,
  },
  {
    field: "companiesCount",
    headerName: "Фирми",
    width: 130,
    editable: true,
  },
  {
    field: "readDocuments",
    headerName: "Прочетени",
    width: 150,
    editable: true,
  },
  {
    field: "unreadDocument",
    headerName: "Непрочетени",
    width: 150,
    editable: true,
  },
  {
    field: "obligationSum",
    headerName: "Задължение",
    width: 150,
    editable: true,
  },
  {
    field: "dueDate",
    headerName: "Падеж",
    width: 150,
    editable: true,
    valueGetter: (params) => FORMAT_DATE(params.value),
  },
  {
    field: "active",
    headerName: "Статус",
    width: 150,
    editable: true,
    renderCell: (params) => {
      const { value, id } = params;
      // const onClick = (e) => {
      //   e.stopPropagation();
      // };
      const getStatusText = () => (value ? "Активен" : "Деактивиран");
      return <Statuses type={value} text={getStatusText()} />;
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

const TableAgents = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const rows = useSelector(selectAgents);

  const handleRowClick = (agentId) => {
    dispatch(setAgentId(agentId));
    dispatch(setCurrentAgent(rows.find(x=>x.id === agentId)))
    navigate(ROUTES.AGENT_DETAILS(agentId));
  };
  return (
    <TableLayout>
      <TextField size="small" placeholder="search" />
      <DataGrid
        onRowClick={(p) => {
          handleRowClick(p.id);
        }}
        pageSize={10}
        rowsPerPageOptions={[10]}
        columns={columns}
        rows={rows}
        paginationMode="client"
        disableSelectionOnClick
        disableColumnMenu
      />
    </TableLayout>
  );
};

export default TableAgents;
