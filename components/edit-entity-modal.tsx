"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { EntityType } from "@/app/admin/organisations/page";

interface EditEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (type: EntityType, data: any) => void;
  entityType: EntityType;
  entity: any;
  data: any;
}

export default function EditEntityModal({
  isOpen,
  onClose,
  onEdit,
  entityType,
  entity,
  data,
}: EditEntityModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    if (entity) {
      setFormData({ ...entity });
      setImagePreview(entity.imageUrl || null);
    }
  }, [entity]);

  useEffect(() => {
    if (!entity) return;

    // Common fields
    const newFormData: any = { ...entity };

    // Only handle responsibilitiesRaw if this is a "circle"
    if (entityType === "circle") {
      //Converts array -> string
      newFormData.responsibilitiesRaw = Array.isArray(entity.responsibilities)
        ? entity.responsibilities.join(", ")
        : entity.responsibilities || "";
    }

    setFormData(newFormData);
    setImagePreview(entity.imageUrl || null);
  }, [entity, entityType]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onEdit(entityType, formData);
    onClose();
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, imageUrl: url });
    setImagePreview(url || null);
  };

  const renderForm = () => {
    switch (entityType) {
      case "organization":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location || ""}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="established">Established</Label>
              <Input
                id="established"
                value={formData.established || ""}
                onChange={(e) =>
                  setFormData({ ...formData, established: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <Input
                id="employees"
                type="number"
                value={formData.employees || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    employees: Number.parseInt(e.target.value) || 0,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Profile Picture URL (Optional)</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="imageUrl"
                  value={formData.imageUrl || ""}
                  onChange={handleImageUrlChange}
                  placeholder="Leave blank for no image"
                  className="flex-1"
                />
                {imagePreview && (
                  <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={() => setImagePreview(null)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Enter a URL to a profile picture or leave blank if no image is
                needed.
              </p>
            </div>
          </>
        );

      case "team":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="organizationId">Organization</Label>
              <Select
                value={formData.organizationId || ""}
                onValueChange={(value) =>
                  setFormData({ ...formData, organizationId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {data.organizations.map((org: any) => (
                    <SelectItem key={org.id} value={org.id}>
                      {org.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Team Name</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead">Team Lead</Label>
              <Input
                id="lead"
                value={formData.lead || ""}
                onChange={(e) =>
                  setFormData({ ...formData, lead: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="focus">Focus Area</Label>
              <Input
                id="focus"
                value={formData.focus || ""}
                onChange={(e) =>
                  setFormData({ ...formData, focus: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Profile Picture URL (Optional)</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="imageUrl"
                  value={formData.imageUrl || ""}
                  onChange={handleImageUrlChange}
                  placeholder="Leave blank for no image"
                  className="flex-1"
                />
                {imagePreview && (
                  <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={() => setImagePreview(null)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Enter a URL to a profile picture or leave blank if no image is
                needed.
              </p>
            </div>
          </>
        );

      case "circle":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="teamId">Team</Label>
              <Select
                value={formData.teamId || ""}
                onValueChange={(value) =>
                  setFormData({ ...formData, teamId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {data.teams.map((team: any) => (
                    <SelectItem key={team.id} value={team.id}>
                      {team.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Circle Name</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea
                id="purpose"
                value={formData.purpose || ""}
                onChange={(e) =>
                  setFormData({ ...formData, purpose: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsibilities">
                Responsibilities (comma-separated)
              </Label>
              <Textarea
                id="responsibilities"
                value={formData.responsibilitiesRaw || ""}
                onChange={(e) => {
                  const rawValue = e.target.value;
                  // Converts string ➝ array (when editing data)
                  setFormData({
                    ...formData,
                    responsibilitiesRaw: rawValue,
                    responsibilities: rawValue
                      .split(",")
                      .map((r) => r.trim())
                      .filter(Boolean),
                  });
                }}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Profile Picture URL (Optional)</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="imageUrl"
                  value={formData.imageUrl || ""}
                  onChange={handleImageUrlChange}
                  placeholder="Leave blank for no image"
                  className="flex-1"
                />
                {imagePreview && (
                  <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={() => setImagePreview(null)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Enter a URL to a profile picture or leave blank if no image is
                needed.
              </p>
            </div>
          </>
        );

      case "person":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="circleId">Circle</Label>
              <Select
                value={formData.circleId || ""}
                onValueChange={(value) =>
                  setFormData({ ...formData, circleId: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select circle" />
                </SelectTrigger>
                <SelectContent>
                  {data.circles.map((circle: any) => (
                    <SelectItem key={circle.id} value={circle.id}>
                      {circle.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role || ""}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department || ""}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">Profile Picture URL (Optional)</Label>
              <div className="flex gap-2 items-center">
                <Input
                  id="imageUrl"
                  value={formData.imageUrl || ""}
                  onChange={handleImageUrlChange}
                  placeholder="Leave blank for no image"
                  className="flex-1"
                />
                {imagePreview && (
                  <div className="h-10 w-10 rounded-full overflow-hidden border border-gray-200 flex-shrink-0">
                    <img
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      className="h-full w-full object-cover"
                      onError={() => setImagePreview(null)}
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500">
                Enter a URL to a profile picture or leave blank if no image is
                needed.
              </p>
            </div>
          </>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit {entityType}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {renderForm()}

          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
