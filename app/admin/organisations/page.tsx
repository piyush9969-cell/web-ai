"use client"

import { useEffect, useState } from "react"
import { Plus, Users, Building, Target, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import AOrganizationChart from "@/components/a-organization-chart"
import AddEntityModal from "@/components/add-entity-modal"
import EditEntityModal from "@/components/edit-entity-modal"
import { initialData } from "@/lib/utils"

export interface Person {
  id: string;
  name: string;
  role: string;
  email: string;
  department: string;
  circleId: string;
  imageUrl?: string;
}

export interface Circle {
  id: string;
  name: string;
  purpose: string;
  responsibilities: string[];
  teamId: string;
  imageUrl?: string;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  lead: string;
  focus: string;
  organizationId: string;
  imageUrl?: string;
}

export interface Organization {
  id: string;
  name: string;
  description: string;
  location: string;
  established: string;
  employees: number;
  imageUrl?: string;
}

export type EntityType = "organization" | "team" | "circle" | "person"



export default function HomePage() {
  const [data, setData] = useState(initialData)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editingEntity, setEditingEntity] = useState<{
    type: EntityType
    entity: any
  } | null>(null)

  console.log(data)
  useEffect(() => {
    console.log("Updated Data in HomePage:", data);
  }, [data]);

  const handleAddEntity = (type: EntityType, entityData: any) => {
    const id = `${type}-${type === "person" ? data["people"].length + 1 : data[`${type}s`].length + 1}`;
    const newEntity = { ...entityData, id }

    setData((prev) => {
      
      const pluralType =
        type === "person" ? "people" : (`${type}s` as keyof typeof prev);
      const currentArray = (prev[pluralType] as any[]) || [];

      return {
        ...prev,
        [pluralType]: [...currentArray, newEntity],
      }
    })
  }

const handleEditEntity = (type: EntityType, entityData: any) => {
  console.log("Editing Entity:", type, entityData); // Debugging
  setData((prev) => {
   
    const pluralType =
      type === "person" ? "people" : (`${type}s` as keyof typeof prev);
    const currentArray = (prev[pluralType] as any[]) || [];

    return {
      ...prev,
      [pluralType]: currentArray.map((item) =>
        item.id === entityData.id ? entityData : item
      ),
    };
  });
};

  const openEditModal = (type: EntityType, entity: any) => {
    setEditingEntity({ type, entity })
    setIsEditModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Organization Chart
              </h1>
              <p className="text-gray-600 mt-1">
                Visualize and manage your organizational structure
              </p>
            </div>
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="border border-red-600 text-red-600 bg-white hover:bg-red-600 hover:text-white transition-colors duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>Add Entity</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Organizations
              </CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data.organizations.length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Teams</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.teams.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Circles</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.circles.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">People</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{data.people.length}</div>
            </CardContent>
          </Card>
        </div>
        <Card className="relative overflow-auto w-full">
          <AOrganizationChart data={data} onEditEntity={openEditModal} />
        </Card>
      </div>

      {/* Modals */}
      <AddEntityModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddEntity}
        data={data}
      />

      {editingEntity && (
        <EditEntityModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingEntity(null);
          }}
          onEdit={handleEditEntity}
          entityType={editingEntity.type}
          entity={editingEntity.entity}
          data={data}
        />
      )}
    </div>
  );
}
