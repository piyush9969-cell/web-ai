"use client"

import { useEffect, useRef } from "react"
import mermaid from "mermaid"
import type { Organization, Team, Circle, Person, EntityType } from "@/app/admin/organisations/page"

interface OrganizationChartProps {
  data: {
    organizations: Organization[]
    teams: Team[]
    circles: Circle[]
    people: Person[]
  }
  onEditEntity: (type: EntityType, entity: any) => void
}

export default function OrganizationChart({ data, onEditEntity }: OrganizationChartProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement | null>(null)
  const zoomLevel = useRef(1)
  const panOffset = useRef({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const lastPanPoint = useRef({ x: 0, y: 0 })

  useEffect(() => {
    initializeMermaid()
  }, [])

  useEffect(() => {
    if (containerRef.current && data) {
      renderChart()
    }
  }, [data])

  const initializeMermaid = () => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      flowchart: {
        htmlLabels: true,
        useMaxWidth: false,
      },
    })
  }

  const renderChart = async () => {
    if (!containerRef.current) return

    try {
      const chartDefinition = generateMermaidDefinition(data)
      const chartId = `organizationChart-${Date.now()}`

      containerRef.current.innerHTML = ""

      const { svg } = await mermaid.render(chartId, chartDefinition)
      containerRef.current.innerHTML = svg

      setTimeout(() => {
        setupInteractivity()
      }, 100)
    } catch (error) {
      console.error("Error rendering Mermaid chart:", error)
      containerRef.current.innerHTML = '<p class="text-red-500 p-4">Error rendering chart</p>'
    }
  }

const generateMermaidDefinition = (data: OrganizationChartProps["data"]) => {
  let definition = "flowchart TB\n";

  // Simplified profile picture style that Mermaid can handle
  const profilePicStyle =
    "width='45' height='45' style='border-radius: 50%; object-fit: cover;'";

  // Add organizations and their hierarchies
  data.organizations.forEach((org) => {
    const location = sanitizeText(org.location);
    const imageHtml = org.imageUrl
      ? `<img src='${org.imageUrl}' ${profilePicStyle} />`
      : "";
    const subtitle = location
      ? `<br/><small style='color: #666;'>${location}</small>`
      : "";

    definition += `    ${org.id}["${imageHtml}🏢 ${org.name}${subtitle}"]:::organization\n`;

    // Add teams under organizations
    const orgTeams = data.teams.filter(
      (team) => team.organizationId === org.id
    );
    orgTeams.forEach((team) => {
      const lead = sanitizeText(team.lead);
      const imageHtml = team.imageUrl
        ? `<img src='${team.imageUrl}' ${profilePicStyle} />`
        : "";
      const teamSubtitle = lead
        ? `<br/><small style='color: #666;'>Lead: ${lead}</small>`
        : "";

      definition += `    ${org.id} --> ${team.id}["${imageHtml}👥 ${team.name}${teamSubtitle}"]:::team\n`;

      // Add circles under teams
      const teamCircles = data.circles.filter(
        (circle) => circle.teamId === team.id
      );
      teamCircles.forEach((circle) => {
        const purpose = sanitizeText(circle.purpose, 50); // Truncate purpose
        const imageHtml = circle.imageUrl
          ? `<img src='${circle.imageUrl}' ${profilePicStyle} />`
          : "";
        const circleSubtitle = purpose
          ? `<br/><small style='color: #666;'>${purpose}</small>`
          : "";

        definition += `    ${team.id} --> ${circle.id}["${imageHtml}🎯 ${circle.name}${circleSubtitle}"]:::circle\n`;

        // Add people under circles
        const circlePeople = data.people.filter(
          (person) => person.circleId === circle.id
        );
        circlePeople.forEach((person) => {
          const role = sanitizeText(person.role);
          const imageHtml = person.imageUrl
            ? `<img src='${person.imageUrl}' ${profilePicStyle} />`
            : "";
          const personSubtitle = role
            ? `<br/><small style='color: #666;'>${role}</small>`
            : "";

          definition += `    ${circle.id} --> ${person.id}["${imageHtml}👤 ${person.name}${personSubtitle}"]:::person\n`;
        });
      });
    });
  });

  // Add styling with enhanced classes for better image display
  definition += generateClassDefinitions();

  // Add custom CSS for images if your Mermaid setup supports it
  definition += `
  %%{wrap}%%
  `;

  return definition;
};

  const sanitizeText = (text: string | undefined | null, maxLength?: number, fallback = "") => {
    if (!text || !text.trim()) return fallback

    let sanitized = text.replace(/[<>&"']/g, (match) => {
      const entities: { [key: string]: string } = {
        "<": "&lt;",
        ">": "&gt;",
        "&": "&amp;",
        '"': "&quot;",
        "'": "&#39;",
      }
      return entities[match]
    })

    if (maxLength && sanitized.length > maxLength) {
      sanitized = sanitized.substring(0, maxLength) + "..."
    }

    return sanitized
  }

  const generateClassDefinitions = () => {
    return `
      classDef organization fill:#FEF2F2,stroke:#DC2626,stroke-width:3px,color:#1F2937,cursor:pointer,rx:12,ry:12,font-weight:600
      classDef team fill:#F9FAFB,stroke:#374151,stroke-width:2px,color:#1F2937,cursor:pointer,rx:10,ry:10,font-weight:500
      classDef circle fill:#F3F4F6,stroke:#6B7280,stroke-width:2px,color:#374151,cursor:pointer,rx:10,ry:10,font-weight:500
      classDef person fill:#FFFFFF,stroke:#9CA3AF,stroke-width:2px,color:#4B5563,cursor:pointer,rx:8,ry:8,font-weight:400
    `
  }

  const setupInteractivity = () => {
    if (!containerRef.current) return

    const svgElement = containerRef.current.querySelector("svg") as SVGSVGElement
    if (!svgElement) return

    svgRef.current = svgElement
    setupSVGProperties(svgElement)
    setupZoomAndPan(svgElement)
    setupNodeInteractivity(svgElement)
  }

  const setupSVGProperties = (svgElement: SVGSVGElement) => {
    svgElement.style.width = "100%"
    svgElement.style.height = "100%"
    svgElement.style.cursor = "grab"
  }

  const setupZoomAndPan = (svgElement: SVGSVGElement) => {
    // Zoom functionality
    svgElement.addEventListener("wheel", handleZoom, { passive: false })

    // Pan functionality
    svgElement.addEventListener("mousedown", handlePanStart)
    svgElement.addEventListener("mousemove", handlePanMove)
    svgElement.addEventListener("mouseup", handlePanEnd)
    svgElement.addEventListener("mouseleave", handlePanEnd)

    // Reset zoom and pan
    resetZoomAndPan()
  }

  const handleZoom = (e: WheelEvent) => {
    e.preventDefault()

    const delta = e.deltaY > 0 ? 0.9 : 1.1
    const newZoom = Math.max(0.8, Math.min(3, zoomLevel.current * delta))

    if (newZoom !== zoomLevel.current) {
      zoomLevel.current = newZoom
      updateTransform()
    }
  }

  const handlePanStart = (e: MouseEvent) => {
    if (e.target instanceof SVGElement && !e.target.closest(".node")) {
      isDragging.current = true
      lastPanPoint.current = { x: e.clientX, y: e.clientY }
      if (svgRef.current) {
        svgRef.current.style.cursor = "grabbing"
      }
    }
  }

  const handlePanMove = (e: MouseEvent) => {
    if (!isDragging.current) return

    const deltaX = e.clientX - lastPanPoint.current.x
    const deltaY = e.clientY - lastPanPoint.current.y

    panOffset.current.x += deltaX
    panOffset.current.y += deltaY

    lastPanPoint.current = { x: e.clientX, y: e.clientY }
    updateTransform()
  }

  const handlePanEnd = () => {
    isDragging.current = false
    if (svgRef.current) {
      svgRef.current.style.cursor = "grab"
    }
  }

  const updateTransform = () => {
    if (!svgRef.current) return

    const g = svgRef.current.querySelector("g")
    if (g) {
      g.style.transform = `translate(${panOffset.current.x}px, ${panOffset.current.y}px) scale(${zoomLevel.current})`
      g.style.transformOrigin = "center"
    }
  }

  const resetZoomAndPan = () => {
    zoomLevel.current = 1
    panOffset.current = { x: 0, y: 0 }
    updateTransform()
  }

  const setupNodeInteractivity = (svgElement: SVGSVGElement) => {
    const nodes = svgElement.querySelectorAll(".node")

    nodes.forEach((node) => {
      const nodeElement = node as SVGElement
      setupNodeEventListeners(nodeElement)
    })
  }

  const setupNodeEventListeners = (nodeElement: SVGElement) => {
    // Click handler for editing
    nodeElement.addEventListener("click", (e) => {
      if (!isDragging.current) {
        handleNodeClick(e, nodeElement)
      }
    })

    // Hover effects
    nodeElement.addEventListener("mouseenter", () => {
      if (!isDragging.current) {
        nodeElement.style.filter = "brightness(1.05)"
        nodeElement.style.transition = "all 0.2s ease"
      }
    })

    nodeElement.addEventListener("mouseleave", () => {
      nodeElement.style.filter = ""
      nodeElement.style.transform = ""
    })

    // Ensure clickability
    nodeElement.style.pointerEvents = "all"
    nodeElement.style.cursor = "pointer"
  }

  const handleNodeClick = (e: MouseEvent, nodeElement: SVGElement) => {
    e.preventDefault()
    e.stopPropagation()

    // Visual feedback
    nodeElement.style.filter = "brightness(1.2)"

    setTimeout(() => {
      nodeElement.style.filter = ""
      handleNodeEdit(nodeElement)
    }, 150)
  }

  const handleNodeEdit = (nodeElement: SVGElement) => {
    const entity = findEntityFromNode(nodeElement)

    if (entity.found) {
      onEditEntity(entity.type, entity.data)
    } else {
      console.error("Could not find entity for node ID:", nodeElement.id)
    }
  }

  const findEntityFromNode = (nodeElement: SVGElement) => {
    const nodeId = extractNodeId(nodeElement.id)

    const searchFunctions = [
      () => findInCollection(data.organizations, nodeId, "organization"),
      () => findInCollection(data.teams, nodeId, "team"),
      () => findInCollection(data.circles, nodeId, "circle"),
      () => findInCollection(data.people, nodeId, "person"),
    ]

    for (const searchFn of searchFunctions) {
      const result = searchFn()
      if (result.found) return result
    }

    return { found: false, type: "person" as EntityType, data: null }
  }

  const extractNodeId = (fullNodeId: string) => {
    return fullNodeId.includes("flowchart-")
      ? fullNodeId.replace(/^.*?flowchart-/, "").replace(/-\d+$/, "")
      : fullNodeId
  }

  const findInCollection = (collection: any[], nodeId: string, type: EntityType) => {
    const entity = collection.find((item) => nodeId.includes(item.id) || item.id.includes(nodeId))

    return {
      found: !!entity,
      type,
      data: entity,
    }
  }

  return (
    <div className="w-full h-full bg-white relative">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Organization Structure</h3>
        <p className="text-sm text-gray-600 mt-1">Scroll to zoom • Drag to pan • Click nodes to edit</p>
      </div>

      <div
        ref={containerRef}
        className="w-full h-[700px] overflow-hidden p-4 relative"
        style={{ minHeight: "700px" }}
      />
    </div>
  )
}
