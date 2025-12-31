import { useEffect, useMemo, useState } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Plus, Trash2, Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Departments() {
  const { toast } = useToast();
  const [departments, setDepartments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
  });

  const supabaseBaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const departmentsUrl =
    import.meta.env.VITE_SUPABASE_EDGE_DEPARTMENTS_URL ||
    (supabaseBaseUrl
      ? `${supabaseBaseUrl}/functions/v1/departments`
      : "https://ruewgiljaznyllyqmrep.supabase.co/functions/v1/departments");
  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  const filteredDepartments = useMemo(() => {
    if (!searchQuery) return departments;
    const query = searchQuery.toLowerCase();
    return departments.filter((department) =>
      String(department.name || "").toLowerCase().includes(query)
    );
  }, [departments, searchQuery]);

  const getAuthHeaders = async () => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      throw sessionError;
    }
    const accessToken = sessionData?.session?.access_token;
    if (!accessToken) {
      throw new Error("Missing access token. Please sign in again.");
    }
    return {
      Authorization: `Bearer ${accessToken}`,
      apikey: anonKey,
      "Content-Type": "application/json",
    };
  };

  const normalizeDepartments = (data) => {
    const list = Array.isArray(data?.departments)
      ? data.departments
      : Array.isArray(data)
        ? data
        : [];
    return list.map((item) => ({
      id:
        item?.id ??
        item?.department_id ??
        item?.name ??
        globalThis.crypto?.randomUUID?.() ??
        String(Date.now()),
      name: item?.name ?? String(item),
      description: item?.description ?? "",
      status: item?.status ?? "Active",
    }));
  };

  const fetchDepartments = async () => {
    setIsLoading(true);
    setError("");
    try {
      if (!departmentsUrl || !anonKey) {
        throw new Error("Missing departments edge function configuration.");
      }
      const headers = await getAuthHeaders();
      const response = await fetch(departmentsUrl, { method: "GET", headers });
      const data = await response.json();
      if (!response.ok || data?.success === false) {
        throw new Error(data?.error || data?.message || "Unable to load departments.");
      }
      setDepartments(normalizeDepartments(data));
    } catch (error) {
      setError(error?.message || "Unable to load departments.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDepartments();
  }, []);

  const openCreateDialog = () => {
    setFormValues({ name: "", description: "" });
    setIsCreateOpen(true);
  };

  const openEditDialog = (department) => {
    setSelectedDepartment(department);
    setFormValues({
      name: department?.name || "",
      description: department?.description || "",
    });
    setIsEditOpen(true);
  };

  const openDeleteDialog = (department) => {
    setSelectedDepartment(department);
    setIsDeleteOpen(true);
  };

  const handleCreate = async () => {
    if (!formValues.name.trim()) {
      toast({
        title: "Missing name",
        description: "Please enter a department name.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const headers = await getAuthHeaders();
      const payload = {
        name: formValues.name.trim(),
        description: formValues.description.trim() || null,
      };
      const response = await fetch(departmentsUrl, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || data?.success === false) {
        throw new Error(data?.error || data?.message || "Unable to create department.");
      }
      const created = normalizeDepartments(data)[0] || {
        id: globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
        name: payload.name,
        description: payload.description || "",
        status: "Active",
      };
      setDepartments((prev) => [created, ...prev]);
      toast({ title: "Department created", description: created.name });
      setIsCreateOpen(false);
    } catch (error) {
      toast({
        title: "Create failed",
        description: error?.message || "Unable to create department.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedDepartment) return;
    if (!formValues.name.trim()) {
      toast({
        title: "Missing name",
        description: "Please enter a department name.",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const headers = await getAuthHeaders();
      const payload = {
        id: selectedDepartment.id,
        name: formValues.name.trim(),
        description: formValues.description.trim() || null,
      };
      const response = await fetch(departmentsUrl, {
        method: "PATCH",
        headers,
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok || data?.success === false) {
        throw new Error(data?.error || data?.message || "Unable to update department.");
      }
      setDepartments((prev) =>
        prev.map((item) =>
          item.id === selectedDepartment.id
            ? { ...item, name: payload.name, description: payload.description || "" }
            : item
        )
      );
      toast({ title: "Department updated", description: payload.name });
      setIsEditOpen(false);
    } catch (error) {
      toast({
        title: "Update failed",
        description: error?.message || "Unable to update department.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedDepartment) return;
    setIsSubmitting(true);
    try {
      const headers = await getAuthHeaders();
      const response = await fetch(departmentsUrl, {
        method: "DELETE",
        headers,
        body: JSON.stringify({ id: selectedDepartment.id }),
      });
      const data = await response.json();
      if (!response.ok || data?.success === false) {
        throw new Error(data?.error || data?.message || "Unable to delete department.");
      }
      setDepartments((prev) =>
        prev.filter((item) => item.id !== selectedDepartment.id)
      );
      toast({ title: "Department deleted", description: selectedDepartment.name });
      setIsDeleteOpen(false);
    } catch (error) {
      toast({
        title: "Delete failed",
        description: error?.message || "Unable to delete department.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">Departments</h1>
            <p className="text-muted-foreground mt-1">Create, edit, and manage departments</p>
          </div>
          <Button className="gap-2" onClick={openCreateDialog}>
            <Plus className="h-4 w-4" />
            New Department
          </Button>
        </div>

        <Card className="border-border/50">
          <CardHeader className="pb-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <CardTitle className="text-lg">All Departments</CardTitle>
                <CardDescription>Manage department assignments across the system</CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Input
                  placeholder="Search departments..."
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  className="bg-background"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {error ? (
              <div className="mb-4 rounded-lg border border-destructive/20 bg-destructive/5 p-3 text-sm text-destructive">
                {error}
              </div>
            ) : null}
            {isLoading ? (
              <div className="py-8 text-center text-sm text-muted-foreground">
                Loading departments...
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border/50">
                      <TableHead className="text-foreground font-semibold">Department</TableHead>
                      <TableHead className="text-foreground font-semibold">Description</TableHead>
                      <TableHead className="text-foreground font-semibold">Status</TableHead>
                      <TableHead className="text-foreground font-semibold text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDepartments.map((department) => (
                      <TableRow key={department.id} className="border-border/30">
                        <TableCell className="font-medium text-foreground">
                          {department.name}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {department.description || "—"}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {department.status || "Active"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="gap-2"
                                onClick={() => openEditDialog(department)}
                              >
                                <Edit className="h-4 w-4" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2 text-destructive"
                                onClick={() => openDeleteDialog(department)}
                              >
                                <Trash2 className="h-4 w-4" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredDepartments.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={4} className="text-center text-muted-foreground">
                          No departments found.
                        </TableCell>
                      </TableRow>
                    ) : null}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Create Department</DialogTitle>
            <DialogDescription>Add a new department for user assignments.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="departmentName">Department Name</Label>
              <Input
                id="departmentName"
                placeholder="e.g. Engineering"
                value={formValues.name}
                onChange={(event) => setFormValues({ ...formValues, name: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="departmentDescription">Description</Label>
              <Input
                id="departmentDescription"
                placeholder="Optional description"
                value={formValues.description}
                onChange={(event) => setFormValues({ ...formValues, description: event.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreate} disabled={isSubmitting}>
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[520px]">
          <DialogHeader>
            <DialogTitle>Edit Department</DialogTitle>
            <DialogDescription>Update department details.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="departmentNameEdit">Department Name</Label>
              <Input
                id="departmentNameEdit"
                value={formValues.name}
                onChange={(event) => setFormValues({ ...formValues, name: event.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="departmentDescriptionEdit">Description</Label>
              <Input
                id="departmentDescriptionEdit"
                value={formValues.description}
                onChange={(event) => setFormValues({ ...formValues, description: event.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdate} disabled={isSubmitting}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>Delete Department</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Are you sure?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isSubmitting}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
