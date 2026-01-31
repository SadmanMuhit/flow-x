import { ArrowRight, Bell, Brain, Clock, Code, CreditCard, Database, FileText, Filter, Hash, Mail, MessageSquare, RotateCcw, Timer, Webhook, Zap } from "lucide-react";
import { object } from "zod";

export interface Position {
    x: number;
    y: number;
}

export const ICON_MAP: Record<string, react.ComponentType<{className?: string}>> = {
    Webhook,
    Mail,
    Database,
    Code,
    MessageSquare,
    FileText,
    Brain,
    Zap,
    Filter,
    ArrowRight,
    CreditCard,
    Clock,
    Hash,
    Bell,
    Timer,
    RotateCcw,
};

export const EDGE_STYLE = {
    stroke: "#10b981",
    strokeWidth: 2,
    strokeDasharray:"5,5",
};

export const getIconForStep = (stepName: string): string => {
    const iconkeys = object.keys(ICON_MAP);
    const foundkey =iconkeys.find((key) => stepName.includes(key));
    return foundkey || "ArrowRight";
};