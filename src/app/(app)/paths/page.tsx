"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Map,
  Plus,
  Search,
  Building2,
  Phone,
  CheckCircle,
  AlertTriangle,
  Trash2,
  Edit,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";
import type { SavedPath } from "@/types";

// Mock saved paths
const mockPaths: SavedPath[] = [
  {
    id: "1",
    userId: "user-1",
    companyName: "Comcast Billing",
    phoneNumber: "1-800-934-6489",
    path: ["2", "3", "hold"],
    successRate: 94,
    useCount: 16,
    lastUsedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  },
  {
    id: "2",
    userId: "user-1",
    companyName: "Aetna Claims",
    phoneNumber: "1-800-123-4567",
    path: ["1", "2", "0"],
    successRate: 88,
    useCount: 8,
    lastUsedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
  },
  {
    id: "3",
    userId: "user-1",
    companyName: "IRS General Line",
    phoneNumber: "1-800-829-1040",
    path: ["2", "1", "0"],
    successRate: 61,
    useCount: 4,
    lastUsedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000),
  },
];

function SavedPathCard({ path }: { path: SavedPath }) {
  const [expanded, setExpanded] = useState(false);
  const successColor =
    path.successRate >= 80
      ? "text-green-600"
      : path.successRate >= 60
      ? "text-amber-600"
      : "text-slate-500";
  const successBg =
    path.successRate >= 80
      ? "bg-green-50"
      : path.successRate >= 60
      ? "bg-amber-50"
      : "bg-slate-50";

  return (
    <Card
      className={cn("p-4 cursor-pointer transition-all", expanded && "ring-2 ring-violet-200")}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
          <Building2 className="w-5 h-5 text-slate-600" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold truncate">{path.companyName}</h3>
            <Badge className={cn("text-xs", successBg, successColor)}>
              {path.successRate >= 80 ? (
                <CheckCircle className="w-3 h-3 mr-1" />
              ) : path.successRate < 60 ? (
                <AlertTriangle className="w-3 h-3 mr-1" />
              ) : null}
              {path.successRate}%
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">{path.phoneNumber}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-xs font-mono bg-slate-100 px-2 py-0.5 rounded">
              {path.path.join(" → ")}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Used {path.useCount} times
          </p>
        </div>
        <ChevronRight
          className={cn(
            "w-5 h-5 text-muted-foreground transition-transform",
            expanded && "rotate-90"
          )}
        />
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t">
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            <div>
              <p className="text-muted-foreground text-xs">Last used</p>
              <p>{formatDistanceToNow(path.lastUsedAt, { addSuffix: true })}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Created</p>
              <p>{formatDistanceToNow(path.createdAt, { addSuffix: true })}</p>
            </div>
          </div>
          {path.successRate < 60 && (
            <p className="text-xs text-amber-600 mb-4">
              ⚠ Low success rate — AI assist will be enabled for this path
            </p>
          )}
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}

export default function PathsPage() {
  const [search, setSearch] = useState("");

  const filteredPaths = mockPaths.filter(
    (p) =>
      p.companyName.toLowerCase().includes(search.toLowerCase()) ||
      p.phoneNumber.includes(search)
  );

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Saved Paths</h1>
          <p className="text-muted-foreground text-sm">
            Your saved phone tree routes
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <Plus className="w-4 h-4" />
          Add Path
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search paths..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Paths list */}
      <div className="space-y-3">
        {filteredPaths.map((path) => (
          <SavedPathCard key={path.id} path={path} />
        ))}
        {filteredPaths.length === 0 && (
          <Card className="p-8 text-center">
            <Map className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">No paths found</p>
          </Card>
        )}
      </div>

      {/* Community paths upsell */}
      <Card className="p-4 bg-violet-50 border-violet-200">
        <div className="flex items-start gap-3">
          <Map className="w-5 h-5 text-violet-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-sm">Community paths (Pro)</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Browse 2,400+ phone trees contributed by other users.
              Upgrade to Pro to access.
            </p>
            <Button size="sm" className="mt-3">
              Upgrade to Pro
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
