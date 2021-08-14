import { filter } from "lodash";
// import { sentenceCase } from "change-case";
import { useState, useEffect } from "react";

// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from "@material-ui/core";
// components
import Page from "components/Page";
import Label from "components/Label";
import Scrollbar from "components/Scrollbar";
import SearchNotFound from "components/SearchNotFound";

import fetchUsers from "@utils/api/getStudents";

import UserListHead from "./UserListHead";
import UserListToolbar from "./UserListToolbar";
import UserMoreMenu from "./UserMoreMenu";

// ----------------------------------------------------------------------

interface UserFetchedI {
  avatar: string;
  id: string;
  isAccountVerified: boolean;
  name: string;
  roleInTechnoNatura: string;
  startPeriod: number;
  username: string;
}

const TABLE_HEAD = [
  { id: "name", label: "Name", alignRight: false },
  { id: "username", label: "username", alignRight: false },
  { id: "isAccountVerified", label: "Verified", alignRight: false },

  { id: "roleInTechnoNatura", label: "Role", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

function descendingComparator(
  a: UserFetchedI,
  b: UserFetchedI,
  orderBy: string
) {
  // @ts-ignore
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  // @ts-ignore
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order: string, orderBy: string) {
  return order === "desc"
    ? (a: UserFetchedI, b: UserFetchedI) => descendingComparator(a, b, orderBy)
    : (a: UserFetchedI, b: UserFetchedI) =>
        -descendingComparator(a, b, orderBy);
}

function applySortFilter(
  array: Array<any>,

  // eslint-disable-next-line no-unused-vars
  comparator: (a: UserFetchedI, b: UserFetchedI) => number,
  query: string
) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {
  const [data, setData] = useState<{ users: UserFetchedI[] } | undefined>();
  // const { data } = useSWR(
  //   `${process.env.NEXT_PUBLIC_SERVER}/api/users`,
  //   fetcher
  // );
  // console.log("data", data);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState("asc");
  const [selected, setSelected] = useState<string[]>([]);
  const [orderBy, setOrderBy] = useState("name");
  const [filterName, setFilterName] = useState("");
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    fetchUsers(setData);
  }, []);

  const handleRequestSort = (event: any, property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      if (data) {
        const newSelecteds = data.users.map((n) => n.id);
        setSelected(newSelecteds);
      }
      return;
    }
    setSelected([]);
  };

  const handleClick = (event: any, name: string) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: string[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: any) => {
    setFilterName(event.target.value);
  };

  const emptyRows =
    page > 0
      ? Math.max(
          0,
          (1 + page) * rowsPerPage -
            // @ts-ignore
            data.users.length
        )
      : 0;

  const filteredUsers = applySortFilter(
    data && data.users ? data.users : [],
    // @ts-ignore
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredUsers.length === 0;

  if (data && !data.users) {
    return "Fetching users..";
  }
  // console.log(selected);
  return (
    // @ts-ignore
    <Page title="User | Minimal-UI">
      <Container>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb={5}
        >
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            selected={selected}
            filterName={filterName}
            onFilterName={handleFilterByName}
            fetchUsers={fetchUsers}
            setData={setData}
          />
        </Card>
        <Card>
          {/* @ts-ignore */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                {data && data.users && (
                  <UserListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={data.users.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                  />
                )}

                <TableBody>
                  {filteredUsers &&
                    filteredUsers &&
                    filteredUsers
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((row) => {
                        const {
                          id,
                          name,
                          username,
                          avatar,
                          isAccountVerified,
                          roleInTechnoNatura,
                        } = row;
                        const isItemSelected = selected.indexOf(id) !== -1;

                        return (
                          <TableRow
                            hover
                            key={id}
                            tabIndex={-1}
                            role="checkbox"
                            selected={isItemSelected}
                            aria-checked={isItemSelected}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                checked={isItemSelected}
                                onChange={(event) => handleClick(event, id)}
                              />
                            </TableCell>
                            <TableCell
                              component="th"
                              scope="row"
                              padding="none"
                            >
                              <Stack
                                direction="row"
                                alignItems="center"
                                spacing={2}
                              >
                                <Avatar alt={name} src={avatar} />
                                <Typography variant="subtitle2" noWrap>
                                  {name}
                                </Typography>
                              </Stack>
                            </TableCell>
                            <TableCell align="left">{username}</TableCell>
                            <TableCell align="left">
                              {isAccountVerified ? "Yes" : "No"}
                            </TableCell>

                            <TableCell align="left">
                              <Label
                                variant="ghost"
                                // color={
                                //   (status === "banned" && "error") || "success"
                                // }
                              >
                                {roleInTechnoNatura}
                              </Label>
                            </TableCell>

                            <TableCell align="right">
                              <UserMoreMenu />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          {data && data.users && (
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.users.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Card>
      </Container>
    </Page>
  );
}
