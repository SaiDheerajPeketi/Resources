export interface AiRoleMap {
  roleId: "ai-engineer" | "ml-engineer" | "data-scientist" | "data-engineer" | "mlops-engineer";
  title: string;
  focus: string;
  priorityTopics: string[];
  supportingTopics: string[];
  interviewLoop: string;
  evidence: string;
}

export const aiRoleMaps: AiRoleMap[] = [
  {
    roleId: "ai-engineer",
    title: "AI Engineer",
    focus: "Grounded LLM products, evaluations, agents, latency, safety, and product integration.",
    priorityTopics: ["transformers", "retrieval-augmented-generation", "agents-and-tool-use", "llm-evaluation"],
    supportingTopics: ["Embeddings", "vector search", "fine-tuning", "responsible AI"],
    interviewLoop: "Coding → LLM/RAG depth → AI system design → product and safety case",
    evidence: "A traced, evaluated AI application with failure analysis and cost/latency trade-offs."
  },
  {
    roleId: "ml-engineer",
    title: "ML Engineer",
    focus: "Modeling, production features, serving, evaluation, distributed data, and reliability.",
    priorityTopics: ["feature-engineering", "model-evaluation", "optimization-for-ml", "mlops-and-ml-system-design"],
    supportingTopics: ["Tree ensembles", "deep learning", "embeddings", "forecasting"],
    interviewLoop: "Coding → ML fundamentals → model debugging → ML system design",
    evidence: "A reproducible model pipeline with online or batch serving, monitoring, and rollback."
  },
  {
    roleId: "data-scientist",
    title: "Data Scientist",
    focus: "Statistics, experimentation, SQL, product measurement, modeling, and communication.",
    priorityTopics: ["exploratory-data-analysis", "experiment-design", "linear-models", "model-evaluation"],
    supportingTopics: ["SQL", "probability", "forecasting", "responsible AI"],
    interviewLoop: "SQL → statistics → product experiment → modeling case → stakeholder communication",
    evidence: "A decision-focused analysis with assumptions, uncertainty, experiment design, and impact."
  },
  {
    roleId: "data-engineer",
    title: "Data Engineer",
    focus: "Reliable pipelines, data modeling, streaming, quality, lineage, and ML data products.",
    priorityTopics: ["data-cleaning", "feature-engineering", "vector-search", "mlops-and-ml-system-design"],
    supportingTopics: ["SQL", "distributed systems", "orchestration", "observability"],
    interviewLoop: "SQL/coding → data modeling → pipeline debugging → distributed data design",
    evidence: "An idempotent pipeline with contracts, backfills, lineage, quality gates, and SLOs."
  },
  {
    roleId: "mlops-engineer",
    title: "MLOps Engineer",
    focus: "Training platforms, model delivery, infrastructure, observability, governance, and incident response.",
    priorityTopics: ["mlops-and-ml-system-design", "model-evaluation", "vector-search", "responsible-ai"],
    supportingTopics: ["CI/CD", "Kubernetes", "IaC", "SRE", "security"],
    interviewLoop: "Platform coding → cloud/Kubernetes → ML lifecycle design → reliability incident",
    evidence: "A versioned model platform with promotion gates, canaries, telemetry, and recovery drills."
  }
];
