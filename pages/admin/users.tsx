import { NextPage } from "next";
import { PeopleOutline } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/layouts/AdminLayout";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { Grid, MenuItem, Select } from "@mui/material";
import useSWR from "swr";
import { IUser } from "../../interfaces";
import { tesloApi } from "../../api";
import { FullScreenLoading, ErrorComponent } from "../../components/ui";

const UsersPage: NextPage = () => {
  const { data, error } = useSWR<IUser[]>("/api/admin/user");
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsers(data);
    }
  }, [data]);

  if (!data && !error) return <FullScreenLoading />;
  if (error) return <ErrorComponent />;

  const onRoleUpdate = async (userId: string, newRole: string) => {
    const prevUsers = users.map((u) => ({ ...u }));
    const updatedUsers = users.map((user) => ({
      ...user,
      role: user._id === userId ? newRole : user.role,
    }));

    setUsers(updatedUsers);

    try {
      await tesloApi.put("/admin/users", { userId, role: newRole });
    } catch (error) {
      setUsers(prevUsers);
      console.log(error);
      return alert("No se pudo actualizar el usuario");
    }
  };

  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 250 },
    { field: "name", headerName: "Nombre completo", width: 300 },
    {
      field: "role",
      headerName: "Tipo de usuario",
      width: 300,

      renderCell: ({ row }: GridValueGetterParams) => {
        return (
          <Select
            value={row.role}
            onChange={(e) => onRoleUpdate(row.id, e.target.value)}
            label='Tipo de usuario'
            sx={{ width: "100%", border: "none" }}>
            <MenuItem value='admin'>Administrador</MenuItem>
            <MenuItem value='client'>Cliente</MenuItem>
            <MenuItem value='super-user'>Super usuario</MenuItem>
            <MenuItem value='SEO'>SEO</MenuItem>
          </Select>
        );
      },
    },
  ];

  const rows = users.map((user) => ({
    id: user._id ?? "Not found",
    email: user.email ?? "Not found",
    name: user.name ?? "Not found",
    role: user.role ?? "Not found",
  }));

  return (
    <AdminLayout title={"Usuarios"} subtitle={"Mantenimiento de usuarios"} icon={<PeopleOutline />}>
      <Grid container className='fadeIn'>
        <Grid item xs={12} sx={{ height: 650, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />
        </Grid>
      </Grid>
    </AdminLayout>
  );
};

export default UsersPage;
