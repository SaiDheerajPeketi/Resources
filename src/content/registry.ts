import HashTables from "@/content/topics/hash-tables.mdx";
import ModelEvaluation from "@/content/topics/model-evaluation.mdx";
import ConsistentHashing from "@/content/topics/consistent-hashing.mdx";
import KubernetesReconciliation from "@/content/topics/kubernetes-reconciliation.mdx";
import ThreatModeling from "@/content/topics/threat-modeling.mdx";
import DoubleEntryLedgers from "@/content/topics/double-entry-ledgers.mdx";
import CppInterviewSetup from "@/content/topics/foundations/c-interview-setup.mdx";
import ComplexityAnalysis from "@/content/topics/foundations/complexity-analysis.mdx";
import StlAndIterators from "@/content/topics/foundations/stl-and-iterators.mdx";
import ArraysAndStrings from "@/content/topics/foundations/arrays-and-strings.mdx";
import StacksAndQueues from "@/content/topics/foundations/stacks-and-queues.mdx";
import LinkedLists from "@/content/topics/foundations/linked-lists.mdx";
import TreesAndBsts from "@/content/topics/foundations/trees-and-bsts.mdx";
import HeapsAndPriorityQueues from "@/content/topics/foundations/heaps-and-priority-queues.mdx";
import Graphs from "@/content/topics/foundations/graphs.mdx";
import RecursionAndBacktracking from "@/content/topics/foundations/recursion-and-backtracking.mdx";
import SortingAndBinarySearch from "@/content/topics/foundations/sorting-and-binary-search.mdx";
import GreedyAlgorithms from "@/content/topics/foundations/greedy-algorithms.mdx";
import DynamicProgramming from "@/content/topics/foundations/dynamic-programming.mdx";
import BitManipulation from "@/content/topics/foundations/bit-manipulation.mdx";
import DiscreteMathematics from "@/content/topics/foundations/discrete-mathematics.mdx";
import LinearAlgebra from "@/content/topics/foundations/linear-algebra.mdx";
import Probability from "@/content/topics/foundations/probability.mdx";
import Statistics from "@/content/topics/foundations/statistics.mdx";
import SqlFundamentals from "@/content/topics/foundations/sql-fundamentals.mdx";
import LinuxAndTheCli from "@/content/topics/foundations/linux-and-the-cli.mdx";
import NetworkingFundamentals from "@/content/topics/foundations/networking-fundamentals.mdx";
import GitTestingAndDebugging from "@/content/topics/foundations/git-testing-and-debugging.mdx";
import BehavioralInterviewBasics from "@/content/topics/foundations/behavioral-interview-basics.mdx";

export const topicContent = {
  "foundations/c-plus-plus-interview-setup": CppInterviewSetup,
  "foundations/complexity-analysis": ComplexityAnalysis,
  "foundations/stl-and-iterators": StlAndIterators,
  "foundations/arrays-and-strings": ArraysAndStrings,
  "foundations/hash-tables": HashTables,
  "foundations/stacks-and-queues": StacksAndQueues,
  "foundations/linked-lists": LinkedLists,
  "foundations/trees-and-bsts": TreesAndBsts,
  "foundations/heaps-and-priority-queues": HeapsAndPriorityQueues,
  "foundations/graphs": Graphs,
  "foundations/recursion-and-backtracking": RecursionAndBacktracking,
  "foundations/sorting-and-binary-search": SortingAndBinarySearch,
  "foundations/greedy-algorithms": GreedyAlgorithms,
  "foundations/dynamic-programming": DynamicProgramming,
  "foundations/bit-manipulation": BitManipulation,
  "foundations/discrete-mathematics": DiscreteMathematics,
  "foundations/linear-algebra": LinearAlgebra,
  "foundations/probability": Probability,
  "foundations/statistics": Statistics,
  "foundations/sql-fundamentals": SqlFundamentals,
  "foundations/linux-and-the-cli": LinuxAndTheCli,
  "foundations/networking-fundamentals": NetworkingFundamentals,
  "foundations/git-testing-and-debugging": GitTestingAndDebugging,
  "foundations/behavioral-interview-basics": BehavioralInterviewBasics,
  "ai-data/model-evaluation": ModelEvaluation,
  "sde-systems/consistent-hashing": ConsistentHashing,
  "devops-cloud/kubernetes-reconciliation": KubernetesReconciliation,
  "cybersecurity/threat-modeling": ThreatModeling,
  "fintech-quant/double-entry-ledgers": DoubleEntryLedgers
} as const;
