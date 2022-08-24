import React, { useEffect } from "react";
import ChevronRight from "@mui/icons-material/ArrowForwardIos";
import { FORMAT_DATE, ROWS_PER_PAGE } from "../../../app/constants";
import TableLayout from "../../../components/TableLayout";
import { DataGrid } from "@mui/x-data-grid";
import {
  selectAccountDetailsTab,
  selectCurrentAccount,
  selectCurrentAccountHistory,
  selectPage,
  selectRowsPerPage,
  selectTotalRows,
  setCurrentAccountHistory,
  setPage,
  setRowsPerPage,
  setTotalRows,
} from "../../Accounts/accountsSlice";
import { selectAgentId } from "../../authSlice";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../services";

const columns = [
  {
    field: "id",
    headerName: "№",
    width: 30,
    // align: "center",
    sortable: false,
  },
  {
    field: "dateCreated",
    headerName: "Дата",
    sortable: false,
    width: 130,
    valueGetter: (params) => FORMAT_DATE(params.value),
  },
  {
    field: "active",
    headerName: "Действие",
    sortable: false,
    width: 120,
  },
  {
    field: "user",
    headerName: "Име",
    sortable: false,
    width: 200,
    valueGetter: (params) => params.value.name,
  },

  {
    field: "chevron",
    headerName: "",
    sortable: false,
    width: 20,
    renderCell: () => <ChevronRight />,
  },
];
const TableAccountHistory = () => {
  const dispatch = useDispatch();

  const page = useSelector(selectPage);
  const agentId = useSelector(selectAgentId);
  const accountId = useSelector(selectCurrentAccount).id;
  const rowsPerPage = useSelector(selectRowsPerPage);

  const rows = useSelector(selectCurrentAccountHistory);
  const totalRows = useSelector(selectTotalRows);

  const tab = useSelector(selectAccountDetailsTab);

  useEffect(() => {
    // reset table on load
    dispatch(setPage(1));
    dispatch(setRowsPerPage(ROWS_PER_PAGE));
    dispatch(setTotalRows(0));
    dispatch(setCurrentAccountHistory([]));
  }, [tab]);

  useEffect(() => {
    API.getCommentsForAccount(agentId, accountId, page, rowsPerPage).then(
      ({ data }) => {
        const { total, result } = data;
        dispatch(setTotalRows(total));
        dispatch(setCurrentAccountHistory(result));
      }
    );
  }, [page, rowsPerPage]);

  return (
    <TableLayout>
      <DataGrid
        columns={columns}
        rows={rows}
        rowsPerPageOptions={[10]}
        rowHeight={55}
        paginationMode="server"
        rowCount={totalRows}
        page={page - 1}
        pageSize={rowsPerPage}
        onPageChange={(p) => dispatch(setPage(p + 1))}
        disableSelectionOnClick
        disableColumnMenu
      ></DataGrid>
    </TableLayout>
  );
};

export default TableAccountHistory;
