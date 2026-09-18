import HashTables from "@/content/topics/hash-tables.mdx";
import ModelEvaluation from "@/content/topics/model-evaluation.mdx";
import ConsistentHashing from "@/content/topics/consistent-hashing.mdx";
import KubernetesReconciliation from "@/content/topics/kubernetes-reconciliation.mdx";
import ThreatModeling from "@/content/topics/threat-modeling.mdx";
import DoubleEntryLedgers from "@/content/topics/double-entry-ledgers.mdx";

export const topicContent = {
  "foundations/hash-tables": HashTables,
  "ai-data/model-evaluation": ModelEvaluation,
  "sde-systems/consistent-hashing": ConsistentHashing,
  "devops-cloud/kubernetes-reconciliation": KubernetesReconciliation,
  "cybersecurity/threat-modeling": ThreatModeling,
  "fintech-quant/double-entry-ledgers": DoubleEntryLedgers
} as const;
