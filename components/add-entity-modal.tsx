"use client";

import type React from "react";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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
import ImageField from "./image-field"
import type {
  EntityType,
  Organization,
  Team,
  Circle,
  Person,
} from "@/app/admin/organisations/page";

interface AddEntityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (type: EntityType, data: any) => void;
  data: {
    organizations: Organization[];
    teams: Team[];
    circles: Circle[];
    people: Person[];
  };
}

export default function AddEntityModal({
  isOpen,
  onClose,
  onAdd,
  data,
}: AddEntityModalProps) {
  const [entityType, setEntityType] = useState<EntityType>("organization");
  const [formData, setFormData] = useState<any>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(entityType, formData);
    setFormData({});
    onClose();
  };

  const handleInputChange = (field: string, value: string | string[]) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleTypeChange = (type: EntityType) => {
    setEntityType(type);
    setFormData({});
  };

  const renderFormFields = () => {
    switch (entityType) {
      case "organization":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="name">Organization Name</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location || ""}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="established">Established</Label>
              <Input
                id="established"
                type="date"
                value={formData.established || ""}
                onChange={(e) =>
                  handleInputChange("established", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <Input
                id="employees"
                type="number"
                value={formData.employees || ""}
                onChange={(e) => handleInputChange("employees", e.target.value)}
              />
            </div>
            <ImageField
              label="Organization Image"
              value={formData.imageUrl || ""}
              onChange={(value) =>
                setFormData({ ...formData, imageUrl: value })
              }
              aspectRatio={16 / 9}
            />
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
                  handleInputChange("organizationId", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select organization" />
                </SelectTrigger>
                <SelectContent>
                  {data.organizations.map((org) => (
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
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ""}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lead">Team Lead</Label>
              <Input
                id="lead"
                value={formData.lead || ""}
                onChange={(e) => handleInputChange("lead", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="focus">Focus Area</Label>
              <Input
                id="focus"
                value={formData.focus || ""}
                onChange={(e) => handleInputChange("focus", e.target.value)}
              />
            </div>
            <ImageField
              label="Team Image"
              value={formData.imageUrl || ""}
              onChange={(value) =>
                setFormData({ ...formData, imageUrl: value })
              }
              aspectRatio={1}
            />
          </>
        );

      case "circle":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="teamId">Team</Label>
              <Select
                value={formData.teamId || ""}
                onValueChange={(value) => handleInputChange("teamId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select team" />
                </SelectTrigger>
                <SelectContent>
                  {data.teams.map((team) => (
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
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose</Label>
              <Textarea
                id="purpose"
                value={formData.purpose || ""}
                onChange={(e) => handleInputChange("purpose", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="responsibilities">
                Responsibilities (comma-separated)
              </Label>
              <Textarea
                id="responsibilities"
                value={formData.responsibilities?.join(", ") || ""}
                onChange={(e) =>
                  handleInputChange(
                    "responsibilities",
                    e.target.value.split(", ").filter(Boolean)
                  )
                }
              />
            </div>
            <ImageField
              label="Circle Image"
              value={formData.imageUrl || ""}
              onChange={(value) =>
                setFormData({ ...formData, imageUrl: value })
              }
              aspectRatio={1}
            />
          </>
        );

      case "person":
        return (
          <>
            <div className="space-y-2">
              <Label htmlFor="circleId">Circle</Label>
              <Select
                value={formData.circleId || ""}
                onValueChange={(value) => handleInputChange("circleId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select circle" />
                </SelectTrigger>
                <SelectContent>
                  {data.circles.map((circle) => (
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
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                value={formData.role || ""}
                onChange={(e) => handleInputChange("role", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ""}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department || ""}
                onChange={(e) =>
                  handleInputChange("department", e.target.value)
                }
              />
            </div>
            <ImageField
              label="Profile Picture"
              value={formData.imageUrl || ""}
              onChange={(value) =>
                setFormData({ ...formData, imageUrl: value })
              }
              aspectRatio={1}
            />
          </>
        );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Entity</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="entityType">Entity Type</Label>
            <Select value={entityType} onValueChange={handleTypeChange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="organization">Organization</SelectItem>
                <SelectItem value="team">Team</SelectItem>
                <SelectItem value="circle">Circle</SelectItem>
                <SelectItem value="person">Person</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {renderFormFields()}

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Add {entityType}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
