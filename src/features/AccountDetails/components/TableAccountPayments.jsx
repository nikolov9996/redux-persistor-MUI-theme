import React, { useEffect } from "react";
import ChevronRight from "@mui/icons-material/ArrowForwardIos";
import { FORMAT_DATE, ROWS_PER_PAGE } from "../../../app/constants";
import TableLayout from "../../../components/TableLayout";
import { DataGrid } from "@mui/x-data-grid";
import { API } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import {
  selectAccountDetailsTab,
  selectCurrentAccount,
  selectCurrentAccountPayments,
  selectPage,
  selectRowsPerPage,
  selectTotalRows,
  setCurrentAccountPayments,
  setPage,
  setRowsPerPage,
  setTotalRows,
} from "../../Accounts/accountsSlice";
import { selectAgentId } from "../../authSlice";

const columns = [
  {
    field: "id",
    headerName: "№",
    width: 30,
    sortable: false,
  },
  {
    field: "companiesCount",
    headerName: "Фирми",
    width: 100,
    editable: true,
  },
  {
    field: "documentsCount",
    headerName: "Документи",
    width: 150,
    editable: true,
  },

  {
    field: "sum",
    headerName: "Задължение",
    sortable: false,
    width: 130,
    valueGetter: (params) => params.value?.toFixed(2) + " BGN",
  },

  {
    field: "dateCreated",
    headerName: "Плащане",
    sortable: false,
    width: 120,
    valueGetter: (params) => FORMAT_DATE(params.value),
  },

  {
    field: "chevron",
    headerName: "",
    sortable: false,
    width: 20,
    renderCell: () => <ChevronRight />,
  },
];

const TableAccountPayments = () => {
  const dispatch = useDispatch();
  const page = useSelector(selectPage);
  const agentId = useSelector(selectAgentId);
  const accountId = useSelector(selectCurrentAccount).id;
  const rowsPerPage = useSelector(selectRowsPerPage);

  const rows = useSelector(selectCurrentAccountPayments);
  const totalRows = useSelector(selectTotalRows);

  const tab = useSelector(selectAccountDetailsTab)

  useEffect(() => {
    // reset table on load or tab change
    dispatch(setPage(1));
    dispatch(setRowsPerPage(ROWS_PER_PAGE));
    dispatch(setTotalRows(0));
    dispatch(setCurrentAccountPayments([]));
  }, [tab]);

  useEffect(() => {
    API.getPaymentsForAccount(agentId, accountId, page, rowsPerPage).then(
      ({ data }) => {
        const { total, result } = data;
        dispatch(setTotalRows(total));
        dispatch(setCurrentAccountPayments(result));
      }
    );
    return;
  }, [page, rowsPerPage]);

  return (
    <TableLayout>
      <DataGrid
        rowsPerPageOptions={[10]}
        page={page - 1}
        pageSize={rowsPerPage}
        rows={rows}
        columns={columns}
        rowHeight={55}
        rowCount={totalRows}
        paginationMode="server"
        onPageChange={(p) => dispatch(setPage(p + 1))}
        disableSelectionOnClick
        disableColumnMenu
      />
    </TableLayout>
  );
};

export default TableAccountPayments;
