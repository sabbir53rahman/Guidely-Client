"use client";

import React, { useMemo, useCallback, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Users,
  UserCheck,
  UserX,
  Trash2,
  Crown,
  GraduationCap,
  Calendar,
  Mail,
  Search,
  AlertTriangle,
} from "lucide-react";

import { useGetAllUsersQuery, useToggleUserStatusMutation, useDeleteUserMutation } from "@/redux/features/admin/adminApi";
import { Button } from "@/components/ui/button";
import { DataTable, Column } from "@/components/ui/data-table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { User as UserType } from "@/types";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Pagination } from "@/components/shared/Pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function ManageUsersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const limit = 10;

  // Modal states
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [actionType, setActionType] = useState<'activate' | 'block' | 'delete'>('activate');

  const { data: usersResponse, isLoading } = useGetAllUsersQuery({
    page,
    limit,
    search,
    role: role || undefined,
    status: status || undefined,
  });

  const [toggleUserStatus, { isLoading: isTogglingStatus }] = useToggleUserStatusMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const users: UserType[] = usersResponse?.data || [];
  const meta = usersResponse?.meta;

  const handleStatusToggle = useCallback(
    async (user: UserType) => {
      setSelectedUser(user);
      const isActive = user.status === "ACTIVE";
      setActionType(isActive ? 'block' : 'activate');
      setIsStatusModalOpen(true);
    },
    []
  );

  const confirmStatusToggle = useCallback(
    async () => {
      if (!selectedUser) return;
      
      try {
        await toggleUserStatus(selectedUser.id).unwrap();
        toast.success(`User ${actionType}d successfully!`);
        setIsStatusModalOpen(false);
        setSelectedUser(null);
      } catch (error: unknown) {
        const err = error as { data?: { message?: string } };
        toast.error(err?.data?.message || "Failed to update user status.");
      }
    },
    [selectedUser, actionType, toggleUserStatus]
  );

  const handleDeleteUser = useCallback(
    async (user: UserType) => {
      setSelectedUser(user);
      setActionType('delete');
      setIsDeleteModalOpen(true);
    },
    []
  );

  const confirmDeleteUser = useCallback(
    async () => {
      if (!selectedUser) return;
      
      try {
        await deleteUser(selectedUser.id).unwrap();
        toast.success("User deleted successfully!");
        setIsDeleteModalOpen(false);
        setSelectedUser(null);
      } catch (error: unknown) {
        const err = error as { data?: { message?: string } };
        toast.error(err?.data?.message || "Failed to delete user.");
      }
    },
    [selectedUser, deleteUser]
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Crown className="h-4 w-4 text-purple-500" />;
      case "mentor":
        return <GraduationCap className="h-4 w-4 text-blue-500" />;
      default:
        return <Users className="h-4 w-4 text-green-500" />;
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-purple-500/10 text-purple-500 border-purple-500/20";
      case "mentor":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      default:
        return "bg-green-500/10 text-green-500 border-green-500/20";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "BLOCKED":
        return "bg-red-500/10 text-red-500 border-red-500/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const columns = useMemo<Column<UserType>[]>(
    () => [
      {
        key: "user",
        header: "User Information",
        cell: (row) => (
          <div className="flex items-center gap-4 py-1">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-bold overflow-hidden shadow-inner border border-primary/10">
              {row.avatar || row.profilePhoto || row.image ? (
                <Image
                  src={row.avatar || row.profilePhoto || row.image || ""}
                  className="h-full w-full object-cover"
                  width={48}
                  height={48}
                  alt="user"
                />
              ) : (
                <span className="text-xl font-heading">
                  {row.name?.charAt(0).toUpperCase() || "U"}
                </span>
              )}
            </div>
            <div>
              <p className="font-extrabold text-foreground tracking-tight text-[15px]">
                {row.name || "Unknown User"}
              </p>
              <div className="flex items-center gap-1 text-xs text-muted-foreground/70 font-medium">
                <Mail className="h-3 w-3" />
                {row.email || "No email"}
              </div>
            </div>
          </div>
        ),
      },
      {
        key: "role",
        header: "Role",
        className: "w-[120px]",
        cell: (row) => (
          <Badge
            variant="outline"
            className={cn(
              "px-3 py-1.5 font-bold rounded-xl border uppercase text-[10px] tracking-widest flex items-center gap-1.5 w-fit",
              getRoleBadgeColor(row.role)
            )}
          >
            {getRoleIcon(row.role)}
            {row.role || "user"}
          </Badge>
        ),
      },
      {
        key: "status",
        header: "Status",
        className: "w-[120px]",
        cell: (row) => (
          <Badge
            variant="outline"
            className={cn(
              "px-3 py-1.5 font-bold rounded-xl border uppercase text-[10px] tracking-widest",
              getStatusBadgeColor(row.status || "ACTIVE")
            )}
          >
            {row.status || "ACTIVE"}
          </Badge>
        ),
      },
      {
        key: "verified",
        header: "Verified",
        className: "w-[100px]",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <div className={cn(
              "h-2 w-2 rounded-full",
              row.isVerified ? "bg-emerald-500" : "bg-muted"
            )} />
            <span className="text-xs font-bold text-muted-foreground">
              {row.isVerified ? "Yes" : "No"}
            </span>
          </div>
        ),
      },
      {
        key: "joined",
        header: "Joined Date",
        className: "w-[140px]",
        cell: (row) => (
          <div className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-muted-foreground/60" />
            <span className="text-[13px] font-extrabold tracking-tight text-foreground">
              {row.createdAt ? format(new Date(row.createdAt), "MMM dd, yyyy") : "N/A"}
            </span>
          </div>
        ),
      },
      {
        key: "actions",
        header: "Actions",
        className: "text-right pr-8 w-[200px]",
        cell: (row) => (
          <div className="flex items-center gap-2 justify-end">
            {/* Status Toggle Button */}
            <Button
              onClick={() => handleStatusToggle(row)}
              disabled={isTogglingStatus}
              variant="outline"
              size="sm"
              className={cn(
                "h-8 px-3 rounded-lg font-medium text-xs transition-all duration-200",
                row.status === "ACTIVE"
                  ? "text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
                  : "text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300"
              )}
            >
              {row.status === "ACTIVE" ? (
                <>
                  <UserX className="h-3.5 w-3.5 mr-1" />
                  Block User
                </>
              ) : (
                <>
                  <UserCheck className="h-3.5 w-3.5 mr-1" />
                  Activate User
                </>
              )}
            </Button>

            {/* Delete Button */}
            <Button
              onClick={() => handleDeleteUser(row)}
              disabled={isDeleting}
              variant="outline"
              size="sm"
              className="h-8 px-3 rounded-lg font-medium text-xs text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300 transition-all duration-200"
            >
              <Trash2 className="h-3.5 w-3.5 mr-1" />
              Delete
            </Button>
          </div>
        ),
      },
    ],
    [handleStatusToggle, handleDeleteUser, isTogglingStatus, isDeleting]
  );

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-1000 min-h-[85vh]">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-border/40 relative">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10 pointer-events-none"></div>

        <div className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/10">
              <Users className="h-5 w-5" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-[0.2em] text-primary">
              User Management
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-heading font-black tracking-tighter text-foreground drop-shadow-sm">
            Manage{" "}
            <span className="text-muted-foreground/30 font-light">
              Users
            </span>
          </h1>

          <p className="text-muted-foreground max-w-2xl text-lg font-medium leading-relaxed">
            Oversee all platform users, manage roles, and maintain system security with comprehensive user administration tools.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-muted/30 p-4 rounded-3xl border border-border/50 backdrop-blur-md">
          <div className="h-10 w-10 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-muted-foreground/70">
              Total Users
            </p>
            <p className="text-xl font-black text-foreground">
              {meta?.total || users.length}
            </p>
          </div>
        </div>
      </div>

      {/* FILTERS SECTION */}
      <div className="bg-card rounded-2xl border border-border p-6 shadow-lg">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1 group">
            <div className="absolute -inset-1 bg-linear-to-r from-primary to-secondary rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300" />
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search users by name or email..."
                className="pl-14 pr-6 h-14 rounded-2xl bg-background/80 backdrop-blur-sm border-0 focus:ring-4 focus:ring-primary/20 transition-all duration-300 text-lg shadow-lg"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>

          {/* Role Filter */}
          {/* <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <button
              onClick={() => {
                setRole("");
                setPage(1);
              }}
              className={cn(
                "px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-300",
                !role ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              All Roles
            </button>
            {["admin", "mentor", "student"].map((roleOption) => (
              <button
                key={roleOption}
                onClick={() => {
                  setRole(roleOption);
                  setPage(1);
                }}
                className={cn(
                  "px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-300",
                  role === roleOption ? "bg-primary text-primary-foreground shadow-lg" : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {roleOption.charAt(0).toUpperCase() + roleOption.slice(1)}
              </button>
            ))}
          </div> */}

          {/* Status Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
            <button
              onClick={() => {
                setStatus("");
                setPage(1);
              }}
              className={cn(
                "px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-300",
                !status ? "bg-secondary text-secondary-foreground shadow-lg" : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              All Status
            </button>
            {["ACTIVE", "BLOCKED"].map((statusOption) => (
              <button
                key={statusOption}
                onClick={() => {
                  setStatus(statusOption);
                  setPage(1);
                }}
                className={cn(
                  "px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-300",
                  status === statusOption ? "bg-secondary text-secondary-foreground shadow-lg" : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {statusOption.charAt(0).toUpperCase() + statusOption.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DATA TABLE SECTION */}
      <section className="relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-primary/5 rounded-[4rem] blur-3xl -z-10 pointer-events-none"></div>

        <DataTable<UserType>
          data={users}
          columns={columns}
          isLoading={isLoading}
          emptyMessage="No users found matching your criteria. Try adjusting your filters."
        />

        {/* Pagination Section */}
        {!isLoading && meta && meta.totalPages > 0 && (
          <Pagination
            currentPage={page}
            totalPages={meta.totalPages}
            onPageChange={(newPage) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        )}
      </section>

      {/* Status Toggle Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="sm:max-w-106.25 rounded-2xl border-border/50 shadow-2xl">
          <DialogHeader className="space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-amber-600" />
            </div>
            <DialogTitle className="text-center text-lg font-bold">
              {actionType === 'activate' ? 'Activate User' : 'Block User'}
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Are you sure you want to {actionType} <span className="font-semibold text-foreground">{selectedUser?.name}</span>?
              {actionType === 'block' && ' This will prevent them from accessing the platform.'}
              {actionType === 'activate' && ' This will restore their full access to the platform.'}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsStatusModalOpen(false);
                setSelectedUser(null);
              }}
              className="flex-1 rounded-xl border-border/50 hover:bg-muted/50"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmStatusToggle}
              disabled={isTogglingStatus}
              className={cn(
                "flex-1 rounded-xl font-medium",
                actionType === 'activate' 
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white" 
                  : "bg-red-600 hover:bg-red-700 text-white"
              )}
            >
              {isTogglingStatus ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  {actionType === 'activate' ? (
                    <>
                      <UserCheck className="h-4 w-4 mr-2" />
                      Activate
                    </>
                  ) : (
                    <>
                      <UserX className="h-4 w-4 mr-2" />
                      Block
                    </>
                  )}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent className="sm:max-w-106.25 rounded-2xl border-border/50 shadow-2xl">
          <DialogHeader className="space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <DialogTitle className="text-center text-lg font-bold text-red-600">
              Delete User
            </DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Are you sure you want to permanently delete <span className="font-semibold text-foreground">{selectedUser?.name}</span>?
              <br />
              <span className="text-red-500 font-medium">This action cannot be undone.</span>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-4">
            <Button
              variant="outline"
              onClick={() => {
                setIsDeleteModalOpen(false);
                setSelectedUser(null);
              }}
              className="flex-1 rounded-xl border-border/50 hover:bg-muted/50"
            >
              Cancel
            </Button>
            <Button
              onClick={confirmDeleteUser}
              disabled={isDeleting}
              className="flex-1 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium"
            >
              {isDeleting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent mr-2" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete User
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
